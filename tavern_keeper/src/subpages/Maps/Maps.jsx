import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Maps() {

  // ensures user is signed in 
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ensure the user is signed in, so that the user can not just automatically type in http://localhost:3000/worldOverview/24 and get to that world
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mapName, setMapName] = useState('')
    const [mapURL, setMapURL] = useState('')
    const {id: worldId} = useParams()

    const handleSubmit = async () => {
      const email = localStorage.getItem("email");

      // ensures the user fills out all of the fields
      if(!mapName || !mapURL){
        alert("Please fill in all of the fields")
      }// end of if

      // this matches the user id to the world
      const { data: userData, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

      // this gets the user id so that we can use it to match the worlds
      // const userID = userData.id;
      console.log("worldId from URL:", worldId); // optional

      // error if there if can't find user
    if (userError || !userData) {
      console.error("User lookup error:", userError);
      alert("User not found.");
      return;
    }

    const file = mapURL
    const fileName = `${Date.now()}-${file.name}`
    console.log("file name ", fileName)
    const { data: uploadData, error: uploadError } = await supabase.storage
    .from("map-images")
    .upload(fileName, file);

    if(uploadError){
      console.error("Upload error ", uploadError)
      alert("Failed to upload image")
      return
    }

    // gets the url from the map images bucket so that we can send it to the maps table
    const publicURLResponse = supabase.storage
    .from('map-images')
    .getPublicUrl(fileName)

    const publicURL = publicURLResponse.data.publicUrl;

      try{
          const{error: mapError} = await supabase
          .from("Maps")
          .insert([
            {
              name: mapName, // gets the map name
              pictureURL: publicURL, // gets the map picture 
              worldID: worldId /// gets the id of the world connected to the user. Will probably have to change later to ensure it matches the specific world we want to pull up 
            }
          ])
          if(mapError){
            alert("There was an error inserting your map")
            console.error("error ", mapError)
          } // end of if
          else{
            alert("your map was successfully uploaded")
          }
      } catch(error){
        console.error("error ", error)
      }
  }// end of handleSubmit

    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
  
          <div className={styles.content}>
            <button className={styles.button} onClick={() => setIsPopupOpen(true)}>
              Add new Map
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={true} // Set to false to hide the picture input
                showDescription={false}
                showStartDate={false}
                showEndDate={false}
                name={mapName}
                setName={setMapName}
                picture={mapURL}
                setPicture={setMapURL}
                handleSubmit={handleSubmit}
              >
                Map
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
              <div>Name of Map</div>
              <div>Name of Map</div>
              <div>Name of Map</div>
              <div>Name of Map</div>
              <div>Name of Map</div>
              <div>Name of Map</div>
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Maps;
  