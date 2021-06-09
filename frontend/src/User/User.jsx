import React,{Component} from 'react'
import axios from 'axios'
import './User.css'

class User extends Component{
  state = {
    username: "calvin yuen",
    picture: "https://picsum.photos/500"
  }

  render(){
    return (
      <div className="userContainer">
        <img className="profilePic" src={this.state.picture} alt=""/>
        <span className="userName"> {this.state.username} </span>
      </div>
    )
  }
}
export default User
