import React from 'react'
import "./sidebar.css"
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarlistItems active">
                            <DashboardIcon className="sidebarIcon"/>
                            <Link to="/" className="link">Home</Link>
                        </li>
                        <li className="sidebarlistItems">
                            <ListIcon className="sidebarIcon"/>
                            <Link to="/projectlist" className="link">List Project</Link>
                        </li>
                        <li className="sidebarlistItems">
                            <AddIcon className="sidebarIcon"/>
                            <Link to="/insertproject" className="link">Create Project</Link>
                        </li>
                        <li className="sidebarlistItems">
                            <AccountCircleIcon className="sidebarIcon"/>
                            User
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
