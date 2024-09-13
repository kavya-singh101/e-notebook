import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        // to prevent page from reloading after click
        e.preventDefault()

        if(credentials.password!==credentials.cpassword){
            alert("Password and confirm doesn't match");
            return
        }

        // you can use this method too
        // const { name, email, password, cpassword } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // used to send data to the api in json format
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success === true) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account created successfully","success")
        }
        else {
            props.showAlert("Invalid credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container">


                <form className='my-4' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="text" className="form-control" value={credentials.name} onChange={onChange} name='name' id="name" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" placeholder='example@gmail.com' required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} minLength={5} onChange={onChange} name='password' id="password" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" value={credentials.cpassword} minLength={5} onChange={onChange} name='cpassword' id="cpassword" required/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            </div>
        </>
    )
}

export default Signup
