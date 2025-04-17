import React from "react";
import styles from '../Sidebar/Sidebar.module.css';
import { CiMap } from "react-icons/ci";
import { GiCharacter } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar({ worldID }) {
    return (
        <aside className={styles.aside}>
            <Link to={`/worldOverview/maps/${worldID}`} className={styles.link}>
                <CiMap className={styles.icon} /> <span>Maps</span>
            </Link>
            <Link to={`/worldOverview/characters/${worldID}`} className={styles.link}>
                <GiCharacter className={styles.icon} /> <span>Chars.</span>
            </Link>
            <Link to={`/worldOverview/organizations/${worldID}`} className={styles.link}>
                <GoOrganization className={styles.icon} /> <span>Orgs.</span>
            </Link>
            <Link to={`/worldOverview/locations/${worldID}`} className={styles.link}>
                <GrLocationPin className={styles.icon} /> <span>Lctn.</span>
            </Link>
            <Link to={`/worldOverview/timelines/${worldID}`} className={styles.link}>
                <FaHistory className={styles.icon} /> <span>Tlne.</span>
            </Link>
            <Link to={`/worldOverview/miscellaneous/${worldID}`} className={styles.link}>
                <MdMiscellaneousServices className={styles.icon} /> <span>Misc.</span>
            </Link>
        </aside>
    );
}

export default Sidebar;
