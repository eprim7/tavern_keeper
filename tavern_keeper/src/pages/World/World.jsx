import Header from "../../components/Header/Header";
import styles from "../World/World.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import InitialWorldPopup from "../../components/InitialWorldPopup/InitialWorldPopup";

function World() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    let signedIn = localStorage.getItem("isLoggedIn") === "true"; // Ensure it's a boolean

    // This is what shows if the user is not signed in 
    if (!signedIn) {
        return (
            <>
                <Header />
                <h1 className={styles.header}>Please Log in to access the world-building function</h1>
                <p className={styles.paragraph}>Click <Link to='/signin' className={styles.span}>here</Link> to be redirected to the login page</p>
            </>
        );
    }

    // This is what shows if the user is signed in 
    return (
        <>
            <Header />
            <div className={styles.hero}>
                <div className={styles.card}>
                    <h3 className={styles.h3} onClick={() => setIsPopupOpen(true)}>
                        <Link className={styles.link}>Click here to start your world-making journey</Link>
                    </h3>
                </div>
                {isPopupOpen && <InitialWorldPopup closeModal={setIsPopupOpen} />}
            </div>
        </>
    );
}

export default World;
