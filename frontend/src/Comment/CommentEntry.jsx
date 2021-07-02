import React,{Component} from 'react'
import axios from 'axios';
import UserComment from './UserComment'
import './CommentEntry.css'

class CommentEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discussionId: props.discussionId,
            username : props.commentUsername,
            picture : props.commentPicture,
            message : '',
        }
    }

    updateCommentInput=(e)=>{
        this.setState({message:e.target.value});
    }

    addComment=()=>{
        axios.post(`http://localhost:5000/api/discussions/${this.state.discussionId}`, {
          userId: this.state.userId,
          userName: this.state.username,
          picture: this.state.picture,
          message: this.state.message,
        })
        .then(res=>this.setState({discussions: res.data}))
        .catch((e)=>console.log(e))
    }

    render() { //change to sessionStorage later
        return (
            <div className="commentEntryContainer">
                <UserComment username={this.state.username} picture={this.state.picture}/>
                <form className="commentEntryForm">
                    <textarea onChange={(e)=>this.updateCommentInput(e)} value={this.state.message} className="commentEntry" rows="4" cols="100" placeholder="Leave a comment..."></textarea>
                    <button className="commentButton" onClick={this.addComment}> Post </button>
                </form>
            </div>
        )
    }
}
export default CommentEntry