import React,{Component} from 'react'
import './Discussion.css'
import User from '../User/User'

class Discussion extends Component{
  render(){
    return (
      <div className="discussionContainer">
        <User username={this.props.username} picture={this.props.picture}/>
        <div className="DiscussionMessage"> {this.props.message} </div>
        <div className="postTime">{this.props.postTime}</div>
      </div>
    )
  }
}
export default Discussion
