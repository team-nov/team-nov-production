import React,{Component} from 'react'
import UserComment from './UserComment'
import './Comment.css'
import axios from 'axios'
import { dateParser } from '../utils/DateParser'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentId: props.commentsId,
            userId: props.userId,
            discussionId: props.discussionId,
            username : props.username,
            picture : props.picture,
            initialMessage : props.message,
            currentMessage: props.message,
            postTime : props.postTime,
            isHidden: false,
            editing: false,
            edited: this.props.edited,
            commentHide: false,

        }
    }

    componentDidMount() {
        if (this.state.edited) {
            this.setState({
                postTime: "(edited) " + this.state.postTime
            })
        }
    }

    deleteComment = async () => {
        try {
            await axios.delete('http://localhost:5000/api/discussions/' + this.state.discussionId, {
                data: {
                    commentId: this.state.commentId
                }
            });
            this.setState({
                discussionHide: true
            })
        } catch (e) {
            console.log(e)
        }

    }

    submitComment = async () => {
        try {
            console.log("commentId: " + this.state.commentId);
            console.log("commentMsg: " + this.state.currentMessage);
            await axios.patch('http://localhost:5000/api/discussions/' + this.state.discussionId, {
                commentId: this.state.commentId,
                message: this.state.currentMessage,
                postTime: new Date(),
            })
            this.setState({
                editing: false,
                postTime: "(edited) " + dateParser(new Date(), 'ddd h:mm a'),
                initialMessage: this.state.currentMessage,
                currentMessage: this.state.currentMessage
            })
        } catch (e) {
            console.log(e)
        }
    }

    editComment = async () => {
        this.setState({
            editing: true
        })
    }

    discardComment = async () => {
        this.setState({
            editing: false,
            currentMessage: this.state.initialMessage
        })
    }

    updateComment = (e) => {
        this.setState({currentMessage: e.target.value})
    }


    render() {
        let messageBox =
            <div>
                <div className="text-start" style={{display: this.state.editing?"none":"block"}}> {this.state.currentMessage} </div>
            </div>

        let commentButtons;
        if(sessionStorage.getItem("_id")=== this.state.userId) {
            if (this.state.editing) {
                commentButtons = 
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onClick={this.submitComment} className="btn btn-sm btn-outline-secondary me-md-2" type="button">Submit</button>
                    <button onClick={this.discardComment} className="btn btn-sm btn-outline-danger" type="button">Discard</button>
                </div>;
                messageBox = <textarea onChange={e => this.updateComment(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.currentMessage}/>
            } else {
                commentButtons = 
                <div className="d-grid gap- d-md-flex justify-content-md-end">
                    <button onClick={this.editComment} className="btn btn-sm btn-outline-secondary me-md-2" type="button">Edit</button>
                    <button onClick={this.deleteComment} className="btn btn-sm btn-outline-danger" type="button">Delete</button>
                </div>;
            }
        } else {
            commentButtons = null;
        }


        return (
            <div className="card commentContainer" style={{display: this.state.commentHide?"none":"block"}}>
                <div className="card-body">
                    <div className="justify-content-between">
                    <UserComment username={this.state.username} picture={this.state.picture}/>
                    {messageBox}
                    <span className="postTimeComment">{this.state.postTime}</span>
                    </div>
                </div>
                {commentButtons}
            </div>
        )
    }
}
export default Comment