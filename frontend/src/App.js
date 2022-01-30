import React from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import InsertProject from './components/insertproject/insertproject';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useState } from 'react';
import DashboardItem from './DashboardItem';
import ProjectList from './pages/projectList/ProjectList';
import Search from './components/Search';
import Barchart from './components/chart/Chart';

function App() {

 
  const [ user , setLoginUser] = useState({})


  return (
    <div className="App"> 

      <Router>
        <Switch>
        <Route path="/">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            {
              user && user._id ? <DashboardItem setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>
            }
          </Route> 
          <Route path="/insertproject">
                 <InsertProject />
            </Route>
            <Route path="/projectlist">
                 <ProjectList />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/chart">
              <Barchart />
            </Route>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
