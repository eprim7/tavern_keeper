import Header from "../../components/Header/Header"
import styles from "../Account/Account.module.css";
import { LuPencil } from "react-icons/lu";
import React, {useState} from 'react';

function Account() {
    const [description, setDescription] = useState('This is my description');
    const ProfilePicture = (props) => {
        return (
            <button className={styles.profileButton}>
                <img src={props.image} alt="pfp" className={styles.profilepicture}></img>
            </button>
        );
    }
    const updateDescription = (event) => {
        setDescription(event.target.value);
    }

    const Description = (props) => {
        return (
            <input type="text" value={props.text} className={styles.description} placeholder="Tell use a little about yourself" onChange={updateDescription}></input>
        );
    }

    

    return(
        <>
            <Header />
            <div className={styles.bannerwrapper}>
                <ProfilePicture image="/assets/logo.png"/>
                <div className={styles.usernamewrapper}>
                    <h1>Username</h1>
                    <div className={styles.pencil}>
                        <button className={styles.pencilbutton}>
                            <LuPencil style={{width: '2em', height: '2em'}}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.contentwrapper}>
                <h1>About Me</h1>
                <Description text={description}/>
                <h2>Worlds Created</h2>
                <h2>Total Likes</h2>
            </div>
        </>
    )
}


export default Account 