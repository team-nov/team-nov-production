import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'
import { dateParser } from '../utils/DateParser'

class Forum extends Component{
  state = {
    name: 'calvin',
    age: '18',
    picture: 'https://picsum.photos/500',
    userId: '123',
    message: 'why',
    discussions: [],
    users: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/discussions')
      .then(res=>this.setState({discussions: res.data}))
    
    let users = this.discussions.map(userId => (
      axios.get('http://localhost:5000/api/users/' + this.state.userId)
      .then(res=>{
        
      })
    ))

    this.setState({

    })  
  }
  
  addDiscussion=()=>{
    this.setState({
      message: "hi",
    })
    
    axios.post('http://localhost:5000/api/users/' + this.state.userId, {
      name: this.state.name,
      age: this.state.age,
      picture: this.state.picture
    })
    .then(res=>{
      console.log(res);
    })

    axios.post('http://localhost:5000/api/discussions', {
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
                         userId={discussion.userId} 
                         message={discussion.message} 
                         postTime={dateParser(discussion.postTime, 'ddd h:mm a')}
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
