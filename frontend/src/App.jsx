import React,{Component} from 'react'
import './App.css'
// import demo component
import RegistrationPage from './RegistrationPage/RegistrationPage'

class App extends Component{
  render(){
    return(
      <div className="App">
        <RegistrationPage/>
      </div>
    )
  }
}

export default App