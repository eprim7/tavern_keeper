import Header from "../../components/Header/Header"
import styles from "../Characters/Characters.module.css"
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid"
import { useState } from "react"
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup"
import supabase from "../../api/supabase-client"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

function Organizations() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [defaultData, setDefaultData] = useState(null);
    const [organizationName, setOrganizationName] = useState('')
    const [description, setDescription] = useState('');
    const {id: worldId} = useParams()
    const [organizations, setOrganizations] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ensure the user is signed in, so that the user can not just automatically type in http://localhost:3000/worldOverview/24 and get to that world
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

    // fetching characters from database based on worldID
     

      // fetch all of the organizations connected to the world
      const fetchOrganizations = async () => {
        if (!worldId) return; // Do nothing if worldId is not available yet

          const { data, error } = await supabase
              .from("Organizations")
              .select("*")
              .eq("worldID", worldId);

          if (error) {
              console.error("Error fetching characters:", error);
          } else {
              setOrganizations(data); // Set characters state
          }
      };

      useEffect(() => {
        fetchOrganizations();
      }, [worldId]);




  // submit all of the data into the Organizations table
    const handleSubmit = async (data) =>{

      // ensures that the user fills out all of the fields
      if(!organizationName || !description){
        alert("Please fill in all of the fields")
        return;
      } // end of if


      if(!data) {
        try{
          const{error: organizationError} = await supabase
          .from("Organizations")
          .insert([
            {
              worldID: worldId,
              name: organizationName, // gets the organization name
              description: description, // gets teh organization description
            }
          ])
          if(organizationError){
            alert("There was an error inserting your organization")
          }
          else{
            alert("Your organization was successfully uploaded")
            fetchOrganizations()
          }
        } catch(error){
          console.error("Error ", error)
        }
      } else {
        try{
          const{error: organizationError} = await supabase
          .from("Organizations")
          .update(
            {
              name: organizationName, // gets the organization name
              description: description, // gets teh organization description
            }
          ).eq("id", data.id);
          if(organizationError){
            alert("There was an error inserting your organization")
          }
          else{
            alert("Your organization was successfully updated")
            fetchOrganizations()
          }
        } catch(error){
          console.error("Error ", error)
        }
      }
    } // end of handleSubmit

    const clickFunction = (data) => {
      console.log("I got Clicked! Yay!");
      if(data) {
        console.log(`Organizaion's name: ${data.name}`);
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
                Add new Organization
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
                name={organizationName}
                setName={setOrganizationName}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                data={defaultData}
              >
                Organization
              </SubpagesPopup>
            )}
  
              <WorldOverviewGrid
                children={organizations.length > 0 ? (
                  organizations.map((organization) => (
                      <div key={organization.id}>
                          <h3>{organization.name}</h3>
                          <p>{organization.description}</p>
                      </div>
                  ))
                ) : (
                  <div>No Organizations found</div>
                )}
                data={organizations}
                handleClick={clickFunction}
              />
          </div>
        </div>
      </>
    );
  }
  
export default Organizations;
  