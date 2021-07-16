import React,{Component} from 'react'
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import User from '../User/User'
import { dateParser } from '../utils/DateParser'
import axios from 'axios'
import CommentEntry from '../Comment/CommentEntry'

class Discussion extends Component{
  state = {
    userId: this.props.userId,
    discussionId: this.props.discussionId,
    isHidden: false,
    discussionHide: false,
    initialPostTime: this.props.postTime,
    currentPostTime: this.props.postTime,
    initialMessage: this.props.message,
    currentMessage: this.props.message,
    returnMessage: "",
    imageURL: ""
  }

  onEditClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  onDiscardClick=()=>{
    this.setState({currentPostTime: this.state.initialPostTime})
    this.setState({currentMessage: this.state.initialMessage})
    this.setState({isHidden:!this.state.isHidden})
  }

  onSubmitClick=()=>{
    axios.patch('http://localhost:5000/api/discussions', {
      userId: this.state.userId,
      discussionId: this.state.discussionId,
      message: this.state.currentMessage,
      postTime: new Date(),
    })
    .then(()=> {
      this.setState({initialPostTime: dateParser(new Date(), 'ddd h:mm a')})
      this.setState({currentPostTime: dateParser(new Date(), 'ddd h:mm a')})
      this.setState({initialMessage: this.state.currentMessage})
      this.setState({isHidden:!this.state.isHidden})
      
    })
    .catch((e)=>console.log(e))
  }

  onDeleteClick=()=>{
    axios.delete('http://localhost:5000/api/discussions', {
      data: {
        discussionId: this.state.discussionId,
        userId: this.state.userId
      }
    })
    .then(()=> {
      this.setState({discussionHide:!this.state.discussionHide})
    })
    .catch((e)=>console.log(e))

  }
  
  onClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  edit=(e)=>{
    this.setState({currentMessage:e.target.value})
  }

  render(){
    return (
      <div>
        <div className="discussionContainer">
          <div className="userContainerDiscussion"> <User username={this.props.username} picture={this.props.picture}/> </div>
          <text className="DiscussionMessage"> 
          {this.props.message}
          </text>
          <div className="postTime">{this.props.postTime}</div>
        </div>
        <div className="commentOnDiscussion">
          <CommentEntry 
          discussionId={this.props.id}
          userId={this.props.userId}
          commentUsername={this.props.username} 
          commentPicture={this.props.picture}>
          </CommentEntry>
        </div>
      </div>
    )
  }
}
export default Discussion
