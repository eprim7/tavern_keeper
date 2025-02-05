import Header from "../../components/Header/Header";
import styles from "../World/World.module.css";
import { Link } from "react-router-dom";
function World() {
    return (
        <>
            <Header />

            <div className={styles.hero}>
                <div className={styles.card}>
                    <h3 className={styles.h3}><Link className={styles.link}>Click here to start your world making journey</Link></h3>
                </div>
            </div>
        </>
    );
}

export default World;
