import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
const LoginSignup = () => {
    const [valid, setvalid] = useState(null)
    const [state, setState] = useState("Login")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const login = async () => {
        console.log("login function executed", formData)
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            window.location.replace("/")
        }
        else {
            setvalid(responseData.errors)
        }

    }
    const signup = async () => {
        console.log("Signup function executed", formData)
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            window.location.replace("/")
        }
        else {
            setvalid(responseData.errors)

        }
    }
    const changehandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">{
                    state === "Sign Up" ? <input type="text" onChange={changehandler} name='username' value={formData.username} placeholder='Your Name' /> : <></>}

                    <input name='email' onChange={changehandler} value={formData.email} type="email" placeholder='Email Address ' />
                    <input name='password' onChange={changehandler} value={formData.password} type="password" placeholder='Password' />
                    {valid && <p style={{ color: "red" }} className="error-message">{valid}</p>}
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>{state === "Login" ? "Login" : "Signup"}</button>
                {state === "Sign Up" ? <p className="loginsignup-login">
                    Already have an account? <span onClick={() => setState("Login")}>Login</span>
                </p> : <></>}
                {state === "Login" ? <p className="loginsignup-login">
                    Create an account? <span onClick={() => setState("Sign Up")}>Click Here</span>
                </p> : <></>}

                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p> By continuing,i agree to the terms of use & privacy policy</p>
                </div>

            </div>

        </div>
    )
}

export default LoginSignup
