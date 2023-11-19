import { useState,useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PopUpComponent from './PopUpComponent';
import axios from 'axios';

import "../styles/HomePage.css";

const Homepage = () => {

    const [view, setView] = useState("list");
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');
    // Pop Up Component
    const [show, setShow] = useState(false);
    const handleShow = () => {
      setShow(true);
    };
    const handleClose = () => {
      setShow(false);
    };

    //logged in user fetch tasks
    const [listItems, setListItems] = useState([]);
    const loggedInUserId = 'abc.xyz@google.com';
    useEffect(() => {
      const fetchUserTasks = async () => {
        try {
          const res = await axios.get(`http://localhost:5500/api/user/${loggedInUserId}/tasks`);
          setListItems(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserTasks();
    }, [loggedInUserId]);

// delete tasks

      const deleteItem = async (id) => {
        try {
          await axios.delete(`http://localhost:5500/api/item/${id}`);
          const updatedListItems = listItems.filter(task => task._id !== id);
          setListItems(updatedListItems);
        } catch (err) {
          console.log(err);
        }
      };

      //update
      const updateItem = async (e, taskId) => {
        e.preventDefault();
        try {
          const res = await axios.put(`http://localhost:5500/api/item/${taskId}`, {
            item: updateItemText, 
            date: newDateValue, 
            notes: newNotesValue 
          });
          
          const updatedTask = res.data; 
      
          const updatedListItems = listItems.map(task => {
            if (task._id === taskId) {
              return { ...task, ...updatedTask }; 
            }
            return task;
          });
      
          setListItems(updatedListItems);
          setUpdateItemText('');
          setIsUpdating('');
        } catch (err) {
          console.log(err);
        }
      };
      
      const renderUpdateForm = (task) => (
        <form
  className="update-form"
  style={{
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px', // Adjust the width as needed
    margin: '0 auto' // Center the form horizontally
  }}
  onSubmit={(e) => updateItem(e, task._id)}
>
  <input
    className='update-new-input'
    style={{
      marginBottom: '10px',
      padding: '8px',
      fontSize: '16px'
    }}
    type="text"
    placeholder="New Item"
    onChange={e => setUpdateItemText(e.target.value)}
    value={updateItemText}
  />
  <input
    className='update-new-input'
    style={{
      marginBottom: '10px',
      padding: '8px',
      fontSize: '16px'
    }}
    type="date"
    placeholder="New Date"
    onChange={e => setNewDateValue(e.target.value)}
    value={newDateValue}
  />
  <textarea
    className='update-new-input'
    style={{
      marginBottom: '10px',
      padding: '8px',
      fontSize: '16px',
      resize: 'vertical',
      minHeight: '100px' // Set minimum height
    }}
    placeholder="New Notes"
    onChange={e => setNewNotesValue(e.target.value)}
    value={newNotesValue}
  ></textarea>
  <button
    className="update-new-btn"
    style={{
      padding: '10px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }}
    type='submit'
  >
    Update
  </button>
</form>
      );
      
      // State variables for new date and notes values
      const [newDateValue, setNewDateValue] = useState('');
      const [newNotesValue, setNewNotesValue] = useState('');





    return (
        <>
          <Nav />
          <div className="homepage-wrapper pb-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9">
                  <div className="btn-group">
                    <div
                      className="dropdown-toggle m-3"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Views
                    </div>
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setView("list");
                        }}
                      >
                        List View
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setView("grid");
                        }}
                      >
                        Grid View
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setView("calendar");
                        }}
                      >
                        Calendar View
                      </button>
                    </div>
    
                    <div
                      className="dropdown-toggle m-3"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </div>
                    <div className="dropdown-menu">
                      <button className="dropdown-item">Alphabetical</button>
                      <button className="dropdown-item">Created date</button>
                      <button className="dropdown-item">Deadline</button>
                    </div>
    
                    <div
                      className="dropdown-toggle m-3"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Filter by
                    </div>
                    <div className="dropdown-menu">
                      <button className="dropdown-item">Category</button>
                      <button className="dropdown-item">Priority</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-end"> 
                {/* Create Task Button Here */}
                <button onClick={handleShow} className="btn btn-success m-3">Create Task</button>
                <PopUpComponent show={show} handleClose={handleClose} />
                </div>
              </div>
            </div>


            {view === "grid" && (
              <div className="container-fluid grid-view">
                <div className="row">
                  {listItems.map((task) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 todo-item" key={task.name}>
                      <div className="card my-3">
                        <div className="card-body">
                          <h5 className="card-title item-content">{task.item}</h5>
                          <p className="card-text">{task.notes}</p>
                          <button className="btn btn-primary me-2">View</button>
                          <button className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}




            {view === "list" && (
              <div className="container-fluid list-view">
                <div className="row d-flex flex-column align-items-center">
                  {listItems.map((task) => (
                    <div className="col-8 m-3 todo-item"  key={task.name}>
                      <div className="card">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div style={{ width: "70%" }}>
                            <h5 className="d-inline me-3 item-content">{task.item}</h5>
                            <span className={`priority-tag priority-${task.priority.toLowerCase()} me-2`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
                            </span>
                          </div>
                          <div>
                            
                            
                            {isUpdating === task._id
                            ? renderUpdateForm(task)
                            : (
                            <>
                            <button className="btn btn-primary me-2">View</button>
      <button className="btn btn-success me-2" onClick={() => setIsUpdating(task._id)}>Update</button>
      <button className="btn btn-danger delete-item" onClick={() => deleteItem(task._id)}>Delete</button>
    </>
  )
}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}





            {view === "calendar" && (
              <div className="container-fluid">
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card">
                      <div className="card-body">Calendar</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </>
      );
    };
    
    export default Homepage;
