import React from "react";
import styles from "./WorldOverviewGrid.module.css";

const WorldOverviewGrid = ({ children, handleClick }) => {

  return (
    <div className={styles.grid}>
      {React.Children.map(children, (child, index) => (
        <button key={index} className={styles.item} onClick={handleClick}>
          {child}
        </button>
      ))}
    </div>
  );
};

export default WorldOverviewGrid;