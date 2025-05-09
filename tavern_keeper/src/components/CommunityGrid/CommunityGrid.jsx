import React from "react";
import styles from "./CommunityGrid.module.css";
import { getUserByUserID } from "../../api/world_accessor";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsHandThumbsUp } from "react-icons/bs";

//takes in a sliced list of worlds
//returns each as a communityitem
const CommunityGrid = ({ communityData }) => {
    return(
        <div className={styles.communitygrid}>
            {communityData.map((world, index) => {
                return (
                    <WorldItem
                        key={index}
                        id={world.id}
                        name={world.title}
                        author={world.userID}
                        genre={world.genre}
                        description={world.description}
                        likes = {world.likes_arr.length}
                    />
                );
            })}
        </div>
    );

}

const WorldItem = ({id, name, author, genre, description, likes}) => {
    const [authorName, setAuthorName] = useState("Loading...");

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await getUserByUserID(author);
            if (data.userName) {
                setAuthorName(data.userName);
            } else {
                const email = data.email;
                setAuthorName(email.substring(0, email.length - 10));
            }
        };
        fetchAuthor();
    }, [author]);

    return(
        <div className={styles.griditem}>
            <div className={(genre == "Sci-Fi") ? styles.scifiBanner :
                (genre == "Horror") ? styles.horrorBanner :
                (genre == "Comedy") ? styles.comedyBanner :
                (genre == "Romance") ? styles.romanceBanner :
                (genre == "Thriller") ? styles.thrillerBanner :
                (genre == "Nonfiction") ? styles.nonfictionBanner :
                (genre == "Mystery") ? styles.mysteryBanner :
                styles.banner
            }></div>
            <h2 className={styles.titleHeader}>{name}</h2>
            <p className={styles.description}>{description}</p>
            <label className={styles.authorLabel}>{authorName}</label> <br/>
            <label className={styles.genreLabel}>{genre}</label> <br/>
            <div className={styles.bottomWrapper}>
                <label>{likes}</label>
                <div className={styles.likeWrapper}>
                    <BsHandThumbsUp/>
                </div> 
                <Link to={`/communityPreview/${id}`} key={id}>
                    <button className={styles.viewButton}>view</button>
                </Link>
            </div>
            
        </div>
    );
}

export default CommunityGrid;