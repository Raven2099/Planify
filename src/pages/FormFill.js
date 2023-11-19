import React, {  useState } from 'react';
import styles from '../styles/InputBox.module.css';
import axios from 'axios';


export default function FormFill() {



  const userEmail = 'abc.xyz@google.com'
  const [itemText, setItemText] = useState('')
  const  setListItems = useState([]);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(null); 
  const [completed, setCompleted] = useState(false);
  const [notesText, setNotesText] = useState('');
  
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState(0);
  //add to db
  
  
  const addItem = async (e) => {
    if (!date) {
      alert('Please select a date before submitting.');
      return;
    }
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText,
      priority: priority,
      completed: completed,
      date: date,
      notes: notesText,
      createdDate:date,
      category: category,
      notification: notification,
      userEmail: userEmail
    }
    );
      setListItems(prev =>[...prev, res.data]);
      setItemText('');
      setPriority(null);
      setDate(null);
      setCompleted(false);
      setNotesText('');
      setCategory('');
      setNotification(0);
      
    }catch(err){
      console.log(err); 
    }
  }

  //fetch from db


  

//TASK ADD FORM HERE

  return (
    <div>
      
      <form className={styles.form} onSubmit={e => addItem(e)}>
      <h1>Add A Task</h1>
{/* ADD A TASK NAME */}

        <input type="text" placeholder='Add Todo Item'
        style={{ textAlign: 'left', marginRight: '500px' }} 
        className={styles.inputbox}
        onChange={e => {setItemText(e.target.value)} } value={itemText} required />
        
{/* Add Date */}
<br>
</br>
<br/>
        <input type='date' required
        onChange={e => {setDate(e.target.value)} } value={date}
        className={styles.datebox}
        ></input>

{/* ADD PRIOIRTY */}
<br />
<br />
<p> Select Task Priority</p>
<div className={styles.radio_input}>
  
<input
    type="radio"
    id="low"
    name="priority"
    value="low"
    
    checked={priority === 'low'}
    onChange={() => setPriority('low')}
  />
  <label htmlFor="low">Low
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#199f6b" d="M6 12L10.2426 16.2426L18.727 7.75732" id="Vector"></path> </g> </g></svg>
    </span>
  </label>


  <input
    type="radio"
    id="medium"
    name="priority"
    value="medium"
    checked={priority === 'medium'}
    onChange={() => setPriority('medium')}
  />
  <label htmlFor="medium">Medium
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#1a89c1" d="M6 12L10.2426 16.2426L18.727 7.75732" id="Vector"></path> </g> </g></svg>
    </span>
  </label>

  <input
    type="radio"
    id="high"
    name="priority"
    value="high"
    checked={priority === 'high'}
    onChange={() => setPriority('high')}
  />
  <label htmlFor="high">High
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#a81f1f" d="M6 12L10.2426 16.2426L18.727 7.75732" id="Vector"></path> </g> </g></svg>
    </span>
  </label>
</div>


{/* ADD CATEGORY */}

<label>Add a Tag</label>
        <select className={styles.textar}
          onChange={(e) => setCategory(e.target.value)}
          value={category}>
            <option value='None' selected disabled hidden>Choose A Tag</option>
            <option value='Work'>Work</option>
            <option value='School'>School</option>
            <option value='Extra'>Extra-Curricular</option>
            <option value='Personal'>Personal</option>
        </select>

{/* DESCRIPTION */}
<br/>
<br/>
<div>
<textarea draggable='false' placeholder='Add A Note...' className={styles.textarea} 
onChange={e => {setNotesText(e.target.value)} } value={notesText}>
</textarea>
</div>

{/* Noti */}
<div style={{ display: 'flex', alignItems: 'right' }}>
  <label style={{ fontSize: '20px', textAlign: 'right', paddingRight: '20px' }}>
    Enable Push Notifications?
  </label>
  <label className="switch" style={{ marginTop: '2px' }}>
    <input
      type="checkbox"
      checked={notification === 1}
      onChange={(e) => setNotification(e.target.checked ? 1 : 0)}
    />
    <span className="slider"></span>
  </label>
</div>

{/* Submit */}
<br/>
<br />
      <button type='submit' className={styles.save_button}>Save</button>
      </form>
    </div>
  );
}