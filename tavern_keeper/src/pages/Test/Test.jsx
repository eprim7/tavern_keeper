import { Link } from "react-router-dom"
import styles from "../Test/Test.module.css"

function PageNotFound(){
    return(
        <div className={styles.pageContainer}>
            <h1 className={styles.h1}>
              You seem to be lost in uncharted territory! 🗺️
            </h1>
            <p className={styles.p}>
              This page doesn’t exist... or maybe it was swallowed by the void. 
            </p>
            <Link to="/" className={styles.link}>
              Return to Safety
            </Link>
        </div>
    )
}

export default Test