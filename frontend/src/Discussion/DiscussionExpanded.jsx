import React,{Component} from 'react'
import axios from 'axios';
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import User from '../User/User'
import Comment from '../Comment/Comment'
import { dateParser } from '../utils/DateParser'

class DiscussionExpanded extends Component {
    state = {
        discussion: 'null',
        discPicture: '',
        discUsername: '',
        discussionComments: []
    }

    componentDidMount() {

        const { id } = this.props.match.params
        console.log(this.props.match.params);
        const username = this.props.location.state.username;
        const picture = this.props.location.state.picture;
        
        let url_string = `http://localhost:5000/api/discussions/${id}`;
        console.log("url is " + url_string);

        axios.get(`http://localhost:5000/api/discussions/${id}`)
        .then(res => {
            console.log(res.data.message);
            this.setState({
                discussion: res.data,
                discussionComments: res.data.comments,
                discUsername: username,
                discPicture: picture
            })
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render() {
        console.log("helo");
        let comments = this.state.discussionComments.map((comments, index) => {
            return <Comment key = {index}
                            picture = {comments.picture} 
                            username = {comments.userName}
                            message = {comments.message}
                            postTime = {dateParser(comments.postTime, 'ddd h:mm a')}
                            />
        })
        comments = comments.reverse();

        return (
            <div>
                <div className="discussionExpandedContainer">
                    <User username={this.state.discUsername} picture={this.state.discPicture}/>
                    <div className="discussionExpandedMessage">{this.state.discussion.message}</div>
                    <div className="postTime">{dateParser(this.state.discussion.postTime, 'ddd h:mm a')}</div>
                </div>
                <div className="discussionCommentsContainer">{comments}</div>
            </div>
        )
    }
}
export default DiscussionExpanded