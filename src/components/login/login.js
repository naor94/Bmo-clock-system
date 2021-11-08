import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants"

const Login = ({ setLoginUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {

        
        axios.post("http://localhost:3000/users/login", user)
        .then(res => {
            console.log("res",res)
            alert("הנך מחובר")
            setLoginUser(res.data.user)
            if (res.statusText === "OK"){
                console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkk")
                localStorage.setItem('autoToken', res.data.token);
                console.log("tokennnnnnnnnnnnnnnn", localStorage.getItem('autoToken'))
            }
            history.push("/clock")
        }).catch(error =>{
            alert("אחד מהפרטים שהזנת שגויים")
            console.log(error)

        });
    
   
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
        </div>
    )
}

export default Login