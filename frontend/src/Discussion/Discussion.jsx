import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import User from '../User/User'
import { dateParser } from '../utils/DateParser'
import axios from 'axios'
import CommentEntry from '../Comment/CommentEntry'

class Discussion extends Component{
  state = {
    userId: this.props.userId,
    discussionId: this.props.id,
    isHidden: false,
    discussionHide: false,
    postTime: this.props.postTime,
    initialMessage: this.props.message,
    currentMessage: this.props.message,
    returnMessage: "",
    imageURL: "",
    edited: this.props.edited,
  }

  componentDidMount() {
    console.log("D Edited: " + this.state.edited);
    if (this.state.edited) {
        this.setState({
            postTime: "(edited) " + this.props.postTime,
        })
    }
  
  }

  onEditClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  onDiscardClick=()=>{
    this.setState({currentPostTime: this.state.initialPostTime})
    this.setState({currentMessage: this.state.initialMessage})
    this.setState({isHidden:!this.state.isHidden})
  }

  onSubmitClick=()=>{
    axios.patch('http://localhost:5000/api/discussions', {
      userId: this.state.userId,
      discussionId: this.state.discussionId,
      message: this.state.currentMessage,
      postTime: new Date(),
    })
    .then(()=> {
      this.setState({initialPostTime: dateParser(new Date(), 'ddd h:mm a')})
      this.setState({currentPostTime: dateParser(new Date(), 'ddd h:mm a')})
      this.setState({initialMessage: this.state.currentMessage})
      this.setState({isHidden:!this.state.isHidden})
      
    })
    .catch((e)=>console.log(e))
  }

  onDeleteClick=()=>{
    axios.delete('http://localhost:5000/api/discussions', {
      data: {
        discussionId: this.state.discussionId,
        userId: this.state.userId
      }
    })
    .then(()=> {
      this.setState({discussionHide:!this.state.discussionHide})
    })
    .catch((e)=>console.log(e))

  }
  
  onClick=()=>{
    this.setState({isHidden:!this.state.isHidden})
  }

  edit=(e)=>{
    this.setState({currentMessage:e.target.value})
  }

  render(){
    let discRoute = `/forum/${this.state.discussionId}`;
    return (
      <Link className="cardLink" to={discRoute}>
        <div className="row justify-content-center mb-5">
          <div className="col-6 card p-0">
            <div className="card-body text-left">
              <div className="card-title"> 
                <User username={this.props.username} picture={this.props.picture}/> 
              </div>
              <text className="card-text text-left"> 
              {this.props.message}
              </text>
              <div className="postTime p-3">{this.state.postTime}</div>
            </div>
            
        </div>

        </div>
        </Link>
      
    )
  }
}
export default Discussion
