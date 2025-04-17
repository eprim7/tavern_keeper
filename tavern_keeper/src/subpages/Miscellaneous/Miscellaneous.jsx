import Header from "../../components/Header/Header"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import supabase from "../../api/supabase-client"

function Miscellaneous() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [miscName, setMiscName] = useState('')
    const [miscDescription, setMiscDescription] = useState('')
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const {id: worldId} = useParams()
    const [misc, setMisc] = useState([])

  // ensure the user is signed in, so that the user can not just automatically type in http://localhost:3000/worldOverview/24 and get to that world
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

      // if there is no worldID don't even try to fetch the worlds. This "SHOULD" never happen but idk

      // fetch the miscellaneous data the user has entered into the world
      const fetchMisc = async () => {

        if(!worldId) return;

        const {data, error} = await supabase
        .from("Misc")
        .select("*")
        .eq("worldID", worldId)

        if(error){
          console.error("Error fetching miscellaneous ", error)
        } // end of if
        else{
          setMisc(data) // set the array with the data from the database
        } // end of else
      } // end of fetchMisc

      useEffect(() => {
        fetchMisc();
      }, [worldId])

    // submit the data into the Misc table 
    const handleSubmit = async () => {

      // ensures the user completely fills in the popup
      if(!miscName || !miscDescription){
        alert("Please fill in all fields")
        return;
      } // end of if

      // attempt to insert the data into the database
      try{
        const {error: miscellaneousError} = await supabase
        .from("Misc")
        .insert([
          {
            worldID: worldId,
            name: miscName,
            description: miscDescription
          }
        ])
        // if the data was not input into the database
        if(miscellaneousError){
          alert("There was an error inserting your item")
        } // end of if
        else{
          alert("Your item was successfully added")
          fetchMisc();
        } // end of else
      }catch(error){
        console.error("error ", error)
      } // end of catch
    } // end of handleSubmit


  
    return (
      <>
      <Header />
        <div className={styles.centerWrapper}>
          <div className={styles.content}>
            <div className={styles.buttonRow}>
              <button
                className={styles.button}
                onClick={() => setIsPopupOpen(true)}
              >
                Add new Miscellaneous
              </button>

              <Link to={`/worldOverview/${worldId}`}>
                <button className={styles.button}>
                  Navigate back to the world Overview page
                </button>
              </Link>
            </div>
            
            {isPopupOpen && (
              <SubpagesPopup
                closeModal={setIsPopupOpen}
                showPicture={false} // Set to false to hide the picture input
                showDescription={true} // show the description
                name={miscName}
                setName={setMiscName} 
                description={miscDescription}
                setDescription={setMiscDescription}
                handleSubmit={handleSubmit}
              >
                Miscellaneous
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid>
            {misc.length > 0 ? (
                    misc.map((miscellaneous) => (
                      <div key={miscellaneous.id}>
                        <h3>{miscellaneous.name}</h3>
                         <p>{miscellaneous.description}</p>
                      </div>
                    ))) : (
                            <div>No Miscellaneous items found</div>
                          )}
            </WorldOverviewGrid>
          </div>
        </div>
      </>
    );
  }
  
  export default Miscellaneous;
  