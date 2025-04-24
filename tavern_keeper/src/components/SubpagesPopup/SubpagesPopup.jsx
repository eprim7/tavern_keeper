import React, { useEffect } from "react";
import styles from "../SubpagesPopup/SubpagesPopup.module.css";

const SubpagesPopup = ({
  closeModal, // closes the subpage
  children, // prop that is passed
  showPicture, // shows the picture input
  name, // stores the name
  setName, // sets the name
  picture, // stores the picture
  setPicture, // sets the picture
  handleSubmit, // handle submit to enter into the database
  description, // stores description
  setDescription, // sets description
  showDescription, // determines if the description input needs to be shown
  startDate, // stores startDate
  setStartDate, // sets start date
  endDate, // stores end date
  setEndDate, // sets end date
  showStartDate, // determines if the start date input needs to be shown
  showEndDate, // determine if end date input needs to be shown
  data  // default data to be displayed in the popup
}) => {

  /*useEffect(() => {
    if (data && data.name !== undefined) {
      setName(data.name);
    }
  }, [data])*/

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)} className={styles.button}>
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.h1}>{data ? 'Edit' : 'Create'} Your {children}</h1>
          <hr />
        </div>

        <div className={styles.body}>
          <label htmlFor={`${children}-name`} className={styles.label}>
            {children} Name
          </label>
          <input
            type="text"
            //value={name}
            onChange={(e) => setName(e.target.value)}
            defaultValue={data ? data.name : undefined}
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
                      defaultValue={data ? data.description : undefined}
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
                              defaultValue={data ? data.startDate : undefined}
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
                              defaultValue={data ? data.endDate : undefined}
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
