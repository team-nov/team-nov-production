import axios from 'axios'
import React, {Component} from 'react';
import { dateParser } from '../utils/DateParser'
import './VideoCommentUser.css'
import VideoComment from './VideoComment'

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

    render() {
        const commentsSection = this.state.comments.map((comment) => {
            return <VideoComment key={comment._id}
                                 userId={comment.userId._id}
                                 videoId={this.state.videoId}
                                 commentId={comment._id}
                                 username={comment.userId.name}
                                 picture={comment.userId.picture}
                                 message={comment.message}
                                 postTime={dateParser(comment.postTime, 'ddd h:mm a')}/>
        }).reverse();
        let userComment;
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