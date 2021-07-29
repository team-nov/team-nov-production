import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'
import { dateParser } from '../utils/DateParser'

class Forum extends Component{
  state = {
    userId: sessionStorage.getItem("_id"), //change to sessionStorage later
    picture: '',
    name: sessionStorage.getItem("name"),
    message: '',
    discussions: [],
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users/' + this.state.userId)
      .then(res=>this.setState(
        {picture: res.data.picture}))
      .catch((e)=>console.log(e))

    axios.get('http://localhost:5000/api/discussions')
      .then(res=>this.setState({discussions: res.data}))
      .catch((e)=>console.log(e))
  }

  updateInput=(e)=>{
    this.setState({message:e.target.value});
  }

  addDiscussion=()=>{
    axios.post('http://localhost:5000/api/discussions', {
      userId: this.state.userId,
      message: this.state.message,
    })
    .then(res=>this.setState({discussions: res.data}))
    .catch((e)=>console.log(e))
  }

  render(){
    let discussion = this.state.discussions.map((discussion, index)=>{
      return <div>
          <Discussion key = {index}
            id={discussion._id}
            userId={discussion.userId}
            picture={discussion.userId.picture} 
            username={discussion.userId.name}
            message={discussion.message} 
            postTime={dateParser(discussion.postTime, 'ddd h:mm a')}/>
        </div>
    })
    discussion = discussion.reverse()
    return (
    <div className="container-fluid p-5">
      <div className="row justify-content-center mb-5">
        <div className="col-6 card p-0 ">
            <div className="card-body text-left p-0 ">
            <div className="card-title p-3"> 
            <User username={this.state.name} picture={this.state.picture}/>
            </div>
            <div className="bg-light p-3">
              <form >
                <div className="input-group">
                <textarea onChange={(e)=>this.updateInput(e)} value={this.state.message} className="form-control" rows="4" cols="100" placeholder="Start a Discussion..." required></textarea>
                </div>
              </form>
              <div className="row justify-content-end p-3"> 
                <button className="btn btn-primary col-lg-2 col-sm-3" onClick={this.addDiscussion}> Post </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {discussion}
     
    </div>
    )
  }
}
export default Forum
