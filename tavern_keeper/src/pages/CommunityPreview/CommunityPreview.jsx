import Header from "../../components/Header/Header";
import styles from "../CommunityPreview/CommunityPreview.module.css";
import { data, useParams } from "react-router-dom";
import { getWorldDataByID } from "../../api/world_accessor";
import { getUserByUserID } from "../../api/world_accessor";
import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../api/data_accessor";
import { dataOptions } from "../../api/data_accessor";
import supabase from "../../api/supabase-client";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { CiMap } from "react-icons/ci";
import { GiCharacter } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
function CommunityPreview(){
    const { id } = useParams()
    const [currentWorld, setCurrentWorld] = useState(null);
    const [authorName, setAuthorName] = useState('');
    const [characterData, setCharacterData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [organzationData, setOrganizationData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [miscellaneousData, setMiscellaneousData] = useState([]);
    const [liked, setLiked] = useState(false);
    
    async function fetchCurrentWorld() {
        const world = await getWorldDataByID(id);
        if(world != null){
            setCurrentWorld(world);
        }
    }
    useEffect(() => {
        if (currentWorld == null) {
          fetchCurrentWorld();
        }
      }, []);
    async function fetchAuthor(userid) {
        const data = await getUserByUserID(userid);
        //console.log("data: ", data);
        if (data.userName) {
            setAuthorName(data.userName);
        } else {
            const email = data.email;
            setAuthorName(email.substring(0, email.length - 10));
        }
    }
    async function fetchData(worldid) {
        const fetchChars = async () => {
            const { data, error } = await supabase
              .from("Characters")
              .select("*")
              .eq("worldID", currentWorld.id);
      
            if (error) {
              console.error("Error fetching characters:", error);
            } else {
              return data;
            }
        };
        const fetchMaps = async () => {
            const { data, error } = await supabase
              .from("Maps")
              .select("*")
              .eq("worldID", currentWorld.id);
      
            if (error) {
              console.error("Error fetching maps:", error);
            } else {
              console.log("map data init: ", data);
              return data;
            }
        };
        const fetchOrganizations = async () => {
            const { data, error } = await supabase
                .from("Organizations")
                .select("*")
                .eq("worldID", currentWorld.id);

            if (error) {
                console.error("Error fetching organizations:", error);
            } else {
                return data;
            }
        };
        const fetchLocations = async () => {
            const { data, error } = await supabase
                .from("Locations")
                .select("*")
                .eq("worldID", currentWorld.id);

            if (error) {
                console.error("Error fetching locations:", error);
            } else {
                return data;
            }
        };
        const fetchEvents = async () => {    
            const { data, error } = await supabase
                .from("Events")
                .select("*")
                .eq("worldID", currentWorld.id);

            if (error) {
                console.error("Error fetching events:", error);
            } else {
                return data;
            }
        };
        const fetchMisc = async () => {
            const {data, error} = await supabase
            .from("Misc")
            .select("*")
            .eq("worldID", currentWorld.id)
    
            if(error){
              console.error("Error fetching miscellaneous ", error)
            } // end of if
            else{
              return data; // set the array with the data from the database
            } // end of else
        } // end of fetchMisc
        const charData = await fetchChars();
        const tempmapData = await fetchMaps();
        const orgData = await fetchOrganizations();
        const locData = await fetchLocations();
        const timeData = await fetchEvents();
        const miscData = await fetchMisc();
        
        if (charData && tempmapData && orgData && locData && timeData && miscData) {
            setCharacterData(charData);
            setMapData(tempmapData);
            setOrganizationData(orgData);
            setLocationData(locData);
            setEventData(timeData);
            setMiscellaneousData(miscData);
        }
    }
    useEffect(() => {
        if (currentWorld) {
            console.log("user id: " + currentWorld.userID);
            fetchAuthor(currentWorld.userID);
        }
    }, [currentWorld]);
    useEffect(() => {
        if(currentWorld) {
            fetchData(currentWorld.id);
            console.log("data success", characterData);
        }
    }, [currentWorld])
    function Section(props) {
        return (
            <div className={styles.sectionwrapper}>
                {props.data.map((entry, index) => {
                    if(props.name == "Maps"){
                        return (
                            <div key={index} className={styles.entryImgCard}><h2>{entry.name}</h2> <img src={entry.pictureURL} className={styles.mapImg}></img></div>
                        );
                    }
                    else if(props.name == "Characters"){
                        return (
                            <div key={index} className={styles.entryImgCard}><h2>{entry.name}</h2> {entry.description} <img src={entry.pictureURL} className={styles.charImg}></img> </div>
                        );
                    }
                    else if(props.name == "Organizations"){
                        return (
                            <div key={index} className={styles.entryCard}><h2>{entry.name}</h2><GoOrganization className={styles.icon}/> {entry.description}</div>
                        );
                    } else if (props.name == "Locations") {
                        return (
                            <div key={index} className={styles.entryCard}><h2>{entry.name}</h2><GrLocationPin className={styles.icon}/> {entry.description}</div>
                        );
                    } else if (props.name == "Timeline") {
                        return (
                            <div key={index} className={styles.entryCard}><h2>{entry.name}</h2><FaHistory className={styles.icon}/> {entry.description} <br/> {entry.startDate} - {entry.endDate} </div>
                        );
                    } else {
                        return (
                            <div key={index} className={styles.entryCard}><h2>{entry.name}</h2><MdMiscellaneousServices className={styles.icon}/> {entry.description} </div>
                        );
                    }
                    
                })}
            </div>

        );
    }
    function LikeButton() {
        return (
            <div className={styles.likeWrapper}>
                <button className={styles.likeButton} onClick={Like}>
                    {liked ? <BsHandThumbsUpFill style={{width: '2em', height: '2em'}}/> : <BsHandThumbsUp style={{width: '2em', height: '2em'}}/>}
                </button>
            </div>
        );
    }
    function Like() {
        //need database functionality
        setLiked(!liked);
    }
    function Banner() {
        return(
            
            <div className={(currentWorld.genre == "Sci-Fi") ? styles.scifibannerwrapper :
                (currentWorld.genre == "Horror") ? styles.horrorbannerwrapper :
                (currentWorld.genre == "Comedy") ? styles.comedybannerwrapper :
                (currentWorld.genre == "Romance") ? styles.romancebannerwrapper :
                (currentWorld.genre == "Mystery") ? styles.mysterybannerwrapper :
                (currentWorld.genre == "Thriller") ? styles.thrillerbannerwrapper :
                (currentWorld.genre == "Nonfiction") ? styles.nonfictionbannerwrapper :
                styles.bannerwrapper
            }></div>
        );
    }
    

    return(
        <>
        <Header />
        {currentWorld == null ? <h1>Loading...</h1> : <Banner/>}
        <div className={styles.introwrapper}>
            <h1>{currentWorld == null ? "Loading..." : currentWorld.title}</h1>
            <label>author</label> <br/>
            <label className={styles.authorlabel}>{currentWorld == null ? "Loading..." : authorName}</label>
            <p>{currentWorld == null ? "Loading..." : currentWorld.description}</p>
        </div>
        <div className={styles.contentwrapper}>
            <h1 className={styles.sectionHeader}>Maps</h1> 
            <Section name="Maps" data={mapData}/>
            <h1 className={styles.sectionHeader}>Characters</h1>
            <Section name="Characters" data={characterData}/>
            <h1 className={styles.sectionHeader}>Organizations</h1>
            <Section name="Organizations" data={organzationData}/>
            <h1 className={styles.sectionHeader}>Locations</h1>
            <Section name="Locations" data={locationData}/>
            <h1 className={styles.sectionHeader}>Timeline</h1>
            <Section name="Timeline" data={eventData}/>
            <h1 className={styles.sectionHeader}>Miscellaneous</h1>
            <Section name="Miscellaneous" data={miscellaneousData}/>
        </div>
        <LikeButton/>

        </>
    )

}

export default CommunityPreview