import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from '../WorldOverview/WorldOverview.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function WorldOverview(){

    const { id } = useParams()
    let email = localStorage.getItem('email')

    // gets everything from the email before the @
    let username = email?.split('@')[0];
    
    // ensures user is signed in
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin"); // redirect to signin if not logged in
        }
    }, [isLoggedIn, navigate]);


    return(

        <>
        <Header />
        <h1 className={styles.title}>Welcome {username}</h1>

        <div className={styles.sidebar}>
            <Sidebar  worldID={id}/>
        </div>

        </>
    )
}


export default WorldOverview