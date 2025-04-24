import styles from "../UsernamePopup/UsernamePopup.module.css";
import React, {useEffect, useState} from 'react';
import { updateUsername } from "../../api/data_uploader";
import { getUserByEmail } from "../../api/world_accessor";
function UsernamePopup({closeModal, refreshName}) {
    const [username, setUsername] = useState('');
    let storedEmail = localStorage.getItem('email');
    //console.log("username: ", username);
    async function fetchUser() {
           const storedEmail = localStorage.getItem("email");
           const user = await getUserByEmail(storedEmail);
           if(user.userName) {
            setUsername(user.userName);
           } else {
            setUsername(storedEmail.substring(0, storedEmail.length - 10));
           }
    }
    useEffect(() => {       
        fetchUser();
    }, []);
    const handleSubmit = async () => {
        if(!username) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("email: ", storedEmail)
        await updateUsername(storedEmail, username);
        await refreshName();
        closeModal(false);
        return;

    }
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h2>Enter Username</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    //className={styles.nameInput}
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className={styles.buttonRow}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => closeModal(false)}>Cancel</button>
                </div>
                
            </div>
            
        </div>
    );
}
export default UsernamePopup;