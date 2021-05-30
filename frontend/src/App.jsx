import React,{Component} from 'react'
import './App.css'
// import demo component
import Demo from './Demo/Demo'

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>This is App.js</h1>
        {/* use Demo component */}
        <Demo/>
      </div>
    )
  }
}

export default App