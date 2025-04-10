import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"

function Locations() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [locationName, setlocationName] = useState('')
  const [description, setDescription] = useState('');


  const handleSubmit = async () =>{
    const email = localStorage.getItem("email");

    if(!locationName || !description){
      alert("Please fill in all of the fields")
    } // end of if


    // this matches the user id to the world
    const { data: userData, error: userError } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();

    const userID = userData.id;

    // this matches the world id 
    const{data: worldData, error: worldError} = await supabase
    .from("Worlds")
    .select('id')
    .eq('userID', userID)
    .single();
    console.log("worldData:", worldData);

    try{
      const{error: locationError} = await supabase
      .from("Locations")
      .insert([
        {
          worldID: worldData.id,
          name: locationName,
          description: description,
        }
      ])
      if(locationError){
        alert("There was an error inserting your Location")
      }
      else{
        alert("Your Location was successfully uploaded")
      }
    } catch(error){
      console.error("Error ", error)
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
              Add new Location
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={false} // Set to false to hide the picture input
                showDescription={true}
                name={locationName}
                setName={setlocationName}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
              >
                Location
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
              <div>Name of Location</div>
              <div>Name of Location</div>
              <div>Name of Location</div>
              <div>Name of Location</div>
              <div>Name of Location</div>
              <div>Name of Location</div>
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Locations;
  