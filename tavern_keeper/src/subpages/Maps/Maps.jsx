import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"

function Maps() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mapName, setMapName] = useState('')
    const [mapURL, setMapURL] = useState('')
    const [mapDescription, setMapDescription] = useState('')


    const handleSubmit = async () => {
      const email = localStorage.getItem("email");

      if(!mapName || !mapURL){
        alert("Please fill in all of the fields")
      }// end of if

      // get the user's id that is signed in
      const { data: userData, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

      // error if there if can't find user
    if (userError || !userData) {
      console.error("User lookup error:", userError);
      alert("User not found.");
      return;
    }

    const userID = userData.id; // the user id from the database
    console.log("userId ", userID)

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

    const publicURLResponse = supabase.storage
    .from('map-images')
    .getPublicUrl(fileName)

    const publicURL = publicURLResponse.data.publicUrl;

      try{
          const{error: mapError} = await supabase
          .from("Maps")
          .insert([
            {
              name: mapName,
              pictureURL: publicURL,
              id: userID
            }
          ])
          if(mapError){
            alert("There was an error inserting your map")
          } // end of if
          else{
            alert("your map was successfully uploaded")
          }
      } catch(error){
        console.error("error ", error)
      }
    } // end of handleSubmit

  
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
  