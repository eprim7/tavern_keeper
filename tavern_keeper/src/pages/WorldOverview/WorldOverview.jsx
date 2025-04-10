import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from '../WorldOverview/WorldOverview.module.css';
function WorldOverview(){

    let email = localStorage.getItem('email')
    
    // gets everything from the email before the @
    let username = email?.split('@')[0];


    return(

        <>
        <Header />
        <h1 className={styles.title}>Welcome {username}</h1>

        <div className={styles.sidebar}>
            <Sidebar />
        </div>

        </>
    )
}


export default WorldOverview