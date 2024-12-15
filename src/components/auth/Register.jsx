import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        try {
            axios.post("https://todosample-sor2.onrender.com/auth/signup", {
                username : username,
                password : password
            })
            .then((response)=> {
                console.log(response.data);
                navigate("/");
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="login-outer">
            <div className="login-inner">
            <div className="login-half-1">
                <div className="heading-div">
                <h2>TODO APP</h2>
                </div>
                <div className="main-content-div">
                    <h2 className="reg-banner">Register</h2>
                    <p>Please enter your details</p>
                    <p className="username">Username</p>
                    <input type = "name" placeholder="Enter your username" onChange={handleUsername}/>
                    <p className="pass-label">Password</p>
                    <input type = "password" placeholder="Enter your password" onChange={handlePassword}/>
                    <button onClick={handleRegister}>Sign up</button>
                    <p className="login-signup">Already have an account? <NavLink to = "/"> Log in</NavLink></p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register;