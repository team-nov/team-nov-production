import axios from 'axios'
import React, {Component} from 'react';
import './VideoCommentUser.css'
import { dateParser } from '../utils/DateParser'
import { MdEdit, MdDeleteForever, MdSend, MdDeleteSweep } from 'react-icons/md'

class VideoComment extends Component {

    state = {
        userId: this.props.userId,
        videoId: this.props.videoId,
        commentId: this.props.commentId,
        name: this.props.name,
        picture: this.props.picture,
        currentMessage: this.props.message,
        returnMessage: this.props.message,
        postTime: this.props.postTime,
        edited: this.props.edited,
        editing: false,
        isHidden: false
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
            await axios.delete('http://localhost:5000/api/videos/' + this.state.videoId, {
                data: {
                    commentId: this.state.commentId
                }
            });
            this.setState({
                isHidden: true
            })
        } catch (e) {
            console.log(e)
        }
    }

    submitComment = async () => {
        try {
            await axios.patch('http://localhost:5000/api/videos/' + this.state.videoId, {
                commentId: this.state.commentId,
                message: this.state.currentMessage
            })
            this.setState({
                editing: false,
                postTime: "(edited) " + dateParser(new Date(), 'ddd h:mm a'),
                returnMessage: this.state.currentMessage
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
            currentMessage: this.state.returnMessage
        })
    }

    updateComment = (e) => {
        this.setState({currentMessage: e.target.value})
    }

    render() {
        let commentButtons;
        let messageBox = 
            <div className="text-start my-2">
                {this.state.returnMessage}
            </div>;
        if (sessionStorage.getItem("_id") === this.state.userId) {
            if (this.state.editing) {
                commentButtons = 
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onClick={this.submitComment} className="btn btn-sm btn-outline-secondary me-md-2" type="button"><MdSend /></button>
                    <button onClick={this.discardComment} className="btn btn-sm btn-outline-danger" type="button"><MdDeleteSweep /></button>
                </div>;
                messageBox = <textarea onChange={e => this.updateComment(e)} type="text" className="form-control my-2" placeholder="Comment here" value={this.state.currentMessage}/>
            } else {
                commentButtons = 
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onClick={this.editComment} className="btn btn-sm btn-outline-secondary me-md-2" type="button"><MdEdit /></button>
                    <button onClick={this.deleteComment} className="btn btn-sm btn-outline-danger" type="button"><MdDeleteForever /></button>
                </div>;
            }
        } else {
            commentButtons = null;
        }
        return (
            <div className="card" style={{display: this.state.isHidden ? "none" : "block"}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="userCommentContainer">
                            <img className="commentProfilePic" src={this.state.picture} alt=""/>
                            <span className="nameComment"> {this.state.name} </span>
                        </div>
                        {this.state.postTime}
                    </div>
                    {messageBox}
                    {commentButtons}
                </div>
            </div>
        )
    }
}

export default VideoComment