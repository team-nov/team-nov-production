import React,{Component} from 'react'
import { Link } from 'react-router-dom'
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
        discussionComments: [],
        initialMessage: '',
        currentMessage: '',
        isHidden: false,
        editing: false,
        discussionHide: false
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
                discTypeOfUser: res.data.userId.typeofUser,
                initialMessage: res.data.message,
                currentMessage: res.data.message

            })
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    deleteDiscussion = async() => {
        console.log("Discussoin Id: " + this.state.discussion._id);
        console.log("Current user id: " + this.state.discUserId._id);
        console.log("Discussion user: " + this.state.discussion.userId._id);
        try {
            await axios.delete('http://localhost:5000/api/discussions', {
                data: {
                    discussionId: this.state.discussion._id,
                    userId: this.state.discUserId._id 
                }
            });
            this.setState({
                discussionHide: true
            })
        } catch (e) {
            console.log(e)
        }
    }

    submitDiscussion = async () => {
        console.log("Discussoin Id: " + this.state.discussion._id);
        console.log("Current user id: " + this.state.discUserId._id);
        console.log("Discussion user: " + this.state.discussion.userId._id);
        try {
            await axios.patch('http://localhost:5000/api/discussions', {
                    discussionId: this.state.discussion._id,
                    message: this.state.currentMessage,
                    userId: this.state.discUserId._id,
                    postTime: new Date(),


                }
            );
            this.setState({
                editing: false
            })
        } catch (e) {
            console.log(e)
        }

    }

    editDiscussion = async () => {
        this.setState({
            editing: true
        })
    }

    discardDiscussion = async () => {
        this.setState({
            editing: false,
            currentMessage: this.state.initialMessage
        })

    }

    updateDiscussion = (e) => {
        this.setState({currentMessage: e.target.value})
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
            <div>
                <div className="DiscussionMessage" style={{display: this.state.editing?"none":"block"}}> {this.state.currentMessage} </div>
            </div>
        if(sessionStorage.getItem("_id") === this.state.discUserId._id) {
            if(this.state.editing) {
                commentButtons = 
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onClick={this.submitDiscussion} className="btn btn-sm btn-outline-secondary me-md-2" type="button">Submit</button>
                    <button onClick={this.discardDiscussion} className="btn btn-sm btn-outline-danger" type="button">Discard</button>
                </div>;
                messageBox = <textarea onChange={e => this.updateDiscussion(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.currentMessage}/>
            }
            else {
                commentButtons = 
                <div className="d-grid gap- d-md-flex justify-content-md-end">
                    <button onClick={this.editDiscussion} className="btn btn-sm btn-outline-secondary me-md-2" type="button">Edit</button>
                    <button onClick={this.deleteDiscussion} className="btn btn-sm btn-outline-danger" type="button">Delete</button>
                </div>;

            }
        }
        else {
            commentButtons = null;
        }
        return (
            <div>
                <h3 style={{display: this.state.discussionHide?"block":"none"}}><Link to='/forum'>Discussion Deleted, click here to go back to the main page.</Link></h3>
                <div style={{display: this.state.discussionHide?"none":"block"}}>
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
            </div>
        )
    }
}
export default DiscussionExpanded