import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css"; // Import your CSS file

const Report = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [injury, setInjury] = useState("");
  const [image, setImage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard", { withCredentials: true })
      .then((res) => {
        setLoggedInUser(res.data.user);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const tempObj = { location, injury, image };

    axios
      .post("http://localhost:8000/api/report", tempObj, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  };


  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      
      {loggedInUser ? (
        
        <div className={styles.wrapper}>
          
          <div className={styles.actions}>
        
            <button className={styles.button} onClick={goBack}>
              Go Back
            </button>
          </div>

          {errors.length > 0 && (
            <div className={styles.errorBox}>
              <h3>Validation Errors:</h3>
              <ul>
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Injury</label>
              <input
                type="text"
                value={injury}
                onChange={(e) => setInjury(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={styles.input}
              />
            </div>
            <input type="submit" value="Submit" className={styles.submitButton} />
          </form>
        </div>
      ) : (
        <h1 className={styles.loading}>Loading...</h1>
      )}
    </div>
  );
};

export default Report;
