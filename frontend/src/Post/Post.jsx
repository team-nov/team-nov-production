import React,{Component} from 'react'
import axios from 'axios'
import './Post.css'
import User from '../User/User'

class Post extends Component{
  state = {
    user: null,
    caption: "Hello this is a caption."
  }

  render(){
    return (
      <div className="postContainer">
        <User/>
        <div className="caption"> {this.state.caption} </div>
      </div>
    )
  }
}
export default Post
