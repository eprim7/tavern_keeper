import { Link } from "react-router-dom"
import styles from "../Test/Test.module.css"
import { getData } from "../../api/data"
import { useEffect } from "react";



function PageNotFound(){
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    setDataList(await getData);
  }

    return(
        <div className={styles.pageContainer}>
            <h1 className={styles.h1}>
              You seem to be lost in uncharted territory! 🗺️
            </h1>
            <p className={styles.p}>
              This page doesn’t exist... or maybe it was swallowed by the void. 
            </p>
            <Link to="/" className={styles.link}>
              Return to Safety
            </Link>

            <ul>
              <li>Before</li>
              {dataList.map((dt) => (
                <li>
                  <p>{dt.id}</p>
                  <p>{dt.url}</p>
                </li>
              ))}
              <li>After</li>
            </ul>
        </div>
    )
}

export default PageNotFound