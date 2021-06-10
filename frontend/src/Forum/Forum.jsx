import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Post from '../Discussion/Discussion'
import User from '../User/User'

class Forum extends Component{
  state = {
    user: null,
    textInput: "",
    posts: []
  }

  render(){
    let postDB = this.state.posts.map((discussion, index)=>{
      return <Post/>
    })

    return (
      <div>
        <div className="forumContainer">
          <User/>
          <form className="postInput">
            <textarea className="postTextEntry" rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
            <button className="postButton"> Post </button>
          </form>
        </div>

        <div className="discussions">

        </div>
      </div>
    )
  }
}
export default Forum
