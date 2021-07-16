import React,{Component} from 'react';
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/storage";
import './UploadButton.css';

// import axios from 'axios'
// see demo for how to use axios

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

// class names must start with Capital letter
class UploadButton extends Component { 
    state = {
        image: {},
        url: ""
    }

    handleChange = e => {
        if (e.target.files[0]) { 
            const image = e.target.files[0];
            console.log(image);
            this.setState(() => ({ image: image }));
        }
    }

    handleUpload = () => {
        if (this.state.image.type.substr(0, this.state.image.type.indexOf("/")) != "image") {
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
                           this.setState({url: url});
                        });
            }
        )
    };

    render() {
        // must wrap everything in a one div
        return(
            <div>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}> Upload </button>
            </div>
        )
    }
}

export default UploadButton
