import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'

class Forum extends Component{
  state = {
    name: "",
    picture: "",
    caption: '',
    postTime: null,
    posts: []
  }

  addDiscussion=()=>{
    axios.post('https://localhost:5000/api/discussions', {
      userName: this.state.name,
      userPicture: this.state.picture,
      message: this.state.caption
    })
    .then(res=>{
      console.log(res);
    })
  }

  render(){
    let discussion = this.state.posts.map((discussion)=>{
      return <Discussion username={discussion.userName}
                         picture={discussion.userPicture} 
                         caption={discussion.message} 
                         postTime={discussion.postTime}/>
    })

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
