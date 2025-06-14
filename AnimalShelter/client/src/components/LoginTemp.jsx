import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./login.module.css"

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    email:"",
    password:"",
})
const[errorsmsg,setErrorsmsg] = useState(null)
const navigate = useNavigate();  
  const changehandler = (e)=>{ 
    setFormInfo({
        ...formInfo,
        [e.target.name]:e.target.value

    })
}

const login = (e)=>{
  e.preventDefault();
  axios.post("http://localhost:8000/api/login",formInfo,{withCredentials:true})
  .then(res=>{
    console.log(res)
    if(res.data.msg==="success"){
      navigate("/dashboard")
    }else{
      setErrorsmsg(res.data.msg)
    }
  })
  .catch(err=>{console.log(err)})
}






  return (
    <div className={styles.regContainer}>
    <div className={styles.regCard}>
      <h2 className={styles.regTitle}>Login</h2>

      {errorsmsg && <p className={styles.errorBox}>{errorsmsg}</p>}

      <form onSubmit={login} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            className={styles.input}
            name="email"
            onChange={changehandler}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            name="password"
            onChange={changehandler}
            required
          />
        </div>

        <input
          type="submit"
          className={styles.submitButton}
          value="Log In"
        />
      </form>

      <div className={styles.signupLink}>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className={styles.link}>
            Create one
          </span>
        </p>
      </div>
    </div>
  </div>
);
};



export default Login