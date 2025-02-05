import Header from "../../components/Header/Header"
import styles from "./Signin.module.css"
import { Link } from "react-router-dom"

function Signin() {

    return(
        <>
            <Header />
            <h1 className={styles.h1}>Welcome to Tavern Keeper</h1>
            <div className={styles.container}>
                <h2 className={styles.h2}>Please enter your email and password</h2>
                <label htmlFor="email" className={styles.label}><b>Email:</b></label>
                <br />
                <input type="email" placeholder="Example@gmail.com" className={styles.email}/>
                <br />
                <br />
                <label htmlFor="password" className={styles.label}><b>Password:</b></label>
                <br />
                <input type="password" className={styles.password}/>
                <br />
                <br />
                <button className={styles.button}>Sign In</button>
            </div>

            <h2 className={styles.h2}><Link to="/register">Don't have an account?</Link></h2>
        </>
    )
}

export default Signin