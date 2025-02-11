import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { BiHome } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
// import { FaRegUserCircle } from "react-icons/fa"; used for the account page, which will be used later
import { GrGroup } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => {
    setIsActive((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setIsActive(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles['logo-container']}>
          <h1 className={styles['nav-branding']}>
            <Link to="/"><img src="/assets/logo.png" alt="logo" className={styles.logo} /></Link>
          </h1>
        </div>

        <div
          className={`${styles.hamburger} ${isActive ? styles.active : ''}`}
          onClick={toggleHamburger}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
          <li className={styles['nav-item']}><Link to="/" className={styles['nav-link']} title="Home" onClick={handleNavLinkClick}><BiHome /></Link></li>
          <li className={styles['nav-item']}><Link to="/world" className={styles['nav-link']} title="World" onClick={handleNavLinkClick}><BiWorld /></Link></li>
          <li className={styles['nav-item']}><Link to="/community" className={styles['nav-link']} title="Community" onClick={handleNavLinkClick}><GrGroup /></Link></li>
          <li className={styles['nav-item']}>
            <p className={styles['nav-link']} title="sign in"><Link to="/signin" onClick={handleNavLinkClick}><CiLogin /></Link></p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
