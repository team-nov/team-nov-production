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
    /* let commentsDB = this.state.db.map((user,index)=>{
      return <div className="user" key="index">
          <p>Name : {user.name}</p>
          <p>Age : {user.age}</p>
          <img src={user.picture} alt="randomPerson"></img>
      </div>
    }) */

    return (
      <div className="discussionContainer">
        <User/>
        <div className="text"> {this.state.caption} </div>
      </div>
    )
  }
}
export default Discussion
