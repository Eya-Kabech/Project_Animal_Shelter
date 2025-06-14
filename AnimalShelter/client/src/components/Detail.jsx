import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./detail.module.css"

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pet, setPet] = useState(null);

  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLoggedInUser(res.data.user); 

     
        axios
          .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
          .then((petRes) => {
            console.log(petRes.data);
            setPet(petRes.data);
          })
          .catch((err) => {
            console.log("Error fetching pet details:", err);
          });
      })
      .catch((err) => {
        console.log("Unauthorized access:", err);
        navigate("/login"); 
      });
  }, [id, navigate]);


  const logout = (e) => {
    axios
      .get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/login"); 
      })
      .catch((err) => {
        console.log("Logout error:", err);
        navigate("/login"); 
      });
  };

  const goBack = () =>{
    navigate("/dashboard")
  }

  return (
    <div className={styles.container}>
   
    
    {loggedInUser ? (
      <div className={styles.wrapper}>
        <div className={styles.actions}>
          <button onClick={goBack} className={styles.button}>Go Back</button>
        </div>

        <div className={styles.petDetails}>
          {pet ? (
            <>
              <h1>{pet.name}</h1>
              <img src={pet.image} alt={pet.name} width="200px" />
              
              <div className={styles.descriptionContainer}>
              <h3>Breed</h3>
              <p className={styles.descriptionText}>{pet.breed}</p>
              <h3>Habits</h3>
              <p className={styles.descriptionText}>{pet.habit}</p>
                <h3>Description</h3>
                <p className={styles.descriptionText}>{pet.description}</p>
              </div>
            </>
          ) : (
            <h2>Loading pet details...</h2>
          )}
        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )}

    {/* Sidebar for shelter contact information */}
    <div className={styles.shelterSidebar}>
      <h3>Shelter Contact Information</h3>
      <div className={styles.contactInfo}>
        <p><strong>Address:</strong> 123 Shelter Street, Pet City, PC 12345</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Email:</strong> contact@shelter.com</p>
        <p><strong>Website:</strong> www.shelter.com</p>
      </div>
    </div>
  </div>
);
};

export default Detail;
