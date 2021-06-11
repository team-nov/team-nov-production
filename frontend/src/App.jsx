import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import custom css
import './App.css' 
// import demo component
import DmsDemo from './DmsDemo/DmsDemo'
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'
import Videos from './Videos/Videos'
import VideoPage from './VideoPage/VideoPage'
// import navbar
import NavigationBar from "./NavigationBar/NavigationBar"
 
class App extends Component{
  render(){
    return(
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/demo" component={Demo} />
          <Route path="/users" component={UserPost} />
          <Route path="/dms" component={DmsDemo} />
          <Route path="/videos/:id" component={VideoPage} />
          <Route path="/videos" component={Videos} />
        </Switch>
      </Router>
    )
  }
}

export default App