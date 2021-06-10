import React,{Component} from 'react'
import axios from 'axios'
import './Discussion.css'
import User from '../User/User'

class Discussion extends Component{
  state = {
    user: null,
    caption: "Hello this is a caption."
  }

  render(){
    return (
      <div className="discussionContainer">
        <User/>
        <div className="caption"> {this.state.caption} </div>
      </div>
    )
  }
}
export default Discussion
