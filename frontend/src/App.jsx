import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
// import demo component
import RegistrationPage from './RegistrationPage/RegistrationPage'
import DmsDemo from './DmsDemo/DmsDemo'
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'
import Forum from './Forum/Forum'
import Discussion from './Discussion/Discussion'
import NavigationBar from "./NavigationBar/NavigationBar"
import Home from "./Home/Home"

class App extends Component{
  render(){
    return(
      <div className="App">
        <Router>
          <NavigationBar />
          <br />
          <br />
          <br />
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/dms" component={DmsDemo} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App