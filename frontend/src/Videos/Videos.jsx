import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Video from '../Video/Video';

class Videos extends Component {

    state={
        value:"",
        suggestions:[],
        results:[]
    }

    render() {
        let options = this.state.value 
            ? this.state.suggestions.map((suggest,index)=>{
                return <li class="list-group-item" key={index} onClick={(e)=>this.onClick(e)}>{suggest}</li>
                })
            : []
        let videos = this.state.results.map((video,index)=>{
            return (
            <div class="card col-3 m-3" style={{"width": "18rem"}}>
                <img class="card-img-top" src="https://via.placeholder.com/150" alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{video.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
        })
    }
}

//     render() {
//         let video = this.state.videos.map((video, index) => {
//             return <Video key={index}
//                 title={video.userId.picture}
//                 username={video.userId.name}
//                 message={video.message}
//                 postTime={dateParser(video.postTime, 'ddd h:mm a')}
//             />
//         })
//         video = video.reverse()
        
//         return (
//             <div>
//                 <Link className="nav-link" to="/videos/examplevideo">Example Video</Link>
//             </div>
//         )
//     }
// }

export default Videos