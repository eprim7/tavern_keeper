import React from "react"
import styles from '../Sidebar/Sidebar.module.css';
import { CiMap } from "react-icons/ci";
import { GiCharacter } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";

function Sidebar(){
    return(

        <>
            <aside className={styles.aside}>
                <CiMap className={styles.icon} />
                <GiCharacter className={styles.icon} />
                <GoOrganization className={styles.icon} />
                <GrLocationPin className={styles.icon} />
                <FaHistory className={styles.icon} />
                <MdMiscellaneousServices className={styles.icon} />
                <button>Submit</button>
            </aside>
        </>
    )

}

export default Sidebar