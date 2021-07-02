import axios from 'axios'
import React, {Component} from 'react';
import { dateParser } from '../utils/DateParser'
import './VideoCommentUser.css'

class VideoPage extends Component {

    state = {
        videoId: '60de9a931b43c60542810555',
        userId: sessionStorage.getItem("_id"),
        message: '',
        comments: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/videos/' + this.state.videoId)
        .then(res => {
            this.setState({
                comments: res.data.comments
            })
        })
        .catch(e => {
            console.log(e)
        })
    }

    componentDidUpdate() {
        this.render();
    }

    postComment = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/videos/' + this.state.videoId, {
                userId: this.state.userId,
                message: this.state.message
            })
            this.setState({
                message: '',
                comments: res.data.comments
            })
        } catch (e) {
            console.log(e)
        }
    }

    updateComment = (e) => {
        this.setState({message: e.target.value})
    }

    deleteComment = async (videoId, commentId) => {
        try {
            const res = await axios.delete('http://localhost:5000/api/videos/' + videoId, {
                data: {
                    commentId: commentId
                }
            });
            this.setState({
                comments: res.data.comments
            })
        } catch (e) {
            console.log(e)
        }
    }

    getCommentUser = (username, picture) => {
        return (
            <div className="userCommentContainer">
              <img className="commentProfilePic" src={picture} alt=""/>
              <span className="userNameComment"> {username} </span>
            </div>
          )
    }

    getComment = (commentIndex, videoId, commentId, username, picture, commentMessage, postTime) => {
        return (
            <div key={commentIndex} className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        {this.getCommentUser(username, picture)}
                        {postTime}
                    </div>
                    <div className="text-start">
                        {commentMessage}
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-sm btn-outline-secondary me-md-2" type="button">Edit</button>
                        <button onClick={() => this.deleteComment(videoId, commentId)} className="btn btn-sm btn-outline-danger" type="button">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const commentsSection = this.state.comments.map((comment, commentIndex) => {
            return this.getComment( commentIndex, 
                                    this.state.videoId, 
                                    comment._id, 
                                    comment.userId.name, 
                                    comment.userId.picture, 
                                    comment.message, 
                                    dateParser(comment.postTime, 'ddd h:mm a'));
        }).reverse();
        var userComment;
        if (sessionStorage.getItem("_id") != null) {
            userComment = 
                <div className="container">
                    <div className="d-flex">
                        <textarea onChange={e => this.updateComment(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.message}/>
                        <button className="btn btn-outline-success" onClick={this.postComment}>Post</button>
                    </div>
                </div>;   
        } else {
            userComment = null;
        }
        return(
            <div className="container">
                <h1>Video Title Here</h1>
                <h2>Comments Section:</h2>
                <br/>
                {userComment}
                <br/>
                <div className="container">
                    {commentsSection}
                </div>
            </div>
        )
    }
}

export default VideoPage