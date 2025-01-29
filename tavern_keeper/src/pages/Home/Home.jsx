import React from "react";
import styles from '../Home/Home.module.css';

function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tavern Keeper</h1>
            <div className={styles.background}>
                <img src="/assets/home.png" alt="Cool home" className={styles.pic}/>
            </div>
        </div>
    );
}

export default Home;
