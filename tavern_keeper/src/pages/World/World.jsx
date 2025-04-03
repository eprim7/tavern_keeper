import Header from "../../components/Header/Header";
import styles from "../World/World.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InitialWorldPopup from "../../components/InitialWorldPopup/InitialWorldPopup";
import { getPlayerWorlds } from "../../api/world_accessor";

function World() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataList, setDataList] = useState([]);

    let signedIn = localStorage.getItem("isLoggedIn") === "true"; // Ensure it's a boolean
    let email = localStorage.getItem("email")

    useEffect(() => {
        if (signedIn && email) {
            fetchWorlds();
        }
    }, [signedIn, email]);

    async function fetchWorlds() {
        const worlds = await getPlayerWorlds(email);
        if(worlds){
            setDataList(worlds);
        }
    }


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

                <div className={styles.worldList}>
                    {dataList.length > 0 ? (dataList.map(world => (
                        <div key={world.id} className={styles.worldCard}>
                            <h3>{world.title}</h3>
                            <p>{world.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No worlds found</p>
                    )
            }
                </div>
            </div>
        </>
    );
}

export default World;
