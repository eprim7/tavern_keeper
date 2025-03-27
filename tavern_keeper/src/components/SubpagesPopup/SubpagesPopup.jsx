import React from "react";
import styles from "../SubpagesPopup/SubpagesPopup.module.css";

const SubpagesPopup = ({ closeModal, children, showPicture }) => {
  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => closeModal(false)} className={styles.button}>
              X
            </button>
          </div>
          <div className={styles.title}>
            <h1 className={styles.h1}>Create Your {children}</h1>
            <hr />
          </div>
          <div className={styles.body}>
            <label htmlFor="worldName" className={styles.label}>
              {children} Name
            </label>
            <input
              type="text"
              placeholder={`Enter ${children} name`}
              className={styles.nameInput}
              id="worldName"
              name="worldName"
            />
          </div>
          
          {/* Conditionally render the picture section */}
          {showPicture && (
            <div className={styles.body}>
              <label htmlFor="worldPicture" className={styles.label}>
                {children} Picture
              </label>
              <input
                type="file"
                className={styles.pictureInput}
                accept="image/png, image/jpeg"
                id="worldPicture"
                name="worldPicture"
              />
            </div>
          )}

          <div className={styles.body}>
            <label htmlFor="worldDescription" className={styles.label}>
              {children} Description
            </label>
            <textarea id={`${children}`} name="worldDescription" className={styles.textarea}/>
          </div>
          <div className={styles.footer}>
            <button onClick={() => closeModal(false)} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={() => closeModal(false)}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubpagesPopup;
