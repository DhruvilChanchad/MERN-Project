import React,{ useState} from 'react'
import "./register.css"
import axios from "axios"
import { useHistory } from 'react-router-dom'

const Register = () => {

    const history = useHistory()

    const[user , setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const {name , value} = e.target
        setUser({
            ...user,                 //Spread property
            [name] : value
        })
    }

    const register = () => {
        const {name , email , password , reEnterPassword} = user
        if(name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register",user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        }
        else{
            alert("Invalid Input")
        }
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            {console.log(user)}
            <input type="text" placeholder='Your Name' name="name"  id="name" onChange={handleChange} value={user.name}/>
            <input type="email" placeholder='Your Email' name="email" id="email" onChange={handleChange} value={user.email}/>
            <input type="password"  placeholder='Your Password' name="password" id="password" onChange={handleChange} value={user.password}/>
            <input type="password"  placeholder='Re Enter Password' name="reEnterPassword" id="reEnterPassword" onChange={handleChange} value={user.reEnterPassword}/>


            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register