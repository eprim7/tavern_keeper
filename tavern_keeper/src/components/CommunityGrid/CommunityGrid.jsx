import React from "react";
import styles from "./CommunityGrid.module.css";
import { getUserByUserID } from "../../api/world_accessor";
import { useEffect } from "react";
import { useState } from "react";

//takes in a sliced list of worlds
//returns each as a communityitem
const CommunityGrid = ({ communityData }) => {
    return(
        <div className={styles.communitygrid}>
            {communityData.map((world, index) => {
                return (
                    <WorldItem
                        key={index}
                        name={world.title}
                        author={world.userID}
                        genre={world.genre}
                        description={world.description}
                        likes = {world.likes}
                    />
                );
            })}
        </div>
    );

}

const WorldItem = ({name, author, genre, description, likes}) => {
    const [authorName, setAuthorName] = useState("Loading...");

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await getUserByUserID(author);
            if (data?.userName) {
                setAuthorName(data.userName);
            } else {
                setAuthorName("Unknown");
            }
        };
        fetchAuthor();
    }, [author]);

    return(
        <div className={styles.griditem}>
            <div className={styles.banner}></div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h3>author: {authorName}</h3>
            <h3>{genre}</h3>
            <h3>{likes}</h3>
            <button>View</button>
        </div>
    );
}

export default CommunityGrid;