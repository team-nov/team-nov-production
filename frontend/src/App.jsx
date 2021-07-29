import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import custom css
import './App.css' 
// import components
import DmsDemo from './DmsDemo/DmsDemo'
// import Demo from './Demo/Demo'
// import UserPost from './UserPost/UserPost'
import VideoPage from './VideoPage/VideoPage'
import Forum from './Forum/Forum'
import NavigationBar from "./NavigationBar/NavigationBar"
import Home from "./Home/Home"
import RegistrationPage from "./RegistrationPage/RegistrationPage"
import DiscussionExpanded from './Discussion/DiscussionExpanded';
import LoginPage from "./LoginPage/LoginPage"
import ProfilePage from "./ProfilePage/ProfilePage"
import UserPage from './UserPage/UserPage';
import CompaniesPage from "./CompaniesPage/CompaniesPage"
import CompanyPage from "./CompanyPage/CompanyPage"
import AllUsersPage  from './AllUsersPage/AllUsersPage';
import VideosHomePage from './VideosHomePage/VideosHomePage';
import VideoAddPage from './VideoAddPage/VideoAddPage';
 
class App extends Component{
  render(){
    return(
      <div className="App">
        <Router>
          <NavigationBar />
          <br />
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/forum/:id" component={DiscussionExpanded}/>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/forum" component={Forum} />
            {/* <Route path="/demo" component={Demo} />
            <Route path="/users" component={UserPost} /> */}
            <Route path="/dms" component={DmsDemo} />
            <Route path="/videos/:id" component={VideoPage} />
            <Route path="/user/:id" component={UserPage} />
            <Route path="/videos" component={VideosHomePage}/>   
			<Route path="/addvideo" component={VideoAddPage} />         
            <Route path="/companies" component={CompaniesPage} />
            <Route path="/company" component={CompanyPage} />
            <Route path="/allusers" component={AllUsersPage} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
      
    )
  }
}

export default App