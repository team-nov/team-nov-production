import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'

class Forum extends Component{
  state = {
    name: '',
    picture: '',
    userId: '',
    message: '',
    postTime: '',
    discussions: []
  }

  addDiscussion=()=>{
    this.setState({
      message: "hello",
      postTime: "10"
    })

    axios.post('https://localhost:5000/api/discussions', {
      userName: this.state.name,
      userPicture: this.state.picture,
      userId: this.state.userId,
      message: this.state.message,
      postTime: this.state.postTime
    })
    .then(res=>{
      console.log(res);
    })
  }

  componentDidMount() {
    axios.get('https://localhost:5000/api/discussions')
      .then(res=>this.setState({discussions: res.data}))
  }

  render(){
    let discussion = this.state.discussions.map((discussion)=>{
      return <Discussion username={discussion.userName}
                         picture={discussion.userPicture} 
                         caption={discussion.message} 
                         // postTime={discussion.postTime}/>
                         />
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
