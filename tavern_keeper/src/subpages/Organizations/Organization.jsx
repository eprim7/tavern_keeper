import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"

function Organizations() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [organizationName, setOrganizationName] = useState('')
    const [description, setDescription] = useState('');


    const handleSubmit = async () =>{
      const email = localStorage.getItem("email");

      // ensures that the user fills out all of the fields
      if(!organizationName || !description){
        alert("Please fill in all of the fields")
      } // end of if


      // this matches the user id to the world
      const { data: userData, error: userError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

      const userID = userData.id;
      console.log('id from organizations')

      // this matches the world id 
      const{data: worldData, error: worldError} = await supabase
      .from("Worlds")
      .select('id')
      .eq('userID', userID)
      .single();
      console.log("worldData:", worldData);

      try{
        const{error: organizationError} = await supabase
        .from("Organizations")
        .insert([
          {
            WorldID: worldData.id, // gets the id of the world connected to the user. Will probably have to change later to ensure it matches the specific world we want to pull up 
            Name: organizationName, // gets the organization name
            Description: description, // gets teh organization description
          }
        ])
        if(organizationError){
          alert("There was an error inserting your organization")
        }
        else{
          alert("Your organization was successfully uploaded")
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
              Add new Organization
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={false} // Set to false to hide the picture input
                showDescription={true}
                name={organizationName}
                setName={setOrganizationName}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
              >
                Organization
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
              <div>Name of Organization</div>
              <div>Name of Organization</div>
              <div>Name of Organization</div>
              <div>Name of Organization</div>
              <div>Name of Organization</div>
              <div>Name of Organization</div>
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Organizations;
  