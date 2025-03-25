import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useNavigate } from "react-router-dom";

function Miscellaneous(){
    const navigate = useNavigate();

    const loadPage = () => {
        navigate("/mapPopup");
    };



    return(
        
        <>
            <Header />
            
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>

                <div className={styles.content}>
                    <button className={styles.button} onClick={loadPage}>Add new Miscellaneous</button>

                    <WorldOverviewGrid>
                        <div>Name of Miscellaneous</div>
                        <div>Name of Miscellaneous</div>
                        <div>Name of Miscellaneous</div>
                        <div>Name of Miscellaneous</div>
                        <div>Name of Miscellaneous</div>
                        <div>Name of Miscellaneous</div>
                    </WorldOverviewGrid>
                </div>
            </div>

        </>
    )
}

export default Miscellaneous