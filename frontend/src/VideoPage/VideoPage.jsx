import axios from 'axios'
import React, {Component} from 'react';
import { dateParser } from '../utils/DateParser'
import './VideoCommentUser.css'
import VideoComment from './VideoComment'

class VideoPage extends Component {

    state = {
        userId: sessionStorage.getItem("_id"),
        userName: sessionStorage.getItem("name"),
        videoId: this.props.match.params.id,
        message: '',
        comments: [],
        title:""
    }

    async componentDidMount() {
        try{
            let res = await axios.get('http://localhost:5000/api/videos/'+this.state.videoId);
            await this.setState({
                title:res.data.title,
                comments: res.data.comments
            })

        }catch(e){
            console.log(e)
        }
    }

    postComment = async () => {
        const res = await axios.post('http://localhost:5000/api/videos/'+this.state.videoId, {
            userId: this.state.userId,
            userName: this.state.userName,
            message: this.state.message
        })

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
                <div className="container p-0">
                    <div className="d-flex">
                        <textarea onChange={e => this.updateComment(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.message}/>
                        <button className="btn btn-outline-success" onClick={this.postComment}>Post</button>
                    </div>
                </div>;   
        } else {
            userComment = null;
        }
        return(
            <div className="container text-start">
                <h1 className="my-4">{this.state.title}</h1>
                <img class="w-100" src="https://via.placeholder.com/267x150" alt="oops"/>
               
                <h4 className="mt-5">Comments</h4>
               
                <br/>
                {userComment}
                <br/>
               
                    {commentsSection}
                
            </div>
        )
    }
}

export default VideoPage