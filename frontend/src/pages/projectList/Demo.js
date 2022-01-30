import React, { Component } from 'react';
import './projectlist.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from '@material-ui/core';

export default class Projects extends Component {

    constructor(){
        super();
        this.state={
            projects:[]
        }
    }

    async componentDidMount(){
        try{
            const response = await fetch("http://localhost:9002/projects");
            const projects = await response.json();
            console.log(projects);
            this.setState({projects : projects})
        }catch(err){
            console.log(err);
        }
    }

    componentDidUpdate(pP,pS,sS){
        
    }

  render() {
        console.log("rendered")
        const {projects} = this.state;
    return (
        <div className='projectlist'>
            <TableContainer>
                <Table>
                <TableBody>
                    {projects.map((item) =>{
                        return(
                            <TableRow key={item._id}>
                                <TableCell className='projectListItem'>{`${item.projectName} ( ${item.start} to ${item.end} )`}</TableCell>
                                <TableCell className='projectListItem'>{item.type}</TableCell>
                                <TableCell className='projectListItem'>{item.division}</TableCell>
                                <TableCell className='projectListItem'>{item.category}</TableCell>
                                <TableCell className='projectListItem'>{item.priority}</TableCell>
                                <TableCell className='projectListItem'>{item.department}</TableCell>
                                <TableCell className='projectListItem'>{item.location}</TableCell>
                                <TableCell className='projectListItem'>{item.status}</TableCell>
                                <TableCell className='projectListItem'>
                                    <div>
                                        {/* <input type="text" onChange={(e) => {setNewStatus1(e.target.value)}} value={newStatus1} hidden/> */}
                                        <button className='projectListBtn'>Start</button>                               
                                    </div>
                                </TableCell>
                                <TableCell className='projectListItem'>
                                    <div>
                                        {/* <input type="text" onChange={(e) => {setNewStatus2(e.target.value)}} value={newStatus2} hidden/> */}
                                        <button className='projectListBtn'>Close</button>             
                                    </div>
                                </TableCell>
                                <TableCell className='projectListItem'>
                                    <div>
                                        {/* <input type="text" onChange={(e) => {setNewStatus3(e.target.value)}} value={newStatus3} hidden/> */}
                                        <button className='projectListBtn'>Cancel</button>                               
                                    </div>
                                </TableCell>
                            </TableRow>
                        )        
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
  }
}
