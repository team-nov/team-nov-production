import React,{Component} from 'react'
import './UserComment.css'

class UserComment extends Component{
  render(){
    return (
      <div className="userCommentContainer">
        <img className="commentProfilePic" src={this.props.picture} alt=""/>
        <span className="nameComment"> {this.props.username} </span>
      </div>
    )
  }
}
export default UserComment
 