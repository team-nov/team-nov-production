import './Video.css'

const Video = props => (
  <div class="card col-3 m-3" style={{"width": "18rem"}}>
  <img class="card-img-top" src="https://via.placeholder.com/150x100" alt="oops"/>
  <div class="card-body">
      <h5 class="card-title">{props.title}</h5>
      <p class="card-text">The description of the video. The description of the video. The description of the video.</p>
      <a href={"/videos/" + props.id} class="btn btn-primary">Watch video</a>
  </div>
  </div>
)

export default Video;
