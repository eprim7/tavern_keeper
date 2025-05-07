import Header from "../../components/Header/Header"
import styles from "../Account/Account.module.css";
import { LuPencil } from "react-icons/lu";
import React, {useEffect, useState} from 'react';
import ProfilePicturePopup from "../../components/ProfilePicturePopup/ProfilePicturePopup"
import UsernamePopup from "../../components/UsernamePopup/UsernamePopup"
import { updateUserDescription } from "../../api/data_uploader";
import { getUserByEmail } from "../../api/world_accessor";
import { getPlayerWorlds } from "../../api/world_accessor";
import { BsHandThumbsUp } from "react-icons/bs";
import { Link } from "react-router-dom";

function Account() {
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [userPopupOpen, setUserPopupOpen] = useState(false);
    const [userWorlds, setUserWorlds] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    
    async function fetchUser() {
       const storedEmail = localStorage.getItem("email");
       const user = await getUserByEmail(storedEmail);
       if(user.userName) {
            setUsername(user.userName);
       } else {
            setUsername(storedEmail.substring(0, storedEmail.length - 10));
       }
       setDescription(user.description);
       const worldData = await getPlayerWorlds(storedEmail);
       setUserWorlds(worldData);
       var likecnt = 0;
       worldData.forEach((world) => likecnt += world.likes);
       setTotalLikes(likecnt);
    }
    useEffect(() => {
        fetchUser()
    }, [username]);

    

    const ProfilePicture = (props) => {
        return (
            <button className={styles.profileButton}>
                <img src={props.image} alt="pfp" className={styles.profilepicture}></img>
            </button>
        );
    }

    const handleSubmit = async () => {
        const storedEmail = localStorage.getItem("email");
        await updateUserDescription(storedEmail, description);
        console.log(storedEmail, description);
        alert("description updated!");
        return;
    }

    function UserWorldContent(props) {
        return (
            <div className={styles.worldsWrapper}>
                {props.data.map((world, index) => {
                    return (
                        <div key={index} className={styles.worldCard}>
                            <div className={(world.genre == "Sci-Fi") ? styles.scifiBanner :
                                            (world.genre == "Horror") ? styles.horrorBanner :
                                            (world.genre == "Comedy") ? styles.comedyBanner :
                                            (world.genre == "Romance") ? styles.romanceBanner :
                                            (world.genre == "Thriller") ? styles.thrillerBanner :
                                            (world.genre == "Nonfiction") ? styles.nonfictionBanner :
                                            (world.genre == "Mystery") ? styles.mysteryBanner :
                                            styles.banner}></div>
                            <h2 className={styles.titleHeader}>{world.title}</h2>
                            <p className={styles.description}>{world.description}</p>
                            <label className={styles.genreLabel}>{world.genre}</label>
                            <div className={styles.bottomWrapper}>
                                <label>{world.likes}</label> 
                                <div className={styles.likeWrapper}><BsHandThumbsUp/></div>
                                <Link to={`/worldOverview/${world.id}`} key={world.id}>
                                    <button className={styles.viewButton}>view</button>
                                </Link>
                            </div> 
                        </div>
                    );
                })}
            </div>
        );
    }
    

    return(
        <>
            <Header />
            <div className={styles.bannerwrapper}>
                <ProfilePicture image="/assets/logo.png"/>
                <div className={styles.usernamewrapper}>
                    <h1>{username}</h1>
                    <div className={styles.pencil}>
                        <button className={styles.pencilbutton} onClick={() => setUserPopupOpen(true)}>
                            <LuPencil style={{width: '2em', height: '2em'}}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.contentwrapper}>
                <h1 className={styles.accountHeader}>About Me</h1>
                <textarea className={styles.descriptionArea}placeholder="Tell us a little about yourself..." value={description} onChange={(e) => setDescription(e.target.value)}/> 
                <button className={styles.updateButton} onClick={handleSubmit}>Update</button>
                <h1 className={styles.accountHeader}>Worlds Created</h1>
                <UserWorldContent data={userWorlds}/>
                <h1 className={styles.accountHeader}>Total Likes</h1>
                <h2>{totalLikes}</h2>
            </div>
            <ProfilePicturePopup/>
            {userPopupOpen && <UsernamePopup closeModal={setUserPopupOpen} refreshName={fetchUser}/>}
            
        </>
    )
}


export default Account 