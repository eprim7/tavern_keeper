import Header from "../../components/Header/Header";
import styles from "../Community/Community.module.css";
import { BsSearch } from "react-icons/bs";

function Community() {
  return (
    <>
      <Header />
      <h1 className={styles.h1}>Community Page</h1>
      <div className={styles.controlsWrapper}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search Worlds"
            className={styles.search}
          />
          <button className={styles.button}>
            <BsSearch />
          </button>
        </div>
        <select name="worldGenre" id="worldGenre" className={styles.worldGenre}>
          <option value="Select" disabled hidden selected>
            Sort by Genre
          </option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="darkFantasy">Dark Fantasy</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
        </select>
      </div>
    </>
  );
}

export default Community;
