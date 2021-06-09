import React,{Component} from 'react'
import axios from 'axios'
import './Post.css'
import User from '../User/User'

class Post extends Component{
  state = {
    user: null,
    textInput: "",
    attachment: null
  }

  render(){
    return (
      <div className="postContainer">
        <User/>
        <form className="postInput">
          <textarea className="postTextEntry" rows="4" cols="80" placeholder="Start a Discussion..."></textarea>
          <button className="postButton"> Post </button>
        </form>
      </div>
    )
  }
}
export default Post
