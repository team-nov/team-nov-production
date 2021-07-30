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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app(); 
}
const storage = firebase.storage();

class Forum extends Component{
  state = {
    userId: sessionStorage.getItem("_id"), //change to sessionStorage later
    picture: '',
    name: sessionStorage.getItem("name"),
    message: '',
    discussions: [],
    image: {},
  }

  handleChange = e => {
    console.log(e.target.files);
    if (e.target.files[0]) { 
      const image = e.target.files[0];
      console.log(image);
      this.setState(() => ({ image: image }));
    }
    else {
      this.setState(() => ({ image: {} }));
    }
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

  postDiscussion(imageURL) {
    axios.post('http://localhost:5000/api/discussions', {
      userId: this.state.userId,
      message: this.state.message,
      imageURL: imageURL
    })
    .then(async(res)=>{
      if (res.status === 201){
        let updatedDiscussions = await axios.get('http://localhost:5000/api/discussions');
        await this.setState({discussions: updatedDiscussions.data});
      }
    })
    .catch((e)=>console.log(e))
  }

  addDiscussion=()=>{
    if (this.state.image.name) {
      if (this.state.image.type.substr(0, this.state.image.type.indexOf("/")) !== "image") {
          alert("Please submit an image type file.");
          return;
      }
      const uploadTask = storage.ref(`discussion_images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          storage.ref("discussion_images")
                  .child(this.state.image.name)
                  .getDownloadURL()
                  .then(url => {
                      console.log(url);
                      this.postDiscussion(url);
                      this.setState({message: ''});
                      this.setState(() => ({ image: {} }));
                  });
        }
      )
    }
    else {
      this.postDiscussion('');
      this.setState({message: ''});
    }
    document.querySelector(".postTextEntry").value = '';
    document.querySelector(".uploadButton").value = null;
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
                <input type="file" onChange={this.handleChange} className="uploadButton"/>
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
