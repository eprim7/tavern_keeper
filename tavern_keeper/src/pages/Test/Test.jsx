import { Link } from "react-router-dom"
import styles from "../Test/Test.module.css"
import { getData } from "../../api/data";
import { useState } from "react";

function Test(){
  const [dataList, setDataList] = getData();

  const fetchData = async () => {
    setDataList(getData);
  };

    return(
        <div className={styles.pageContainer}>
            <h1 className={styles.h1}>
              You seem to be lost in uncharted territory! 🗺️
            </h1>
            <p className={styles.p}>
              This page doesn’t exist... or maybe it was swallowed by the void. 
            </p>
            <ul>
              <li><p>before</p></li>
              <li>{dataList.length}</li>
              <li><p>after</p></li>
            </ul>
            <Link to="/" className={styles.link}>
              Return to Safety
            </Link>
        </div>
    )
}

export default Test