import React,{Component} from 'react'
import User from '../User/User'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : props.username,
            picture : props.picture,
            commentMessage : props.commentMessage,
            postTime : props.postTime
        }
    }
    render() {
        return (
            <div className="commentContainer">
                <User username={this.state.username} picture={this.state.picture}/>
                <div className="commentMessage"> {"Hi"} </div>
                <div className="postTime">{this.state.postTime}</div>
            </div>
        )
    }
}
export default Comment