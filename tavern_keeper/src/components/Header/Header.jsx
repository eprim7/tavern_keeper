import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { BiHome } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
import { googleLogout } from '@react-oauth/google';
import AccountDropDown from "../../components/AccountDropDown/AccountDropDown";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check login status on mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const toggleHamburger = () => {
    setIsActive((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setIsActive(false);
  };

  const toggleDropDown = () => {
    setShowDropdown((prev) => !prev);
  };

  // closes the drop down menu when someone clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    googleLogout();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // Immediately update the state on logout
    setShowDropdown(false);
    navigate('/signin');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles["logo-container"]}>
          <h1 className={styles["nav-branding"]}>
            <Link to="/">
              <img src="/assets/logo.png" alt="logo" className={styles.logo} />
            </Link>
          </h1>
        </div>

        <div
          className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
          onClick={toggleHamburger}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
          <li className={styles["nav-item"]}>
            <Link to="/" className={styles["nav-link"]} title="Home" onClick={handleNavLinkClick}>
              <BiHome />
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link to="/world" className={styles["nav-link"]} title="World" onClick={handleNavLinkClick}>
              <BiWorld />
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link to="/community" className={styles["nav-link"]} title="Community" onClick={handleNavLinkClick}>
              <GrGroup />
            </Link>
          </li>
          <li className={styles["nav-item"]} ref={dropdownRef}>
            <div className={styles["nav-link"]} title="sign in">
              {isLoggedIn ? (
                <span onClick={toggleDropDown}><FaRegUserCircle /></span>
              ) : (
                <Link to="/signin">
                  <CiLogin />
                </Link>
              )}
            </div>
            {showDropdown && <AccountDropDown handleLogout={handleLogout} />}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
