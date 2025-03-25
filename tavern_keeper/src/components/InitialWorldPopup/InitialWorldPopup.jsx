import styles from './InitialWorldPopup.module.css';
const InitialWorldPopup = ({ closeModal}) => {
    return(

        <>
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
                        <label htmlFor="worldName" className={styles.label}>World Name</label>
                        <input type="text" placeholder='world name' className={styles.nameInput} id='worldName' name='worldName' />
                    </div>
                    <div className={styles.body}>
                        <label htmlFor="worldPicture" className={styles.label}>World Picture</label>
                        <input type="file" className={styles.pictureInput} accept='image/png, image/jpeg' id='worldPicture' name='worldPicture' />
                    </div>
                    <div className={styles.body}>
                        <label htmlFor="worldGenre" className={styles.label}>World Genre</label>
                        <select name="worldGenre" id="worldGenre" className={styles.worldGenre}>
                         <option value="Select" disabled hidden selected>Select a Genre</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="darkFantasy">Dark Fantasy</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    <div className={styles.body}>
                        <input type="checkbox" id='checkbox' />
                        <label htmlFor="checkbox" className={styles.label}>Public</label>
                    </div>
                    <div className={styles.footer}>
                        <button onClick={() => closeModal(false)} className={styles.cancelBtn}>Cancel</button>
                        <button onClick={() => closeModal(false)}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}   


export default InitialWorldPopup