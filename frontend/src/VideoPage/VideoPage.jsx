import { Link } from "react-router-dom";
import axios from 'axios'
import React, {Component} from 'react';

class VideoPage extends Component {

    state = {
        userId: "60b59ba85a6d38aa91d77715",
        userName: "Aysha",
        message: '',
        comments: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/videos/60c41d5dc2ee4103efaa52c0')
        .then(res => {
            this.setState({
                comments: res.data.comments
            })
        })
        .catch((e) => {
            console.log(e)
        })
    }

    postComment = async () => {
        const res = await axios.post('http://localhost:5000/api/videos/60c41d5dc2ee4103efaa52c0', {
            userId: this.state.userId,
            userName: this.state.userName,
            message: this.state.message
        })

        try {
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

    render(){
        let commentsSection = this.state.comments.map((comment, commentIndex) => {
            return <li key={commentIndex}>
                {comment.userName}: {comment.message}
            </li>
        })
        return(
            <div className="container">
                <h1>Video Title Here</h1>
                <h2>Comments Section:</h2>
                <div className="container">
                    <ul>
                        {commentsSection}
                    </ul>
                </div>
                <div className="container">
                    <textarea onChange={e => this.updateComment(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.msg}/>
                </div>
                <button onClick={this.postComment}>Post Comment</button>
                <Link className="nav-link" to="/videos">Back</Link>
            </div>
        )
    }
}

export default VideoPage