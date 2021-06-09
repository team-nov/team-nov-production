import React,{Component} from 'react'
import './App.css'
// import demo component
import DmsDemo from './DmsDemo/DmsDemo'

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>This is App.js</h1>
        {/* use Demo component */}
        <DmsDemo/>
      </div>
    )
  }
}

export default App