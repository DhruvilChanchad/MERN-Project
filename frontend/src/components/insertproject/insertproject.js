import React , {useState} from 'react'
import "./insertproject.css"
import axios from "axios"
import { useHistory } from 'react-router-dom'

const InsertProject = () => {

    const history = useHistory()

    const[project , setProject] = useState({
        projectName : "",
        reason : "",
        type : "",
        division : "",
        category : "",
        priority : "",
        department : "",
        start : "",
        end : "",
        location : "",
        status : "Registered"
    }) 

    const handleChange = e => {
        const {name , value} = e.target
        setProject({
            ...project,
            [name] : value
        })
    }

    const insertproject = () => {
        const { projectName ,reason, type, division, category, priority, department, start, end, location, status} = project
        if(projectName && reason && type && division && category && priority && department && start && end && location && status){
            axios.post("http://localhost:9002/insertproject",project)
            .then( res => {
                alert(res.data.message)
                history.push("/projectList")
            })
        }
        else{
            alert("Please Enter All Data Carefully")
        }
    }

    return (
        <div className='insertproject'>
            <h1>Create Project</h1>
            <div className="projectName">
                <input type="text" placeholder="Enter Project" name="projectName" id="project" onChange={handleChange} value={project.project}/>
            </div>
            <select name="reason" id="reason" onChange={handleChange} value={project.reason}>
                <option value="Select Reason">Select Reason</option>
                <option value="Business">Business</option>
                <option value="Dealership">Dealorship</option>
                <option value="Transport">Transport</option>
            </select>

            <select name="type" id="type" onChange={handleChange} value={project.type}>
                <option value="Select Type">Select Type</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
            </select>

            <select name="division" id="division" onChange={handleChange} value={project.division}>
                <option value="Select Division">Select Division</option>
                <option value="Compressor">Compressor</option>
                <option value="Filters">Filters</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water Heater">Water Heater</option>
            </select>

            <select name="category" id="category" onChange={handleChange} value={project.category}>
                <option value="Select Category">Select Category</option>
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
            </select>

            <select name="priority" id="priority" onChange={handleChange} value={project.priority}>
                <option value="Select Priority">Select Priority</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
            </select>

            <select name="department" id="department" onChange={handleChange} value={project.department}>
                <option value="Select Department">Select Department</option>
                <option value="Stratergy">Stratergy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
                <option value="HR">HR</option>
            </select>

            <input type="date" placeholder="Start Date As per Business Plan" name="start" id="start" onChange={handleChange} value={project.start} />
            <input type="date" placeholder="End Date As Per Business Plan" name="end" id="end" onChange={handleChange} value={project.end} />

            <select name="location" id="location" onChange={handleChange} value={project.location}>
                <option value="Select Location">Select Location</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Calcutta">Calcutta</option>
                <option value="Banglore">Banglore</option>
            </select>
            <div className='statusChange'>
                <label htmlFor="status" className="statusLabel">Status :</label>
                <input type="text" name="status" id="status" onChange={handleChange} value={project.status} readOnly/>
            </div>
            <div className="btncontainer">
                <div className="button" onClick={insertproject}>Save Project Details</div>
            </div>
        </div>
    )
}

export default InsertProject