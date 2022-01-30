import './dashboarditem.css';
import InsertProject from './components/insertproject/insertproject';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ProjectList from './pages/projectList/ProjectList';


function App({setLoginUser}) {

  return (     
      <>
      <Router>
      <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Online Project Management</span>
                </div>
                <div className="topRight">      
                    <div className="button" onClick={() => setLoginUser({})}><ExitToAppIcon /></div>
                </div>
            </div>
        </div>
      <div className="dashcontainer">
        <Sidebar />
        <Switch>
            <Route exact path="/">
                 <Home />
            </Route>
            <Route path="/projectlist">
                 <ProjectList />
            </Route>
            <Route path="/insertproject">
                 <InsertProject />
            </Route>
        </Switch>
      </div>
      </Router>    
      </>
  );
}

export default App;
