import React, { Component } from 'react'
import './search.css'

class Search extends Component {

    constructor(){
        super()
        this.state={
            searchData:null
        }
    }
    search(key){
        console.warn(key)
        fetch("http://localhost:9002/search/"+key).then((data)=>{
            data.json().then((resp) => {
                console.warn("resp",resp)
                this.setState({searchData:resp})
            })
        })
    }

    render() {
        return (
            <div className='search'>
                <input type="text" onChange={(e)=>this.search(e.target.value)} placeholder='Search...'/>                
                <div>
                    {
                        this.state.searchData?
                        <table>
                            {
                                this.state.searchData.map((project) => (
                                    <tr>
                                        <td>{project.projectName}</td>
                                        <td>{project.type}</td>
                                        <td>{project.division}</td>
                                        <td>{project.category}</td>
                                        <td>{project.priority}</td>
                                        <td>{project.department}</td>
                                        <td>{project.location}</td>
                                        <td>{project.status}</td>
                                    </tr>
                                ))
                            }
                        </table>
                        :""
                    }
                </div>
            </div>
        )
    }
}

export default Search