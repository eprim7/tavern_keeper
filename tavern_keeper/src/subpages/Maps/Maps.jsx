import Header from "../../components/Header/Header";
import styles from "../Maps/Maps.module.css";
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid";
import { useState, useEffect } from "react";
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup";
import supabase from "../../api/supabase-client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Maps() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Get worldId from URL params
  const { id: worldId } = useParams();

  const [maps, setMaps] = useState([]); // array of all your maps you will fetch from database
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mapName, setMapName] = useState('');
  const [mapURL, setMapURL] = useState('');

  // Ensure the user is signed in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  // Fetch maps if worldId is available
  useEffect(() => {
    if (!worldId) return; // If worldId is not available, do not proceed

    const fetchMaps = async () => {
      const { data, error } = await supabase
        .from("Maps")
        .select("*")
        .eq("worldID", worldId);

      if (error) {
        console.error("Error fetching maps:", error);
      } else {
        setMaps(data); // Set the maps state
      }
    };

    fetchMaps();
  }, [worldId]); // This will run only when worldId changes


  // submitting the data into the database
  const handleSubmit = async () => {

    if (!mapName || !mapURL) {
      alert("Please fill in all of the fields");
      return;
    }

    // upload the url into the bucket
    const file = mapURL;
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("map-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error", uploadError);
      alert("Failed to upload image");
      return;
    }

    const publicURLResponse = supabase.storage
      .from("map-images")
      .getPublicUrl(fileName);

    const publicURL = publicURLResponse.data.publicUrl;

    // upload everything into the Maps table
    try {
      const { error: mapError } = await supabase
        .from("Maps")
        .insert([
          {
            name: mapName,
            pictureURL: publicURL,
            worldID: worldId, // Pass the worldId to associate the map
          },
        ]);

      if (mapError) {
        alert("There was an error inserting your map");
        console.error("Error inserting map:", mapError);
      } else {
        alert("Your map was successfully uploaded");
      }
    } catch (error) {
      console.error("Error inserting map:", error);
    }
  };

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
              Add new Map
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
              showPicture={true}
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
            {maps.length > 0 ? (
              maps.map((map) => (
                <div key={map.id}>
                  <h3>{map.name}</h3>
                  <img
                    src={map.pictureURL}
                    alt={map.name}
                    style={{
                      maxWidth: "50%",
                      borderRadius: "10px",
                      marginTop: "0.5rem",
                    }}
                  />
                </div>
              ))
            ) : (
              <div>No Maps were found</div>
            )}
          </WorldOverviewGrid>
        </div>
      </div>
    </>
  );
}

export default Maps;
