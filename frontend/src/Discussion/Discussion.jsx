import React,{Component} from 'react'
import './Discussion.css'
import User from '../User/User'

class Discussion extends Component{
  state = {
    isHidden: false,
    initialMessage: this.props.message,
    currentMessage: this.props.message,
  }

  onEditClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  onDiscardClick=()=>{
    this.setState({currentMessage: this.state.initialMessage})
    this.setState({isHidden:!this.state.isHidden})
  }

  onSubmitClick=()=>{
    this.setState({initialMessage: this.state.currentMessage})
    this.setState({isHidden:!this.state.isHidden})
  }
  
  onClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  edit=(e)=>{
    this.setState({currentMessage:e.target.value})
  }

  modifyText=(e)=> {
    console.log( e.target.parentNode.style);
    //e.target.parentNode.style.display = 'none';
    e.target.style.display = 'none';

    this.setState({
      message: 'Changed message',
      isHidden: !this.state.isHidden
    });
  }


  render(){
    return (
      <div className="discussionContainer">
        <User username={this.props.username} picture={this.props.picture}/>
        
        <div className="DiscussionMessage" style={{display: this.state.isHidden?"none":"block"}}> {this.state.currentMessage} </div>
        <textarea  className="postTextEntry" onChange={(e)=>{this.edit(e)}} style={{display: !this.state.isHidden?"none":"block"}} value={this.state.currentMessage} rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
        <div className="postTime">{this.props.postTime}</div>
        <div className="modifyPost">
          {this.props.ownDiscussion ? (<button className="editButton" onClick={this.onEditClick} style={{display: this.state.isHidden?"none":"block"}}>Edit</button>) : (<></>)}
          {this.props.ownDiscussion ? (<button className="discardButton" onClick={this.onDiscardClick} style={{display: !this.state.isHidden?"none":"block"}}>Discard</button>) : (<></>)}
          {this.props.ownDiscussion ? (<button className="submitButton" onClick={this.onSubmitClick} style={{display: !this.state.isHidden?"none":"block"}}>Submit</button>) : (<></>)}
        </div>
        
        
      </div>
    )
  }
}
export default Discussion
