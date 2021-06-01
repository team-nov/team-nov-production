import axios from 'axios';
import React,{Component} from 'react';
// import './cssfilename.css'
// import axios from 'axios'
// see demo for how to use axios

// class names must start with Capital letter
class UserPost extends Component{
    state={
        name:'',
        message:'',
        picture:'',
        db:[]
    }

    getFirstPerson=()=>{
        axios.get('http://localhost:5000/api/users').then(
            (res)=>{
                console.log(res.data[0].name);
                let user = res.data[0];
                this.setState( {
                    name:user.name,
                })
                
            }
        )
    }

    onInputChange=(e)=>{
        this.setState({message:e.target.value});
    }

    addPost=()=>{
        axios.post('http://localhost:5000/api/discussions', {
            name: this.state.name,
            message: this.state.messsage,
            })
            .then(res=> alert("Added a post"))
        }
    


    render(){
        let dbPosts = this.state.db.map((post, index)=> {
            return <div className="post" key="index">
                <p>Name: {post.name}</p>
                <p>Message: {post.message}</p>
            </div>
        })

        return(
            <div className="UserPost">
                <button onClick={this.getFirstPerson}>Get First Person</button>
                <input type="text" onChange={(e)=>this.onInputChange(e)} value={this.state.message}></input>
                <button onClick={this.addPost}>Add Post</button>
                <div className="posts">{dbPosts}</div>


            </div>

        )
    }
}

export default UserPost