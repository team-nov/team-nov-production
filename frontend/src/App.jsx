import React,{Component} from 'react'
import './App.css'
// import demo component
import DmsDemo from './DmsDemo/DmsDemo'
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'

class App extends Component{
  render(){
    return(
      <div className="App">
        {/* use Demo component */}
        {
          <DmsDemo/>
          /*
          comment the frontend out when ur resolving conflicts
          
          <UserPost/>
          */
        }
      </div>
    )
  }
}

export default App