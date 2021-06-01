import React,{Component} from 'react'
import './App.css'
// import demo component
import Demo from './Demo/Demo'
import UserPost from './UserPost/UserPost'

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>This is App.js</h1>
        {/* use Demo component */}
        <UserPost/>
      </div>
    )
  }
}

export default App