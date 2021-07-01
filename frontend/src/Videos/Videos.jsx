import React, { Component } from 'react';
import axios from 'axios';
const serverUrl = "http://localhost:5000/api";
const viddeosPerRow = 4;

class Videos extends Component {

    state={
        videos: []
    }

    componentDidMount() {
        axios.get(serverUrl + "/videos")
          .then(videos => {
            this.setState({ videos: videos.data })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    render() {
        let videos = this.state.videos.map((video, index)=>{
            return (
            <div class="card col-3 m-3" style={{"width": "18rem"}}>
                <img class="card-img-top" src="https://via.placeholder.com/150" alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{video.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href={"/videos/" + video._id} class="btn btn-primary">Watch video</a>
                </div>
            </div>
        )
        })

        let videosGrouped=[];
        for(let i=0;i<videos.length/viddeosPerRow;i++){
            if(i+viddeosPerRow-1<videos.length){
                videosGrouped[i] = <div class="row ">
                    {videos.slice(i,i+viddeosPerRow)}
                </div>
            }
            else{
                videosGrouped[i] = <div class="row ">
                    {videos.slice(i,videos.length)}
                </div>
            }
        }

        return(
            <div className="container-fluid"> {videosGrouped} </div>
        );
    }
}

export default Videos
