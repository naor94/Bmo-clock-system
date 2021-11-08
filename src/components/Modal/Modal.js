import axios from "axios";
import React from "react";
import "./Modal.css";


function Modal({ setOpenModal }) {
    const token=localStorage.getItem('autoToken')
    console.log("ddddddddddddddddddddddddddddddddddd",token)
    const data = JSON.stringify({"name":"please workkkkkkkk","completed":false});
    const config = {
        method: 'post',
        url: 'localhost:3000/employee',
        headers: { 
          'Authorization':'Bearer {{token}}', 
          'Content-Type': 'application/json',
       
        },
        data : data
      };
      
     
    const AddNewEmp= ()=>{
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
          
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer"> 
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>הוספת עובד חדש</h1>
        </div>
        <div className="body">
            
            <input placeholder= "שם מלא"></input><br/>
            <input placeholder= "תעודת זהות"></input>

        </div>
        <div className="footer"> 
                 <button  onClick={() => {
              AddNewEmp();
            }}>הוסף</button>

          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            יציאה
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;