import axios from 'axios'
import React, {Component} from 'react';
import { dateParser } from '../utils/DateParser'
import './VideoCommentUser.css'
import VideoComment from './VideoComment'

class VideoPage extends Component {

    state = {
        userId: sessionStorage.getItem("_id"),
        authorName: '',
		link: '',
        videoId: this.props.match.params.id,
        message: '',
        comments: [],
        title: ""
    }

    async componentDidMount() {
        try {
            let res = await axios.get('http://localhost:5000/api/videos/'+this.state.videoId);
            this.setState({
				link: res.data.link,
				authorName: res.data.author.name,
                title: res.data.title,
                comments: res.data.comments
            })

        } catch(e){
            console.log(e)
        }
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
                                 name={comment.userId.name}
                                 picture={comment.userId.picture}
                                 message={comment.message}
                                 postTime={dateParser(comment.postTime, 'ddd h:mm a')}
                                 edited={comment.edited}/>
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
				<div className="vidContainer">
					<iframe className="video" src={this.state.link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>

				<h3 className="mt-3">Uploaded by: {this.state.authorName}</h3>
                               
                <h4 className="mt-5">Comments</h4>
               
                <br/>
                {userComment}
                <br/>
               
			   	<div className="mb-5">
                    {commentsSection}
				</div>
            </div>
        )
    }
}

export default VideoPage