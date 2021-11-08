import React, {useEffect, useState } from 'react';
import  "./Time.css"
import axios from "axios"

import DateTimePicker from 'react-datetime-picker';
import Modal from '../Modal/Modal';








const Time = ({userEmail}) => {
    const [value, onChange] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [employees, setEmployee] = useState({});


    useEffect(() => {
      getAllEmployees()
    });
    const token=localStorage.getItem('autoToken')
    console.log("aaaaaaaaaaaa",token)
    const getAllEmployees = ()=> {
      axios.get('localhost:3000/employee', {
        headers: {
          'Authorization':'Bearer {{token}}'
        }
      })
      .then((res) => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",res.data)
      })
      .catch((error) => {
        console.log("there is an error")
        console.error(error)
      })


    }





    return(
        <div className="clock">
        <DateTimePicker 
        format="y-MM-dd h:mm:ss a"
        onChange={onChange}
        value={value}
      />

        <button className= "logoutButton">Logout</button>
        <button  className="addNewEmpButton"  
        onClick={() => {
          setModalOpen(true);
        }}>הוספת עובד חדש</button>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}

       < select  className="selectDesign">
      <option value="בחר עובד מתוך הרשימה">
        בחר עובד
      </option>
      <option value="C-3PO">C-3PO</option>
      <option value="R2-D2">R2-D2</option>
    </select>
        </div>
    
    )


}

export default Time
