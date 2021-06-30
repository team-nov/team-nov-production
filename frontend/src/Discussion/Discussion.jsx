import React,{Component} from 'react'
import './Discussion.css'
import '../Comment/Comment.css'
import './UserComment.css'
import UserComment from './UserComment'
import Comment from '../Comment/Comment'

class Discussion extends Component{
  render(){
    return (
      <div>
        <div className="discussionContainer">
          <UserComment username={this.props.username} picture={this.props.picture}/>
          <div className="DiscussionMessage"> {this.props.message} </div>
          <div className="postTime">{this.props.postTime}</div>
        </div>
        <div>
          <Comment 
          username={this.props.username} 
          picture={this.props.picture}
          commentMessage={this.props.commentMessage}
          postTime={this.props.postTime}>
          </Comment>
        </div>
      </div>
    )
  }
}
export default Discussion
