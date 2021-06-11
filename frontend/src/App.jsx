import React,{Component} from 'react'
import './App.css'
// import demo component
import RegistrationPage from './RegistrationPage/RegistrationPage'
import DmsDemo from './DmsDemo/DmsDemo'
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'
import Forum from './Forum/Forum'
import Discussion from './Discussion/Discussion'

class App extends Component{
  render(){
    return(
      <div className="App">
        {/* use Demo component */}
        {
          /*
          comment the frontend out when ur resolving conflicts
          
          <UserPost/>
          <RegistrationPage/>
          */
        }
        <Forum/>
      </div>
    )
  }
}

export default App