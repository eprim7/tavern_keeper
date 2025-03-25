import React from "react";
import styles from '../Home/Home.module.css';
import Header from "../../components/Header/Header";
import { getData } from "../../api/data";

const test = getData();

function Home() {
    return (
        <>
            <Header />
            <div className={styles.hero}>
                <h1 className={styles.h1}>Create, organize, and store your world settings with <br /><span className={styles.span}>Tavern Keeper</span></h1>
            </div>

            <div className={styles.content}>
                <div className={styles.character}>
                    <img src="/assets/homeCharacters.png" alt="characters" className={styles.characterPic}/>
                    <p className={styles.p}>Bring your characters to life by customizing them directly from your novel, book, or D&D game!</p>
                </div>
                <div className={styles.character}>
                    <p className={styles.p}>Effortlessly upload, store, and edit customized maps of your worlds.</p>
                    <img src="/assets/homeMap.png" alt="map" className={styles.characterPic}/>
                </div>
                <div className={styles.character}>
                    <img src="/assets/homeCommunity.png" alt="community" className={styles.characterPic}/>
                    <p className={styles.p}> Discover and explore worlds shared by other users on the community page!</p>
                </div>
            </div>

            <div>
                <ul>
                    {test.map((item) => (
                        <li>
                            <p>{item.id}</p>
                        </li>
                ))}
                </ul>
            </div>
        </>
    );
}

export default Home;
