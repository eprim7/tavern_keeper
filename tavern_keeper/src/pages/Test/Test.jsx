import { Link } from "react-router-dom"
import styles from "../Test/Test.module.css"
import { getPublicWorlds, getPlayerWorlds, getUserByUserID } from "../../api/world_accessor";
import { dataOptions, getCharactersByWorldID, getData } from "../../api/data_accessor";
import { useEffect, useState } from "react";

function Test(){
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    testFunc();
  }, []);

  async function testFunc() {
    //setDataList(await getPlayerWorlds(localStorage.getItem("email")));
    //setDataList(await getUserByUserID(1));
    setDataList(await getData(dataOptions.CHARACTERS, 1));

  }

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
              {dataList.map((dt) => (
                <li>{dt.Name}</li>
              ))
              //<li>{dataList.email}</li>
              }
              <li><p>after</p></li>
            </ul>
            <Link to="/" className={styles.link}>
              Return to Safety
            </Link>
        </div>
    )
}

export default Test
