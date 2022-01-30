import React, {useState} from 'react'
import "./login.css"
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = ( { setLoginUser}) => {

    const history = useHistory()

    const[user , setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const {name , value} = e.target
        setUser({
            ...user,                 //Spread property
            [name] : value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login",user)
        .then(resp => {
            alert(resp.data.message)
            setLoginUser(resp.data.user)
            history.push("/")
        })
    }

    return (
        <div className='login'>
            {console.log(user)}
            <h1>Login</h1>
            <input type="text" placeholder='Enter Your Email' name='email' onChange={handleChange} value={user.email} />
            <input type="password" placeholder='Enter Your Password' name='password' onChange={handleChange} value={user.password}/>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login