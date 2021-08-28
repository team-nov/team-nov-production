import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import User from '../User/User'
<<<<<<< HEAD
import { dateParser } from '../utils/DateParser'
import axios from 'axios'
=======
import CommentEntry from '../Comment/CommentEntry'
>>>>>>> develop

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
    axios.patch(process.env.REACT_APP_HOST+'/api/discussions', {
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
    axios.delete(process.env.REACT_APP_HOST+'/api/discussions', {
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
    let discRoute = `/forum/${this.props.id}`;
    console.log("discRoute is " + discRoute);
    return (
<<<<<<< HEAD
      <div className="discussionContainer" style={{display: this.state.discussionHide?"none":"block"}}>
        <User username={this.props.username} picture={this.props.picture}/>
        
        <div className="DiscussionMessage" style={{display: this.state.isHidden?"none":"block"}}> {this.state.currentMessage} </div>
        <textarea  className="postTextEntry" onChange={(e)=>{this.edit(e)}} style={{display: !this.state.isHidden?"none":"block"}} value={this.state.currentMessage} rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
        <div className="postTime">{this.state.currentPostTime}</div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {this.props.ownDiscussion ? (<button className="btn btn-outline-secondary me-sm-2" onClick={this.onEditClick} style={{display: this.state.isHidden?"none":"block"}}>Edit</button>) : (<></>)}
          {this.props.ownDiscussion ? (<button className="btn btn-outline-secondary me-sm-2" onClick={this.onDiscardClick} style={{display: !this.state.isHidden?"none":"block"}}>Discard</button>) : (<></>)}
          {this.props.ownDiscussion ? (<button className="btn btn-outline-secondary me-sm-2" onClick={this.onSubmitClick} style={{display: !this.state.isHidden?"none":"block"}}>Submit</button>) : (<></>)}
          {this.props.ownDiscussion ? (<button className="btn btn-outline-danger me-sm-2" onClick={this.onDeleteClick} style={{display: this.state.isHidden?"none":"block"}}>Delete</button>) : (<></>)}
        </div>
        
        
        
=======
      <div>
        <div className="discussionContainer">
          <User username={this.props.username} picture={this.props.picture}/>
          <div className="DiscussionMessage"> 
          <Link to={discRoute}>{this.props.message}</Link>
          </div>
          <div className="postTime">{this.props.postTime}</div>
        </div>
        <div>
          <CommentEntry 
          discussionId={this.props.id}
          userId={this.props.userId}
          commentUsername={this.props.username} 
          commentPicture={this.props.picture}>
          </CommentEntry>
        </div>
>>>>>>> develop
      </div>
    )
  }
}
export default Discussion
