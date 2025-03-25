import React from "react";
import styles from "./WorldOverviewGrid.module.css";

const WorldOverviewGrid = ({ children }) => {
  return (
    <div className={styles.grid}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={styles.item}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default WorldOverviewGrid;
