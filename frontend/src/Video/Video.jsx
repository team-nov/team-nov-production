import './Video.css'

const Video = props => (
  <div class="card col-3 m-4" style={{"width": "18rem"}}>
  <img class="card-img-top" src="https://picsum.photos/300/200" alt="off"/>
    <div class="card-body">
    <h4 class="card-title">{props.title}</h4>
    <h6 class="video-author">
      <img src="https://picsum.photos/100/100" alt="oof" className="profile-pic"></img>
      *Author name*
    </h6>
    <a href={"/videos/" + props.id} class="btn btn-primary stretched-link">Watch video</a>
    </div>
  </div>
)

export default Video;
