import React,{Component} from 'react'
import './Discussion.css'
import User from '../User/User'

class Discussion extends Component{
  /*state = {
    name: '',
    picture: "https://picsum.photos/500",
    caption: 'greaghrae',
    postTime: null
  }*/

  render(){
    return (
      <div className="discussionContainer">
        <User username={this.props.username} picture={this.props.picture}/>
        <div className="caption"> {this.props.message} </div>
      </div>
    )
  }
}
export default Discussion
