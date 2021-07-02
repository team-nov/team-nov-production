import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import User from '../User/User'
import CommentEntry from '../Comment/CommentEntry'

class Discussion extends Component{
  render(){
    let discRoute = `/forum/${this.props.id}`;
    console.log("discRoute is " + discRoute);
    return (
      <div>
        <div className="discussionContainer">
          <User username={this.props.username} picture={this.props.picture}/>
          <div className="DiscussionMessage"> 
          <Link to={{
            pathname: discRoute,
            state: {
              username: this.props.username,
              picture: this.props.picture,
            }
            }}>{this.props.message}</Link>
          </div>
          <div className="postTime">{this.props.postTime}</div>
        </div>
        <div>
          <CommentEntry 
          discussionId={this.props.id}
          commentUsername={this.props.username} 
          commentPicture={this.props.picture}>
          </CommentEntry>
        </div>
      </div>
    )
  }
}
export default Discussion
