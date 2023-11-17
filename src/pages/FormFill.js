import React, { useEffect, useState } from 'react';
import styles from '../styles/InputBox.module.css';
import axios from 'axios';


export default function FormFill() {




  const [itemText, setItemText] = useState('')
  const [listItems, setListItems] = useState([]);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(null); 
  const [completed, setCompleted] = useState(false);
  const [notesText, setNotesText] = useState('');



  //add to db
  
  
  const addItem = async (e) => {
    if (!date) {
      alert('Please select a date before submitting.');
      return;
    }
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText, priority: priority, completed: completed, date: date, notes: notesText});
      setListItems(prev =>[...prev, res.data]);
      setItemText('');
      setPriority(null);
      setDate(null);
      setCompleted(false);
      setNotesText('');
      
    }catch(err){
      console.log(err); 
    }
  }

  //fetch from db


  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:5500/api/items')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);


// delete from dbbbb
  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }


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
        
{/* ADD DATE LATER */}
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



{/* DESCRIPTION */}
<br/>
<br/>
<div>
<textarea draggable='false' placeholder='Add A Note...' className={styles.textarea} 
onChange={e => {setNotesText(e.target.value)} } value={notesText}>
</textarea>
</div>
{/* Submit */}
<br/>
<br />
      <button type='submit' className={styles.save_button}>Save</button>
      </form>

       {
          listItems.map(item => (
          <div className="todo-item">
            {
                <>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" >Update</button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>

                </>
            }
          </div>
          ))
      } 
      <div className='todo-listItems'>

      </div>
    </div>
  );
}