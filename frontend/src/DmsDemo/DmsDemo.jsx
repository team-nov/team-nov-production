import React,{Component} from 'react';
import {io} from 'socket.io-client'
import './DmsDemo.css'

let socket = io("localhost:5000");
        
// import axios from 'axios'
// see demo for how to use axios

// class names must start with Capital letter
class DmsDemo extends Component{
    state={
        message : '',
        userId:'',
        dmId:'',
        user1:'',
        user2:'',
        liveMessages:[]

    }
    componentDidMount(){
        socket.on('serverMessage',message=>{
            let liveMessagesCopy = [...this.state.liveMessages]
            liveMessagesCopy.push(message)
            this.setState({liveMessages:liveMessagesCopy})
        })
    }
    updateInput = (property,e) =>{
        let msg = e.target.value;
        this.setState({[property]:msg})

    }
    createDM= () =>{
        socket.emit('clientMessage',{
            members:[this.state.user1,this.state.user2],
        })
        // reset input
        this.setState({user1:'',user2:''})

    }
    submitMessage = () =>{
        socket.emit('clientMessage',{
            dmId:this.state.dmId,
            from:this.state.userId,
            message:this.state.message
        })
        // reset input
        //this.setState({message:'',userId:''})

    }
    render(){
        // must wrap everything in a one div
        let liveMessages = this.state.liveMessages.map(msg=>{
            return<div className="message">
                <p>From: {msg.from}</p>
                <p>On: {msg.date}</p>
                <p>Message: {msg.message}</p>
            </div>
        })
        return(
            <div>
                <h4>Create Dm</h4>
                <p>User1's _id</p>
                <input onChange={(e)=>this.updateInput('user1',e)} value={this.state.user1}></input>
                <p>User2's _id</p>
                <input onChange={(e)=>this.updateInput('user2',e)} value={this.state.user2}></input>
                <button onClick={this.createDM}>Create DM</button>
                <hr/>
            
                <h4>Send message</h4>
                <p>Dm's _id</p>
                <input onChange={(e)=>this.updateInput('dmId',e)} value={this.state.dmId}></input>
                <p>User's _id</p>
                <input onChange={(e)=>this.updateInput('userId',e)} value={this.state.userId}></input>
                <p>Message</p>
                <input onChange={(e)=>this.updateInput('message',e)} value={this.state.message}></input>
                <button onClick={this.submitMessage}>Submit Message</button>
                <hr/>

                <h4>Live Messages</h4>
                {liveMessages}


                

            </div>

        )
    }
}

export default DmsDemo
