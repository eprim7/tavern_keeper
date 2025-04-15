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

function Timelines() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const { id: worldId } = useParams()
  const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ensure the user is signed in, so that the user can not just automatically type in http://localhost:3000/worldOverview/24 and get to that world
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

  const handleSubmit = async () =>{
    // const email = localStorage.getItem("email");

    if(!eventName || !description){
      alert("Please fill in all of the fields")
    } // end of if


    /* this matches the user id to the world
    //const { data: userData, error: userError } = await supabase
    //.from("User")
    //.select("id")
    //.eq("email", email)
    //.single();
    */

    // actually insert the data into the events table
    try{
      const{error: eventError} = await supabase
      .from("Events")
      .insert([
        {
          worldID: worldId,
          name: eventName,
          description: description,
          startDate: startDate,
          endDate: endDate
        }
      ])
      if(eventError){
        alert("There was an error inserting your event")
        console.error("error ", eventError)
      }
      else{
        alert("Your event was successfully uploaded")
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
              Add new Timeline
            </button>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={false} // Set to false to hide the picture input
                showDescription={true} // shows the description text area
                showStartDate={true} // shows the startDate box
                showEndDate={true} // shows the endDate box
                name={eventName} // gets the name
                setName={setEventName} // sets the name
                description={description} // gets the description
                setDescription={setDescription} // sets the description
                startDate={startDate} // gets the start date
                setStartDate={setStartDate} // sets the start date
                endDate={endDate} // gets the end date
                setEndDate={setEndDate} // sets the end date
                handleSubmit={handleSubmit} // function to submit all the info
              >
                Timeline
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
              <div>Name of Timeline</div>
              <div>Name of Timeline</div>
              <div>Name of Timeline</div>
              <div>Name of Timeline</div>
              <div>Name of Timeline</div>
              <div>Name of Timeline</div>
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Timelines;
  