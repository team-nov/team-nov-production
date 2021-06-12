import React,{Component} from 'react'
import './User.css'

class User extends Component{
  render(){
    return (
      <div className="userContainer">
        <img className="profilePic" src={this.props.picture} alt=""/>
        <span className="userName"> {this.props.username} </span>
      </div>
    )
  }
}
export default User
 