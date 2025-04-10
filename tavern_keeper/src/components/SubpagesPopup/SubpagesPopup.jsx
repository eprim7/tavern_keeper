import React from "react";
import styles from "../SubpagesPopup/SubpagesPopup.module.css";

const SubpagesPopup = ({
  closeModal,
  children,
  showPicture,
  name,
  setName,
  picture,
  setPicture,
  handleSubmit,
  description,
  setDescription,
  showDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showStartDate,
  showEndDate
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file); // picture will now be a File object
    }
  };

  return (
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
          <label htmlFor={`${children}-name`} className={styles.label}>
            {children} Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Enter ${children} name`}
            className={styles.nameInput}
            id={`${children}-name`}
            name={`${children}-name`}
          />
        </div>

        {showPicture && (
          <div className={styles.body}>
            <label htmlFor={`${children}-picture`} className={styles.label}>
              {children} Picture
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setPicture(e.target.files[0])}
              className={styles.pictureInput}
              id={`${children}-picture`}
              name={`${children}-picture`}
            />
          </div>
        )}

        {showDescription && (<div className={styles.body}>
                    <label htmlFor={`${children}-description`} className={styles.label}>
                      {children} description
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className={styles.pictureInput}
                      id={`${children}-description`}
                      name={`${children}-description`}
                    />
                  </div>
        )}

        {showStartDate && (<div className={styles.body}>
                            <label htmlFor={`${children}-description`} className={styles.label}>
                              {children} Start Date
                            </label>
                            <input
                            type="date"
                              onChange={(e) => setStartDate(e.target.value)}
                              className={styles.pictureInput}
                              id={`${children}-description`}
                              name={`${children}-description`}
                            />
                          </div>
          )}
  
        {showEndDate && (<div className={styles.body}>
                            <label htmlFor={`${children}-description`} className={styles.label}>
                              {children} End Date
                            </label>
                            <input
                              type="date"
                              onChange={(e) => setEndDate(e.target.value)}
                              className={styles.pictureInput}
                              id={`${children}-description`}
                              name={`${children}-description`}
                            />
                          </div>
          )}

        <div className={styles.footer}>
          <button onClick={() => closeModal(false)} className={styles.cancelBtn}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
              closeModal(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};


export default SubpagesPopup;
