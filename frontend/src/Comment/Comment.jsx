import React,{Component} from 'react'
import UserComment from './UserComment'
import './Comment.css'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : props.username,
            picture : props.picture,
            commentMessage : props.message,
            postTime : props.postTime
        }
    }
    render() {
        return (
            <div className="commentContainer">
                <UserComment username={this.state.username} picture={this.state.picture}/>
                <div className="commentMessage"> {this.state.commentMessage} </div>
                <div className="postTimeComment">{this.state.postTime}</div>
            </div>
        )
    }
}
export default Comment