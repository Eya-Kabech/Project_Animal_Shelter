import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  return (
    <>
      {/* Top Navbar */}
      <nav className={styles.topNavbar}>
        <div className={styles.topLeft}>
          <img src="/PawLogo.png" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.topRight}>
          <Link to="/pets/report/create" className={`${styles.navLink} ${styles.reportLogout}`}>
            Report
          </Link>
          <span
            className={`${styles.navLink} ${styles.reportLogout}`}
            onClick={logout}
          >
            Logout
          </span>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className={styles.bottomNavbar}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}
        >
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/aboutUs" className={styles.navLink}>
              About Us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/product" className={styles.navLink}>
              Shop
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink}>
              Contact us 
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
