import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './reg.module.css'; // Importing the styles



const Reg = () => {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value
    });
  };

  const register = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
      .then(res => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/dashboard");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={styles.regContainer}>
      <div className={styles.regCard}>
        <h2 className={styles.regTitle}>Sign Up</h2>

        {Object.keys(errors).length > 0 && (
          <div className={styles.errorBox}>
            <h3>Validation Errors:</h3>
            <ul>
              {Object.keys(errors).map((key, index) => (
                <li key={index}>{errors[key].message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={register} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              name="firstName"
              value={formInfo.firstName}
              onChange={changeHandler}
              required
            />
     
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              name="lastName"
              value={formInfo.lastName}
              onChange={changeHandler}
              required
            />
  
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              name="email"
              value={formInfo.email}
              onChange={changeHandler}
              required
            />
     
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Role</label>
            <input
              type="text"
              className={styles.input}
              name="role"
              value={formInfo.role}
              onChange={changeHandler}
              required
            />

          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              name="password"
              value={formInfo.password}
              onChange={changeHandler}
              required
            />
          
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              name="confirm"
              value={formInfo.confirm}
              onChange={changeHandler}
              required
            />

          </div>

          <input type="submit" className={styles.submitButton} value="Sign Up" />
        </form>

        <div className={styles.signupLink}>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className={styles.link}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reg;
