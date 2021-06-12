import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import custom css
import './App.css' 
// import components
import DmsDemo from './DmsDemo/DmsDemo'
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'
import Videos from './Videos/Videos'
import VideoPage from './VideoPage/VideoPage'
import NavigationBar from "./NavigationBar/NavigationBar"
import Home from "./Home/Home"
import RegistrationPage from "./RegistrationPage/RegistrationPage"
 
class App extends Component{
  render(){
    return(
      <div className="App">
        <Router>
          <NavigationBar />
          <br />
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/demo" component={Demo} />
            <Route path="/users" component={UserPost} />
            <Route path="/dms" component={DmsDemo} />
            <Route path="/videos/:id" component={VideoPage} />
            <Route path="/videos" component={Videos} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
      
    )
  }
}

export default App