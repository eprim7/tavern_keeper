import styles from '../AccountDropDown/AccountDropDown.module.css';
import { Link } from 'react-router-dom';

function AccountDropDown({ handleLogout}) {

    let email = localStorage.getItem("email") // gets the email to display it 

    return (
        <div className={styles.account_dropdown}>
            <h2 className={styles.email}>Email: {email}</h2>

            <div className={styles.account_actions}>
                <h2><Link to="/account">View Account</Link></h2>
                <h2 onClick={handleLogout}>Sign Out</h2>
            </div>
        </div>
    );
}

export default AccountDropDown;
