import Header from "../../components/Header/Header";
import styles from "../World/World.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import InitialWorldPopup from "../../components/InitialWorldPopup/InitialWorldPopup";

function World() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <Header />
            <div className={styles.hero}>
                <div className={styles.card} >
                    <h3 className={styles.h3} onClick={() => setIsPopupOpen(true)}>
                        <Link className={styles.link}>Click here to start your world-making journey</Link>
                    </h3>
                </div>
                {isPopupOpen && <InitialWorldPopup closeModal={setIsPopupOpen}/>}

            </div>
        </>
    );
}

export default World;
