import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { BiHome } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";

function Header() {

  // Add the useEffect here to log when the component mounts
  useEffect(() => {
    console.log('Header mounted');
  }, []);

  useEffect(() => {
    const hamburger = document.querySelector(`.${styles.hamburger}`);
    const navMenu = document.querySelector(`.${styles['nav-menu']}`);

    const handleHamburgerClick = () => {
      hamburger.classList.toggle(styles.active);
      navMenu.classList.toggle(styles.active);
    };

    const handleNavLinkClick = () => {
      hamburger.classList.remove(styles.active);
      navMenu.classList.remove(styles.active);
    };

    hamburger.addEventListener("click", handleHamburgerClick);
    document.querySelectorAll(`.${styles['nav-link']}`).forEach((link) =>
      link.addEventListener("click", handleNavLinkClick)
    );

    return () => {
      hamburger.removeEventListener("click", handleHamburgerClick);
      document.querySelectorAll(`.${styles['nav-link']}`).forEach((link) =>
        link.removeEventListener("click", handleNavLinkClick)
      );
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles['logo-container']}>
          <h1 className={styles['nav-branding']}>
            <Link to="/"><img src="/assets/logo.png" alt="logo" className={styles.logo} /></Link>
          </h1>
        </div>
        <ul className={styles['nav-menu']}>
          <li className={styles['nav-item']}><Link to="/" className={styles['nav-link']} title="Home"><BiHome /></Link></li>
          <li className={styles['nav-item']}><Link to="/world" className={styles['nav-link']} title="World"><BiWorld /></Link></li>
          <li className={styles['nav-item']}><Link to="/community" className={styles['nav-link']} title="Community"><GrGroup /></Link></li>
          <li className={styles['nav-item']}><Link to="/account" className={styles['nav-link']} title="Account"><FaRegUserCircle /></Link></li>
          <li className={styles['nav-item']}>
            <p className={styles['nav-link']} title="sign in"><Link to="/signin"><CiLogin /></Link></p>
          </li>
        </ul>
        <div className={styles.hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
