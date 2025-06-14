import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,  useParams } from "react-router-dom";
import styles from"./allReports.module.css"



const AllReports = () => {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [reports,setReports] = useState([]);
  
    // handle unauthorized access
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/dashboard", { withCredentials: true })
        .then((res) => {
          console.log(res);
          setLoggedInUser(res.data.user); 
          if(res.data.user.role !== "member"){
            alert("Access denied")
            navigate("/dashboard")
          }
  
          axios.get("http://localhost:8000/api/report",{withCredentials:true})
          .then((res)=>{
            console.log(res.data)
            setReports(res.data);
          })
          .catch((err)=>{
            console.log("Error fetching reports",err)
          })
        })
        .catch((err) => {
          console.log("Unauthorized access:", err);
          navigate("/login"); // Redirect to login page if error
        });
    }, [navigate]);

    /*const deleteHandler = () => {
      axios
        .delete(`http://localhost:8000/api/report/${id}/delete`, { withCredentials: true })
        .then((res) => {
          console.log("report deleted successfully:", res.data);
          navigate("/dashboard"); 
        })
        .catch((err) => {
          console.log("Error deleting report:", err);
        });
    };*/

 



    const goBack = () =>{
        navigate("/dashboard")
      }



      return (
<div className={styles.reportsContainer}>
      {loggedInUser ? (
        <div>
          
          <button onClick={goBack} className={styles.goBackButton}>Go Back</button>

          <div className={styles.reportsSection}>
            <div className={styles.reportsHeader}>
              <h2>Reports Overview</h2>
              <p>Explore the latest reports about stray animals.</p>
            </div>

            <div className={styles.reportsGrid}>
              {reports.map((oneReport) => (
                <div className={styles.reportCard} key={oneReport._id}>
                  <div className={styles.reportContent}>
                    <h5 className={styles.reportLocation}><span>Location:</span> {oneReport.location}</h5>
                    <p className={styles.reportInjury}><span>Injury: </span>{oneReport.injury}</p>

                    <img
                      src={oneReport.image}
                      alt={oneReport.name}
                      className={styles.reportImage}
                    />


                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className={styles.loadingMessage}>Loading...</h1>
      )}
    </div>
      );
      
}

export default AllReports