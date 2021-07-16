import React,{Component} from 'react'
import axios from 'axios';
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import './DiscussionExpanded.css'
import User from '../User/User'
import Comment from '../Comment/Comment'
import { dateParser } from '../utils/DateParser'

class DiscussionExpanded extends Component {
    state = {
        discussion: 'null',
        discPicture: '',
        discUsername: '',
        discUserId: '',
        discTypeOfUser: '',
        discussionComments: []
    }

    componentDidMount() {

        const { id } = this.props.match.params
        console.log("expanded is asdfds" + id);

        let url_string = `http://localhost:5000/api/discussions/${id}`;
        console.log("url is " + url_string);

        axios.get(url_string)
        .then(res => {
            console.log(res.data.message);
            console.log(res.data.userId.picture);
            console.log(res.data.userId.name);
            this.setState({
                discussion: res.data,
                discussionComments: res.data.comments,
                discUserId: res.data.userId,
                discPicture: res.data.userId.picture,
                discUsername: res.data.userId.name,
                discTypeOfUser: res.data.userId.typeofUser

            })
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render() {
        console.log("helo");
        let comments = this.state.discussionComments.map((comments, index) => {
            console.log(comments.userId.picture);
            return <Comment key = {comments._id}
                            userId={comments.userId._id}
                            commentsId={comments._id}
                            picture = {comments.userId.picture} 
                            username = {comments.userId.name}
                            message = {comments.message}
                            postTime = {dateParser(comments.postTime, 'ddd h:mm a')}
                            discussionId = {this.state.discussion._id}
                            />
        })
        comments = comments.reverse();
        
        let commentButtons;
        let messageBox = 
            <div className = "DiscussionMessage">
                {this.state.discussion.message}
            </div>;
        if(sessionStorage.getItem("_id") === this.state.discUserId._id) {
            commentButtons = 
                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                    <button onClick={this.editComment} className="btn btn-sm btn-outline-secondary me-md-2" type="button">Edit</button>
                    <button onClick={this.deleteComment} className="btn btn-sm btn-outline-danger" type="button">Delete</button>
                </div>;
        }
        return (
            <div>
                <div className="card discussionExpandedContainer">
                    <div className="card-body ">
                        <div className="d-flex justify-content-between">
                            <User username={this.state.discUsername} picture={this.state.discPicture}/>  
                            <span className="expandedPostTime">{dateParser(this.state.discussion.postTime, 'ddd h:mm a')}</span>
                        </div> 
                    </div>
                    {messageBox}
                    {commentButtons}

                </div>
                <br></br>
                {comments}
            </div>
        )
    }
}
export default DiscussionExpanded