import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react";
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup";
import supabase from "../../api/supabase-client";

function Characters() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [characterName, setCharacterName] = useState('')
    const [characterURL, setCharacterURL] = useState('')
    const [characterDescription, setCharacterDescription] = useState('')

    const handleSubmit = async () => {
      const email = localStorage.getItem("email");

      // ensures the user fills out all of the fields
      if(!characterName || !characterURL || !characterDescription){
        alert("Please fill in all of the fields")
      }// end of if

      // get the user's id that is signed in
      const { data: userData, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

      // this gets the user id so we can use it to get the world ID
      const userID = userData.id;
      console.log('id from characters ', userData.id)

      // this gets the world id of the user that is currently signed in 
      const{data: worldData, error: worldError} = await supabase
      .from("Worlds")
      .select('id')
      .eq('userID', userID)
      .single();
      console.log("worldData:", worldData);

      // error if there if can't find user
    if (userError || !userData) {
      console.error("User lookup error:", userError);
      alert("User not found.");
      return;
    }

    const file = characterURL
    const fileName = `${Date.now()}-${file.name}`
    console.log("file name ", fileName)
    const { data: uploadData, error: uploadError } = await supabase.storage
    .from("character-portraits")
    .upload(fileName, file);

    // if the image is not able to be inserted into the bucket
    if(uploadError){
      console.error("Upload error ", uploadError)
      alert("Failed to upload image")
      return
    }

    // gets the url from the character portraits bucket, so that we can send that to the characters table
    const publicURLResponse = supabase.storage
    .from('character-portraits')
    .getPublicUrl(fileName)

    const publicURL = publicURLResponse.data.publicUrl;

      try{
          const{error: characterError} = await supabase
          .from("Characters")
          .insert([
            {
              Name: characterName, // enters the character name
              Description: characterDescription, // enters the character description
              PortraitURL: publicURL, // enters the character portrait URL
              WorldID: worldData.id // gets the id of the world connected to the user. Will probably have to change later to ensure it matches the specific world we want to pull up 
            }
          ])
          if(characterError){
            alert("There was an error inserting your character")
            console.error("error ", characterError)
          } // end of if
          else{
            alert("your character was successfully uploaded")
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
              Add new Character
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={true} // Set to false to hide the picture input
                showDescription={true}
                showStartDate={false}
                showEndDate={false}
                name={characterName}
                setName={setCharacterName}
                description={characterDescription}
                setDescription={setCharacterDescription}
                picture={characterURL}
                setPicture={setCharacterURL}
                handleSubmit={handleSubmit}
              >
                Character
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
              <div>Name of Character</div>
              <div>Name of Character</div>
              <div>Name of Character</div>
              <div>Name of Character</div>
              <div>Name of Character</div>
              <div>Name of Character</div>
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Characters;
  