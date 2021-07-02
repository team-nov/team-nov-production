import { Link } from "react-router-dom";
import axios from 'axios'
import React, {Component} from 'react';

class VideoPage extends Component {

    state = {
        userId: sessionStorage.getItem("_id"),
        userName: sessionStorage.getItem("name"),
        message: '',
        comments: [],
        title:""
    }

    async componentDidMount() {
        try{
            let videoId = this.props.match.params.id;
            let res = await axios.get('http://localhost:5000/api/videos/'+videoId);
            await this.setState({
                title:res.data.title,
                comments: res.data.comments
            })

        }catch(e){
            console.log(e)
        }
    }

    postComment = async () => {
        const res = await axios.post('http://localhost:5000/api/videos/'+this.props.match.params.id, {
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
            return <li className="list-group-item" key={commentIndex}>
                {comment.userName}: {comment.message}
            </li>
        })
        return(
            <div className="container text-start">
                <h1>{this.state.title}</h1>
                <img src="https://via.placeholder.com/960x480" class=" w-100"   alt="oops"/>
                <h4>Comments Section:</h4>
                    <ul className="list-group">
                        {commentsSection}
                    </ul>
                    <textarea onChange={e => this.updateComment(e)} type="text" className="form-control" placeholder="Comment here" value={this.state.msg}/>
                <button class="btn btn-primary" onClick={this.postComment}>Post Comment</button>
            </div>
        )
    }
}

export default VideoPage