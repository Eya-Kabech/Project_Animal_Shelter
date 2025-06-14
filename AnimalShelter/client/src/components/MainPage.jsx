import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import styles from "./main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pets, setPets] = useState([]);

  // handle unauthorized access
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLoggedInUser(res.data.user); 

        axios.get("http://localhost:8000/api/dashboard/pets", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setPets(res.data);
        })
        .catch((err) => {
          console.log("Error fetching pets", err);
        });
      })
      .catch((err) => {
        console.log("Unauthorized access:", err);
        navigate("/login"); // Redirect to login page if error
      });
  }, [navigate]);
  


  return (
    <div className={styles.dashboard}>
      {loggedInUser ? (
        <div>
          {/* Welcome Section */}
          
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Welcome to Paws&Claws</h1>
              <p className={styles.heroSubtitle}>
                Giving pets a second chance, one adoption at a time.
              </p>
              <Link to="/aboutUs" className={styles.heroButton}>
                Discover More
              </Link>
            </div>
          </div>
  
          {/* Website Description Section */}
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionText}>
              <h1>Why Adopt</h1>
              <p>
                Animals bring unconditional love, joy, and companionship into our lives.
                By adopting, you’re not only giving a deserving pet a second chance
                but also creating a happier, more fulfilling life for both of you. Every adoption saves a life and opens your heart to endless moments of happiness.
              </p>
            </div>
            <div className={styles.descriptionImage}>
              <img
                src="/cuteCat2.jpeg" // Replace with your image path
                alt="Shelter Description"
                className={styles.descriptionImage}
              />
            </div>
          </div>
  
          {/* New Statistics Section */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <h3>500+</h3>
              <p>Pets Adopted</p>
            </div>
            <div className={styles.statCard}>
              <h3>12+</h3>
              <p>Innovative Programs</p>
            </div>
            <div className={styles.statCard}>
              <h3>99%</h3>
              <p>Happy Adopters</p>
            </div>
          </div>
  
          {/* Pets Section */}
          <div className={styles.container}>
            <div className={styles.petsGrid}>
              {pets.map((onePet) => (
                <div className={styles.petCard} key={onePet._id}>
                  <img
                    src={onePet.image}
                    alt={onePet.name}
                    className={styles.petImage}
                  />
                  <h5 className={styles.petName}>{onePet.name}</h5>
                  <p className={styles.petDescription}>{onePet.description}</p>
                  <div className={styles.petActions}>
                    <Link
                      to={`/pets/${onePet._id}`}
                      className={styles.primaryButton}
                    >
                      More
                    </Link>
                    {loggedInUser.role === "member" && (
                      <Link
                        to={`/pets/${onePet._id}/update`}
                        className={styles.warningButton}
                      >
                        Update
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Dynamic Container for Members */}
          {loggedInUser.role === "member" && (
            <div className={styles.memberActions}>
              <div className={styles.memberInfo}>
                <h2>Welcome Back, {loggedInUser.firstName}!</h2>
                <p>
                  As a member, you have access to the exclusive pet management
                  features. You can view reports, create new pets, and more!
                </p>
              </div>
              <div className={styles.actions}>
                <Link to={"/create"} className={styles.secondaryButton}>
                  Create a New Pet
                </Link>
                <Link to={"/pets/report"} className={styles.secondaryButton}>
                  View All Reports
                </Link>
                <Link to={"/product/create"} className={styles.secondaryButton}>
                  Add a Product to the Shop
                </Link>
              </div>
              <div className={styles.extraInfo}>
                <p>
                  Keep up the great work! You’re making a real difference in the lives of these animals.
                </p>
               
              </div>
            </div>
          )}
  
          {/* Footer Section */}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <div className={styles.contactSection}>
                <h2>Contact Us</h2>
                <div className={styles.contactDetails}>
                  <p><strong>Email:</strong> contact@pawsandclaws.com</p>
                  <p><strong>Phone:</strong> +123 456 7890</p>
                </div>
                <div className={styles.map}>
                  <h3>Our Location</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1181669335275!2d-122.42127828468455!3d37.77492937975813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f9711da8b%3A0x42cbe567f62bcdb7!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1639519272500!5m2!1sen!2sin"
                    width="100%" 
                    height="300" 
                    frameborder="0" 
                    allowfullscreen=""
                    aria-hidden="false" 
                    tabindex="0"
                  ></iframe>
                </div>
              </div>
  
              <div className={styles.termsSection}>
                <div className={styles.terms}>
                  <h3>Terms of Service</h3>
                  <p>
                    By using Paws&Claws, you agree to our terms and conditions. 
                    All adoptions are subject to approval and availability. 
                    We are committed to ensuring that all pets go to loving homes.
                  </p>
                </div>
                <div className={styles.privacy}>
                  <h3>Privacy Policy</h3>
                  <p>
                    Your privacy is important to us. We ensure your data is secure and 
                    will not share it without consent. For more details, refer to our full 
                    privacy policy.
                  </p>
                </div>
              </div>
            </div>
  
            <div className={styles.footerBottom}>
              <p>&copy; 2024 Paws&Claws. All rights reserved.</p>
            </div>
          </footer>
        </div>
      ) : (
        <h1 className={styles.loading}>Loading...</h1>
      )}
    </div>
  );
  
  }

export default Main;
