import { useState } from "react";
import supabase from "../../api/supabase-client";
import styles from "./InitialWorldPopup.module.css";

const InitialWorldPopup = ({ closeModal, refreshWorlds }) => {
    const [worldTitle, setWorldTitle] = useState("");
    const [worldGenre, setWorldGenre] = useState("");
    const [isWorldPublic, setIsWorldPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [worldDescription, setWorldDescription] = useState("");

    let userEmail = localStorage.getItem("email")

    // Function to submit the world data
    const handleSubmit = async () => {
        // makes sure the user fills out all the fields
        if (!worldTitle || !worldGenre || !worldDescription) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            // Retrieve user ID from Supabase using the email
            const { data: userData, error: userError } = await supabase
                .from("User")
                .select("id")
                .eq("email", userEmail)
                .single();

                // if there is an error, or if there is no user data throw an error
            if (userError || !userData) {
                console.error("Error retrieving user ID:", userError);
                alert("User not found.");
                setLoading(false);
                return;
            }

            const userID = userData.id;

            // Insert new world into the database
            const { error: worldError } = await supabase
                .from("Worlds")
                .insert([
                    {
                        title: worldTitle, // gets hte name of the world 
                        userID: userID, // gets the user id
                        genre: worldGenre, // gets the genre 
                        isPublic: isWorldPublic, // gets if the world if public
                        dateCreated: new Date().toISOString(), // gets the current date
                        description: worldDescription, // gets the description
                        likes: 0, // defaults likes to 0, will be updated in the community page
                    }
                ]);

                // if the information was not successfully inserted into the database
            if (worldError) {
                console.error("Error inserting world:", worldError);
                alert("Failed to create world.");
            } else {
                alert("World successfully created!");
                await refreshWorlds()
                closeModal(false);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }

        setLoading(false);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button onClick={() => closeModal(false)} className={styles.button}> X </button>
                </div>
                <div className={styles.title}>
                    <h1 className={styles.h1}>Create Your World</h1>
                    <hr />
                </div>
                <div className={styles.body}>
                    <label htmlFor="worldTitle" className={styles.label}>World Title</label>
                    <input
                        type="text"
                        placeholder="World Title"
                        className={styles.nameInput}
                        id="worldTitle"
                        name="worldTitle"
                        value={worldTitle}
                        onChange={(e) => setWorldTitle(e.target.value)}
                    />
                </div>
                <div className={styles.body}>
                    <label htmlFor="worldTitle" className={styles.label}>Description</label>
                    <textarea
                        type="text"
                        placeholder="World Description"
                        className={styles.nameInput}
                        id="worldDescription"
                        name="worldDescription"
                        value={worldDescription}
                        onChange={(e) => setWorldDescription(e.target.value)}
                    />
                </div>
                <div className={styles.body}>
                    <label htmlFor="worldGenre" className={styles.label}>World Genre</label>
                    <select
                        name="worldGenre"
                        id="worldGenre"
                        className={styles.worldGenre}
                        value={worldGenre}
                        onChange={(e) => setWorldGenre(e.target.value)}
                    >
                        <option value="" disabled hidden>Select a Genre</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Nonfiction">Nonfiction</option>
                    </select>
                </div>
                <div className={styles.body}>
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={isWorldPublic}
                        onChange={(e) => setIsWorldPublic(e.target.checked)}
                    />
                    <label htmlFor="checkbox" className={styles.label}>Public</label>
                </div>
                <div className={styles.footer}>
                    <button onClick={() => closeModal(false)} className={styles.cancelBtn}>Cancel</button>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitialWorldPopup;
