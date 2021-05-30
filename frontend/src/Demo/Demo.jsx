import React,{Component} from 'react'
import axios from 'axios'
class Demo extends Component{
    state = {
        randomPerson:''

    }
    componentDidMount(){
        // axios get request
        axios.get('https://randomuser.me/api/').then(
            (res)=>{
                console.log(res.data.results[0].picture.large)
                this.setState({randomPerson:res.data.results[0].picture.large})
            }
        )
    }
    changePerson=()=>{
        // sends a get request when user click on button
        axios.get('https://randomuser.me/api/').then(
            (res)=>{
                console.log(res.data.results[0].picture.large)
                this.setState({randomPerson:res.data.results[0].picture.large})
            }
        )
    }
    render(){
        return(
            <div className="Demo">
                <img src={this.state.randomPerson} alt="randomPerson"></img>
                <p>{this.state.randomPerson}</p>
                {/* calls changePerson function when button is clicked */}
                <button onClick={this.changePerson}>Change Person</button>
            </div>
        )
    }
}
export default Demo
