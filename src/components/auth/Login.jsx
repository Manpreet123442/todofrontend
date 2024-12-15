import axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/authContext";
function Login() {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const inputs = {username,password};


    async function handleSubmit(e) {
        try {
           await login(inputs);
           navigate("/dashboard");
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
                        <h2>Welcome Back</h2>
                        <p>Please enter your details</p>
                        <p className="label">Email Address</p>
                        <input type="email" placeholder="Enter your email" onChange={handleUsername}/>
                        <p className="pass-label">Password</p>
                        <input type="password" placeholder="Enter your password" onChange={handlePassword}/>
                        <button onClick={handleSubmit}>Sign in</button>
                        <p className="login-signup">Don't have an account? <NavLink to="/register"> Sign up</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;