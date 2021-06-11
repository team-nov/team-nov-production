import React, {Component} from 'react';

class VideoPage extends Component {

    state = {
        comments: []
    }

    render(){
        return(
            <div class="container">
                <h1>Video Title Here</h1>
                <div class="container">
                    <textarea type="text" className="form-control" placeholder="Comment here"/>
                </div>
            </div>
        )
    }
}

export default VideoPage