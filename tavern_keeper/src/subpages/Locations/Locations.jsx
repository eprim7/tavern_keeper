import Header from "../../components/Header/Header"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { use, useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

function Locations() {
  const [locations, setLocations] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [defaultData, setDefaultData] = useState(null);
  const [locationName, setlocationName] = useState('')
  const [description, setDescription] = useState('');
  const {id: worldId} = useParams()
  const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ensure the user is signed in, so that the user can not just automatically type in http://localhost:3000/worldOverview/24 and get to that world
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

    // fetch the locations
      
      // get the locations that have already been created from that world for display
      const fetchLocations = async () => {

        if (!worldId) return; // Do nothing if worldId is not available yet

          const { data, error } = await supabase
              .from("Locations")
              .select("*")
              .eq("worldID", worldId);

          if (error) {
              console.error("Error fetching characters:", error);
          } else {
              setLocations(data); // Set characters state
          }
      };

      useEffect(() => {
        fetchLocations();
      }, [worldId]);


  // enter all of the data into the Locations table
  const handleSubmit = async (data) =>{

    // ensure the user enters into all of the input fields
    if(!locationName || !description){
      alert("Please fill in all of the fields")
      return;
    } // end of if

    if(!data) {
      try{
        const{error: locationError} = await supabase
        .from("Locations")
        .insert([
          {
            worldID: worldId,
            name: locationName,
            description: description,
          }
        ])
        if(locationError){
          alert("There was an error inserting your Location")
        }
        else{
          alert("Your Location was successfully uploaded")
          fetchLocations();
        }
      } catch(error){
        console.error("Error ", error)
      }
    } else {
      try{
        const{error: locationError} = await supabase
        .from("Locations")
        .insert(
          {
            name: locationName,
            description: description,
          }
        ).eq("id", data.id);
        if(locationError){
          alert("There was an error inserting your Location")
        }
        else{
          alert("Your Location was successfully uploaded")
          fetchLocations();
        }
      } catch(error){
        console.error("Error ", error)
      }
    }
  } // end of handleSubmit
  
  const clickFunction = (data) => {
    if(data) {
      console.log(`Location Name: ${data.name}`);
      setDefaultData(data);
      setIsPopupOpen(true);
    }
  }

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
                Add new Location
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
                showDescription={true}
                name={locationName}
                setName={setlocationName}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                data={defaultData}
              >
                Location
              </SubpagesPopup>
            )}
  
            <WorldOverviewGrid
                        children={locations.length > 0 ? (
                            locations.map((location) => (
                                <div key={location.id}>
                                    <h3>{location.name}</h3>
                                    <p>{location.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No Locations found</div>
                        )}
                        data={locations}
                        handleClick={clickFunction}
                        />
          </div>
        </div>
      </>
    );
  }
  
  export default Locations;
  