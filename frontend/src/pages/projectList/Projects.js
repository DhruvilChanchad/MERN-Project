import React, {useState} from 'react'
import './projectlist.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const Projects = ({ projectlist , loading }) => {

    let history = useHistory();

    const [newStatus1] = useState("Running")
    const [newStatus2] = useState("Closed")
    const [newStatus3] = useState("Cancelled")

    if(loading){
        return <h2>Loading...</h2>;
    }
    
    function updateRunning(id){
        console.warn("Project Running");
        axios.put("http://localhost:9002/updateRunning", {
            id:id,
            newStatus1: newStatus1,
        })
        history.push('/')
    }

    function updateClose(id){
        // window.location.reload(false);
        console.warn("Project Closed");
        axios.put("http://localhost:9002/updateClosed", {
            id:id,
            newStatus2: newStatus2,
        })
        history.push('/')
    }

    function updateCancelled(id){
        console.warn("Project Cancelled");
        axios.put("http://localhost:9002/updateCancelled", {
            id:id,
            newStatus3: newStatus3,
         })
         history.push('/')
    }

    return (
        <div className='projectlist'>
            <TableContainer>
                <Table>
                <TableBody>
                {
                    projectlist.map(post => 
                    <TableRow className='tablerow' key={post.projectName}>
                        <TableCell className='projectListItem'>{`${post.projectName} ( ${
                                new Intl.DateTimeFormat('en-us', {
                                    year : 'numeric',
                                    month : 'long',
                                    day : '2-digit'
                                }).format(new Date(post.start))
                            } 
                            to 
                            ${
                                new Intl.DateTimeFormat('en-us', {
                                    year : 'numeric',
                                    month : 'long',
                                    day : '2-digit'
                                }).format(new Date(post.end))
                            } 
                            )`}
                        </TableCell>
                        <TableCell className='projectListItem'>{post.type}</TableCell>
                        <TableCell className='projectListItem'>{post.division}</TableCell>
                        <TableCell className='projectListItem'>{post.category}</TableCell>
                        <TableCell className='projectListItem'>{post.priority}</TableCell>
                        <TableCell className='projectListItem'>{post.department}</TableCell>
                        <TableCell className='projectListItem'>{post.location}</TableCell>
                        <TableCell className='projectListItem'>{post.status}</TableCell>
                        <TableCell className='projectListItem'>
                            <div>
                                <button className='projectListBtn' onClick={() => updateRunning(post._id)}>Start</button>                               
                            </div>
                        </TableCell>
                        <TableCell className='projectListItem'>
                            <div>
                                <button className='projectListBtn' onClick={() => updateClose(post._id)}>Close</button>             
                            </div>
                        </TableCell>
                        <TableCell className='projectListItem'>
                            <div>
                                <button className='projectListBtn' onClick={() => updateCancelled(post._id)}>Cancel</button>                               
                            </div>
                        </TableCell>
                    </TableRow>)
                }
                </TableBody>
                </Table>
                </TableContainer>
        </div>
    )
}

export default React.memo(Projects);

