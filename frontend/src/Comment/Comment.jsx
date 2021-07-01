import React,{Component} from 'react'
import UserComment from './UserComment'
import './Comment.css'

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
                <UserComment username={this.state.username} picture={this.state.picture}/>
                <div className="commentMessage"> {"Heljlowajer ;lasjdf ;asldkfj  asd;lfkj as;flk ;laksdj f;laskdf jsal;kfj a;sdlfk la;skdfj as;lk ;askdjf dsa;lkfj ;lk a;lksdf j;alsd f"} </div>
                <div className="postTimeComment">{this.state.postTime}</div>
            </div>
        )
    }
}
export default Comment