import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { MdSend } from 'react-icons/md'
import axios from 'axios';
import UserComment from './UserComment'
import './CommentEntry.css'

class CommentEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discussionId: props.discussionId,
            userId: sessionStorage.getItem("_id"),
            username : sessionStorage.getItem("name"),
            picture : '',
            message : '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users/' + this.state.userId)
        .then(res=>this.setState(
            {picture: res.data.picture}))
        .catch((e)=>console.log(e))
    }

    updateCommentInput=(e)=>{
        this.setState({message:e.target.value});
    }

    addComment=()=>{
        axios.post(`http://localhost:5000/api/discussions/${this.state.discussionId}`, {
          userId: this.state.userId,
          message: this.state.message,
        })
        .then(res=>this.setState({discussions: res.data}))
        .catch((e)=>console.log(e))
    }

    render() { 
        let discRoute = `/forum/${this.state.discussionId}`;
        return (
            <div className="commentEntryContainer">
                <UserComment username={this.state.username} picture={this.state.picture}/>
                <Link to={discRoute} className="btn btn-primary">See Post</Link>
                <form className="commentEntryForm">
                    <textarea onChange={(e)=>this.updateCommentInput(e)} value={this.state.message} className="commentEntry" rows="4" cols="100" placeholder="Leave a comment..."></textarea>
                    <button className="commentButton" onClick={this.addComment}> <MdSend /> </button>
                </form>
            </div>
        )
    }
}
export default CommentEntry