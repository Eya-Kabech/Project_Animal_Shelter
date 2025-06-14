import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import styles from "./createPet.module.css"

const Create = () => {
    const navigate = useNavigate();
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
            console.log("User authenticated:", res.data);
            setLoggedInUser(res.data.user); 
            if(res.data.user.role !== "member"){
              alert("Access denied")
              navigate("/dashboard")
            }
          })
          .catch((err) => {
            console.log("Unauthorized access:", err);
            navigate("/login"); 
          });
      }, [navigate]);
    
      const submitHandler = (e) => {
        e.preventDefault();
        const petData = {
          name,
          age,
          breed,
          habit,
          description,
          image,
        };
    
        axios
          .post("http://localhost:8000/api/pets/add", petData, { withCredentials: true })
          .then((res) => {
            console.log("Success adding pet:", res.data);
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
          
          
          
        }
   
        
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
      </div>
    ) : (
      <div className={styles.loading}>Loading...</div>
    )}
  </div>
  )
}

export default Create