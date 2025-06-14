import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import styles from"./product.module.css"
const CreateProduct = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [image,setImage] = useState("");
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
        const temObj = {
        title,
        price,
        image,
        };
    
        axios
          .post("http://localhost:8000/api/product", temObj, { withCredentials: true })
          .then((res) => {
            console.log("Success adding product:", res.data);
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
    <div>
    {loggedInUser ? (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
              
                    <button onClick={goBack} className={styles.button}>GO BACK</button>
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
                        <label className={styles.label}>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    ) : (
        <div className={styles.loading}>
            <h1>Loading...</h1>
        </div>
    )}
</div>
  )
}

export default CreateProduct