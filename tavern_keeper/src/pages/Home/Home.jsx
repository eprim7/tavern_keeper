import React from "react";
import styles from '../Home/Home.module.css';
import Header from "../../components/Header/Header";

function Home() {
    return (
        <>
            <Header />
            <div className={styles.hero}>
                <h1 className={styles.h1}>Create, organize, and store your world settings.</h1>
            </div>

            <div className={styles.content}>
                <div className={styles.character}>
                    <img src="/assets/homeCharacters.png" alt="characters" className={styles.characterPic}/>
                    <p className={styles.p}>Bring your characters to life by customizing them directly from your novel, book, or D&D game.</p>
                </div>
                <div className={styles.character}>
                    <p className={styles.p}>Bring your characters to life by customizing them directly from your novel, book, or D&D game.</p>
                    <img src="/assets/homeCharacters.png" alt="characters" className={styles.characterPic}/>
                </div>
                <div className={styles.character}>
                    <img src="/assets/homeCharacters.png" alt="characters" className={styles.characterPic}/>
                    <p className={styles.p}>Bring your characters to life by customizing them directly from your novel, book, or D&D game.</p>
                </div>
            </div>
        </>
    );
}

export default Home;
