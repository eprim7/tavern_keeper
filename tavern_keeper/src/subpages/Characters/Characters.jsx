import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
function Characters(){
    return(

        <>
            <Header />
            <h1 className={styles.title}>This is the Characters page</h1>

            <Sidebar />
        </>
    )
}

export default Characters