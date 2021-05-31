import React,{Component} from 'react'
import axios from 'axios'
import './Demo.css'
class Demo extends Component{
    state = {
        name:'',
        age:0,
        picture:'',
        db:[]

    }
    componentDidMount(){
        // axios get request
        axios.get('https://randomuser.me/api/').then(
            (res)=>{
                let user = res.data.results[0]
                console.log(user.picture.large)
                this.setState({
                    name:user.name.first,
                    age:user.dob.age,
                    picture:user.picture.large
                })
            }
        )
    }
    changePerson=()=>{
        // sends a get request when user click on button
        axios.get('https://randomuser.me/api/').then(
            (res)=>{
                let user = res.data.results[0]
                console.log(user.picture.large)
                this.setState({
                    name:user.name.first,
                    age:user.dob.age,
                    picture:user.picture.large
                })
            }
        )
    }
    addToDB=()=>{
        axios.post('http://localhost:5000/api/users', {
            name: this.state.name,
            age: this.state.age,
            picture: this.state.picture
          })
          .then(res=> alert(res.data.message))
    }
    showDB=()=>{
        axios.get('http://localhost:5000/api/users')
            .then(res=>this.setState({db:res.data}))
    }
    render(){
        let dbUsers = this.state.db.map((user,index)=>{
            return <div className="user" key="index">
                <p>Name : {user.name}</p>
                <p>Age : {user.age}</p>
                <img src={user.picture} alt="randomPerson"></img>
            </div>
        })
        return(
            <div className="Demo">
                <img src={this.state.picture} alt="randomPerson"></img>
                <p>Name : {this.state.name}</p>
                <p>Age : {this.state.age}</p>
                {/* calls changePerson function when button is clicked */}
                <button onClick={this.changePerson}>Change Person</button>
                <button onClick={this.addToDB}>Add this user to DB</button>
                <button onClick={this.showDB}>Show DB</button>
                <div className="users">{dbUsers}</div>



            </div>
        )
    }
}
export default Demo
