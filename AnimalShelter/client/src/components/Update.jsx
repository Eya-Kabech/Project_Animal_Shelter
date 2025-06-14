import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./createPet.module.css"

const Update = () => {

        const navigate = useNavigate();
        const { id } = useParams(); 
        const[name,setName]=useState("")
        const[age,setAge]=useState(0)
        const[breed,setBreed]=useState("")
        const[habit,setHabit]=useState("")
        const[description,setDescription]=useState("")
        const [image,setImage]=useState("")
        const [errors, setErrors] = useState([]); 
        const [loggedInUser, setLoggedInUser] = useState(null);
    
      
        
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
      
           
              axios
                .get(`http://localhost:8000/api/pets/${id}`, { withCredentials: true })
                .then((res) => {
                  console.log(res.data);
                  setName(res.data.name);
                  setAge(res.data.age);
                  setBreed(res.data.breed);
                  setHabit(res.data.habit);
                  setDescription(res.data.description);
                  setImage(res.data.image);
                })
                .catch((err) => {
                  console.log( err);
                });
            }) 
            .catch((err) => {
              console.log("Unauthorized access:", err);
              navigate("/login"); 
            });
        }, [id, navigate]);


        const submitHandler = (e) => {
            e.preventDefault();
            const tmpObj = {
              name,
              age,
              breed,
              habit,
              description,
              image,
            };
        
            axios
              .patch(`http://localhost:8000/api/pets/${id}/update`, tmpObj, { withCredentials: true })
              .then((res) => {
                console.log("Success adding pet:", res.data);
                navigate("/dashboard"); 
              })
              .catch((err) => {
                const errorResponse = err.response?.data?.errors || {}; 
                const errorArr = Object.keys(errorResponse).map((key) => errorResponse[key].message);
                setErrors(errorArr); 
              });
              
              
              
            }
      
            const deleteHandler = () => {
                axios
                  .delete(`http://localhost:8000/api/pets/${id}/delete`, { withCredentials: true })
                  .then((res) => {
                    console.log("Pet deleted successfully:", res.data);
                    navigate("/dashboard"); 
                  })
                  .catch((err) => {
                    console.log("Error deleting pet:", err);
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
            <label className={styles.label}>Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Breed</label>
            <input 
              type="text" 
              value={breed} 
              onChange={(e) => setBreed(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Habit</label>
            <input 
              type="text" 
              value={habit} 
              onChange={(e) => setHabit(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Image URL</label>
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              className={styles.input} 
            />
          </div>
          <input 
            type="submit" 
            value="Submit" 
            className={styles.submitButton} 
          />
        </form>
        <div className={styles.deleteButtonContainer}>
                        <button onClick={deleteHandler} className={styles.deleteButton}>Delete Pet</button>
                    </div>
      </div>
    ) : (
      <div className={styles.loading}>Loading...</div>
    )}
  </div>
  )
}

export default Update