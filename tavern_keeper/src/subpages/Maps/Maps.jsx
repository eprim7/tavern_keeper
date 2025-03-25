import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from '../Maps/Maps.module.css';
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid";
import { useNavigate } from "react-router-dom";

function Maps() {
    const navigate = useNavigate();

    const loadPage = () => {
        navigate("/mapPopup");
    };

    return (
        <>
            <Header />
            
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>

                <div className={styles.content}>
                    <button className={styles.button} onClick={loadPage}>Add new Map</button>

                    <WorldOverviewGrid>
                        <div>Name of Map</div>
                        <div>Name of Map</div>
                        <div>Name of Map</div>
                        <div>Name of Map</div>
                        <div>Name of Map</div>
                        <div>Name of Map</div>
                    </WorldOverviewGrid>
                </div>
            </div>
        </>
    );
}

export default Maps;
