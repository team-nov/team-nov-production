import { Link } from "react-router-dom";
import axios from 'axios'
import React, {Component} from 'react';

class VideoPage extends Component {

    state = {
        msg: '',
        comments: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/videos/60c2affa6d8ff3030fd4ea01')
        .then(res => {
                console.log(res.data.comments);
                this.setState({
                    comments: res.data.comments
                })
            }
        )
    }

    postComment = async () => {
        await axios.post('http://localhost:5000/api/videos/60c2affa6d8ff3030fd4ea01', {
            userId: "60c27574bf5cbfadcf3b4f12",
            userName: "Brandon",
            message: this.state.msg
        })
        const res = await axios.get('http://localhost:5000/api/videos/60c2affa6d8ff3030fd4ea01')
        this.setState({
            msg: '',
            comments: res.data.comments
        })
    }

    updateComment = e => {
        this.setState({msg: e.target.value})
    }

    render(){
        let commentsSection = this.state.comments.map(comment => {
            return <li>
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