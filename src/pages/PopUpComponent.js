import React from 'react';
import  '../styles/PopStyles.css';
import styles from '../styles/InputBox.module.css'
import FormFill from './FormFill'
const PopUpComponent = ({ handleClose, show }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button onClick={handleClose} className={styles.button_close}>Close</button>
          <br />
          <FormFill />
        </section>
      </div>
    );
  };
  
  export default PopUpComponent;