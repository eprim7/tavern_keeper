import Header from "../../components/Header/Header";
import styles from "../Characters/Characters.module.css";
import WorldOverviewGrid from "../../components/WorldOverviewGrid/WorldOverviewGrid";
import { useState, useEffect } from "react";
import SubpagesPopup from "../../components/SubpagesPopup/SubpagesPopup";
import supabase from "../../api/supabase-client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Characters() {
    const { id: worldId } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [characters, setCharacters] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [characterName, setCharacterName] = useState('');
    const [characterURL, setCharacterURL] = useState('');
    const [characterDescription, setCharacterDescription] = useState('');

    // Ensure the user is logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/signin");
        }
    }, [isLoggedIn, navigate]);

    // fetching characters from database based on worldID
    useEffect(() => {
        if (!worldId) return; // Do nothing if worldId is not available yet

        
        // get the characters that have already been created in that world
        const fetchCharacters = async () => {
            const { data, error } = await supabase
                .from("Characters")
                .select("*")
                .eq("WorldID", worldId);

            if (error) {
                console.error("Error fetching characters:", error);
            } else {
                setCharacters(data); // Set characters state
            }
        };

        fetchCharacters();
    }, [worldId]); // This effect depends on worldId

    const handleSubmit = async () => {

        // Ensure the user fills out all fields
        if (!characterName || !characterURL || !characterDescription) {
            alert("Please fill in all of the fields");
            return;
        }

        // Upload image to the storage bucket
        const file = characterURL;
        const fileName = `${Date.now()}-${file.name}`;
        console.log("file name", fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("character-portraits")
            .upload(fileName, file);

        if (uploadError) {
            console.error("Upload error", uploadError);
            alert("Failed to upload image");
            return;
        }

        // gets the URL from the bucket to display in the characters table
        const publicURLResponse = supabase.storage
            .from('character-portraits')
            .getPublicUrl(fileName);

        const publicURL = publicURLResponse.data.publicUrl;

        // Insert character data into the Characters table
        try {
            const { error: characterError } = await supabase
                .from("Characters")
                .insert([
                    {
                        Name: characterName,
                        Description: characterDescription,
                        PortraitURL: publicURL,
                        WorldID: worldId,
                    }
                ]);

            if (characterError) {
                alert("There was an error inserting your character");
                console.error("error", characterError);
            } else {
                alert("Your character was successfully uploaded");
            }
        } catch (error) {
            console.error("error", error);
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
                            Add new Character
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
                        {characters.length > 0 ? (
                            characters.map((character) => (
                                <div key={character.id}>
                                    <h3>{character.Name}</h3>
                                    <img
                                        src={character.PortraitURL}
                                        alt={character.Name}
                                        className={styles.mapImage}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>No Characters found</div>
                        )}
                    </WorldOverviewGrid>
                </div>
            </div>
        </>
    );
}

export default Characters;
