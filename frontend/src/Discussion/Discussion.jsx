import React,{Component} from 'react'
import './Discussion.css'
import User from '../User/User'

class Discussion extends Component{
  state = {
    message: this.props.message,
  }


  modifyText=(e)=> {
    this.setState({
      message: 'Changed message'
    });
  }


  render(){
    return (
      <div className="discussionContainer">
        <User username={this.props.username} picture={this.props.picture}/>
        
        <div className="DiscussionMessage"> {this.state.message} </div>
        <div className="postTime">{this.props.postTime}</div>
        <div className="modifyPost">
          {this.props.ownDiscussion ? (<button className="modifyButton" onClick={this.modifyText}>Edit</button>) : (<></>)}
        </div>
        
        
      </div>
    )
  }
}
export default Discussion
