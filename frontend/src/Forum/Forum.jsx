import React,{Component} from 'react'
import axios from 'axios'
import './Forum.css'
import Discussion from '../Discussion/Discussion'
import User from '../User/User'
import { dateParser } from '../utils/DateParser'
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAazLY-icEO67sl2FHkiA1MD97mhMGNCqQ",
  authDomain: "project-team-nov.firebaseapp.com",
  projectId: "project-team-nov",
  storageBucket: "project-team-nov.appspot.com",
  messagingSenderId: "866523261997",
  appId: "1:866523261997:web:1ece7eedc92753e287dca4",
  measurementId: "G-JX5S7P355F"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

class Forum extends Component{
  state = {
    userId: sessionStorage.getItem("_id"), //change to sessionStorage later
    picture: '',
    name: sessionStorage.getItem("name"),
    message: '',
    image: {},
    imageURL: '',
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

  handleChange=(e)=>{
    if (e.target.files[0]) { 
        const image = e.target.files[0];
        console.log(image);
        this.setState(() => ({ image: image }));
    }
  }

  updateInput=(e)=>{
    this.setState({message:e.target.value});
  }

  addDiscussion=()=>{
    if (this.state.image !== null) {
      if (this.state.image.type.substr(0, this.state.image.type.indexOf("/")) !== "image") {
        alert("Please submit an image type file.");
        return;
      }
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {alert(error)},
        () => {
          storage.ref('images')
                 .child(this.state.image.name)
                 .getDownloadURL()
                 .then(url => {
                   alert(URL);
                   this.setState({imageURL: url});
                 });
        }
      );
    }

    axios.post('http://localhost:5000/api/discussions', {
      userId: this.state.userId,
      message: this.state.message,
      imageURL: this.state.imageURL
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
    <div>
      <div className="forumContainer">
        <User username={this.state.name} picture={this.state.picture}/>
        <form className="postInput">
          <textarea onChange={(e)=>this.updateInput(e)} value={this.state.message} className="postTextEntry" rows="4" cols="100" placeholder="Start a Discussion..."></textarea>
          <button className="postButton" onClick={this.addDiscussion}> Post </button>
          <input type="file" onChange={this.handleChange}/>
        </form>
      </div>
      <div className="discussions">
        {discussion}
      </div>
    </div>
    )
  }
}
export default Forum
