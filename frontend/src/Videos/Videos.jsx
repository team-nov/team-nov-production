import React, { Component } from 'react';
import axios from 'axios';
import Video from '../Video/Video'

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
            return <Video title={video.title} id={video._id} />
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
