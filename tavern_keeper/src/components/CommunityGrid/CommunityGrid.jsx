import React from "react";
import styles from "./CommunityGrid.module.css";

//takes in a sliced list of worlds
//returns each as a communityitem
const CommunityGrid = ({ communityData }) => {
    return(
        <div className={styles.communitygrid}>
            {communityData.map((world, index) => {
                return (
                    <WorldItem
                        key={index}
                        name={world.name}
                        author={world.author}
                        genre={world.genre}
                    />
                );
            })}
        </div>
    );

}

const WorldItem = ({name, author, genre}) => {
    return(
        <div className={styles.griditem}>
            <h2>{name}</h2>
            <h3>{author}</h3>
            <h3>{genre}</h3>
        </div>
    );
}

export default CommunityGrid;