import Header from "../../components/Header/Header";
import styles from "../World/World.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InitialWorldPopup from "../../components/InitialWorldPopup/InitialWorldPopup";
import { getPlayerWorlds } from "../../api/world_accessor";

function World() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataList, setDataList] = useState([]);

    let signedIn = localStorage.getItem("isLoggedIn") === "true";
    let email = localStorage.getItem("email")

    // only get all of the user's worlds if they are signed in and we have their email
    useEffect(() => {
        if (signedIn && email) {
            fetchWorlds();
        }
    });


    // fetches the worlds from the database of that specific user, based off of their email
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
                {isPopupOpen && (<InitialWorldPopup closeModal={setIsPopupOpen}  refreshWorlds={fetchWorlds}/> )}

                <div className={styles.worldList}>
                    {dataList.length > 0 ? (
                        dataList.map(world => (
                        <Link to={`/worldOverview/${world.id}`} key={world.id} className={styles.worldCard}>
                            <h3>{world.title}</h3>
                            <p>{world.description}</p>
                        </Link>
                        ))
                    ) : (
                        <p></p>
                    )}
                    </div>
            </div>
        </>
    );
}

export default World;
