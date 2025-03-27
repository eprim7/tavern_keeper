import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"

function Miscellaneous() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
  
          <div className={styles.content}>
            <button className={styles.button} onClick={() => setIsPopupOpen(true)}>
              Add new Miscellaneous
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={false} // Set to false to hide the picture input
              >
                Miscellaneous
              </SubpagesPopup>
            )}
  
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
    );
  }
  
  export default Miscellaneous;
  