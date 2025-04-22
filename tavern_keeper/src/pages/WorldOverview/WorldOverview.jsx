import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from '../WorldOverview/WorldOverview.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabase-client";

function WorldOverview(){
    const [worldName, setWorldName] = useState('')
    const [worldDescription, setWorldDescription] = useState('')

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
        } // end of if
        else {
            fetchWorlds()
        } // end of else
    }, [isLoggedIn, navigate]);

    const fetchWorlds = async () =>{
        const {data: userData, error: userError} = await supabase
        .from("Worlds")
        .select(`title, description`)
        .eq("id", id)

        console.log("fetching user data",userData)

        setWorldName(userData[0].title)
        setWorldDescription(userData[0].description)
    } // end of fetchWorlds


    return(

        <>
        <Header />
        <h1 className={styles.title}>Welcome {username}</h1>

        <div className={styles.sidebar}>
            <Sidebar  worldID={id}/>
        </div>

        <div className={styles.pageWrapper}>
            <div className={styles.middleContainer}>
                <div className={styles.infoRow}>
                    <h1>World Name:</h1>
                    <h1 className={styles.h1}>{worldName}</h1>
                </div>

                <div className={styles.infoRow}>
                    <h1>World Description:</h1>
                    <h1 className={styles.h1}>{worldDescription}</h1>
                </div>
            </div>
        </div>

        </>
    )
}


export default WorldOverview