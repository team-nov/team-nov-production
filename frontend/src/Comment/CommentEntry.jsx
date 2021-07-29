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
        .then(res=>{
            this.setState({discussions: res.data})
            alert("Comment added succesfully. click see post to view comments")
        })
        .catch((e)=>{
            console.log(e)
            alert("unable to add comment check console log")
        })
    }

    render() { 
        let discRoute = `/forum/${this.state.discussionId}`;
        return (
            <div className="bg-light p-3">
                <UserComment username={this.state.username} picture={this.state.picture}/>
               
                <form className="pt-3">
                    <div className="input-group">
                    <textarea className="form-control" onChange={(e)=>this.updateCommentInput(e)} value={this.state.message} rows="4" cols="100" placeholder="Leave a comment..." required></textarea>
                    </div>
                </form>
                <div className="row justify-content-end pt-3">                
                    <Link to={discRoute} className="btn btn-primary col-lg-3 col-md-5 col-sm-5">View Comments</Link>
                    <button className="btn btn-primary mx-3 col-lg-2 col-sm-3" onClick={this.addComment}> <MdSend /> </button>
                </div>
            </div>
        )
    }
}
export default CommentEntry