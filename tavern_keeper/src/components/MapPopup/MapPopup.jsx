import React from "react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import styles from "./MapPopup.module.css";


const MapPopup = ({ mapUrl, mapName, onClose}) => {


    return (
        <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <h2>{mapName}</h2>
            <button onClick={onClose} className={styles.closeBtn}>X</button>
          </div>
  
          <div className={styles.viewer}>
            <TransformWrapper>
              <TransformComponent>
                <img src={mapUrl} alt={mapName} className={styles.mapImage} />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      </div>
    );
  };

  export default MapPopup;