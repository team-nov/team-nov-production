import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'

class Forum extends Component{
  state = {
    name: 'calvin',
    picture: 'https://picsum.photos/500',
    userId: '123',
    message: 'okay',
    discussions: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/discussions')
      .then(res=>this.setState({discussions: res.data}))
  }
  
  addDiscussion=()=>{
    this.setState({
      message: "hi",
    })

    axios.post('http://localhost:5000/api/discussions', {
      userName: this.state.name,
      userPicture: this.state.picture,
      userId: this.state.userId,
      message: this.state.message,
    })
    .then(res=>{
      console.log(res);
    })
  }

  render(){
    let discussion = this.state.discussions.map((discussion, index)=>{
      return <Discussion key = {index}
                         username={discussion.userName}
                         picture={discussion.userPicture} 
                         message={discussion.message} 
                         />
    })
    discussion = discussion.reverse()

    return (
    <div>
      <div className="forumContainer">
        <User username={this.state.name} picture={this.state.picture}/>
        <form className="postInput">
          <textarea className="postTextEntry" rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
          <button className="postButton" onClick={this.addDiscussion}> Post </button>
        </form>
      </div>
      <div className="discussions">{discussion}</div>
    </div>
    )
  }
}
export default Forum
