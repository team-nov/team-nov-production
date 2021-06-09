import React,{Component} from 'react'
import axios from 'axios'
import './Discussion.css'
import Post from '../Post/Post'
import User from '../User/User'

class Discussion extends Component{
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
      <div className="discussionContainer">
        <User/>
        <form className="inputContainer">
          <textarea className="inputTextEntry" rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
          <button className="postButton"> Post </button>
        </form>
      </div>
    )
  }
}
export default Discussion
