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
        discUserId: '',
        discussionComments: []
    }

    componentDidMount() {

        const { id } = this.props.match.params
        console.log("expanded is asdfds" + id);

        let url_string = `http://localhost:5000/api/discussions/${id}`;
        console.log("url is " + url_string);

        axios.get(url_string)
        .then(res => {
            console.log(res.data.message);
            console.log(res.data.userId.picture);
            console.log(res.data.userId.name);
            this.setState({
                discussion: res.data,
                discussionComments: res.data.comments,
                discUserId: res.data.userId,
                discPicture: res.data.userId.picture,
                discUsername: res.data.userId.name
            })
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render() {
        console.log("helo");
        let comments = this.state.discussionComments.map((comments, index) => {
            console.log(comments.userId.picture);
            return <Comment key = {index}
                            picture = {comments.userId.picture} 
                            username = {comments.userId.name}
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