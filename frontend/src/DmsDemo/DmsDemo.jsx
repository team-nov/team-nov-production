import React, { Component } from 'react';
import { io } from 'socket.io-client'
import axios from 'axios'
import './DmsDemo.css'
import { dateParser } from '../utils/DateParser'

// connect to backend socket
let socket = io("localhost:5000");

class DmsDemo extends Component {
    messagesEndRef = React.createRef()
    state = {
        message: '',
        userId: '',
        toId: '',
        toMessage: '',
        profilePic: '',
        name: '',
        dmId: '',
        recipient: '',
        messages: [],
        dms: [],
        showNewDM: false
    }

    componentDidMount() {
        socket.on('serverMessage', message => {
            // get messages from server and save in state
            if (message.dmId === this.state.dmId) {
                let messagesCopy = [...this.state.messages]
                messagesCopy.push(message)
                this.setState({ messages: messagesCopy })
            }
        })
    }

    /**
     * 
     * @param {string} property The string property to update
     * @param {Event} e Event object to extract value from
     */
    updateInput = (property, e) => {
        let msg = e.target.value;
        this.setState({ [property]: msg })
    }

    /**
     * fetches dms from backend using userId
     */
    login = () => {
        // get user's name
        axios.get('http://localhost:5000/api/users/' + this.state.userId)
            .then(res => {
                this.setState({ name: res.data.name, profilePic: res.data.picture })
            })

        // get user's dms
        axios.get('http://localhost:5000/api/dms/byUserId/' + this.state.userId)
            .then(res => {
                // want most recent messages on top
                let reversedDms = res.data.reverse()
                // init first dmId
                let dmId = reversedDms[0]._id
                console.log(dmId)
                this.setState({ dms: reversedDms, dmId: dmId })
            })
            .then(() => {
                // get old messages
                this.getOldMessages()
            })

    }

    /**
     * Send message to server via socket
     */
    submitMessage = () => {
        socket.emit('clientMessage', {
            dmId: this.state.dmId,
            from: this.state.userId,
            message: this.state.message
        })
    }

    /**
     * Get mesages saved in the DB for a Dm
     */
    getOldMessages = () => {
        axios.get('http://localhost:5000/api/dms/' + this.state.dmId)
            .then(res => {
                console.log(res.data.messages)
                this.setState({ messages: res.data.messages })
            })
    }

    /**
     * Create a new DM with a user
     */
    createDM = () => {
        axios.post('http://localhost:5000/api/dms/', {
            members: [this.state.userId, this.state.toId],
            messages: [{
                from: this.state.userId,
                message: this.state.toMessage
            }]
        })
            .then(res => {
                alert(res.data.message)
                this.login()
            })
    }

    /**
     * Update dmId with the dm that the user selects
     * 
     * @param {string} id id of the selected dm
     */
    selectDm = (id) => {
        console.log(id)
        this.setState({ dmId: id }, () => this.getOldMessages())

    }

    /**
     * Scrolls to bottom of messages
     */
    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        // scroll everytime state changes
        this.scrollToBottom()
    }

    render() {
        let messages, dms;

        // only update message and dms when userId is defined
        if (this.state.userId) {
            messages = this.state.messages.map((msg, index) => {
                return <div className="message" key={index}>
                    <div className="messageProfilePicDiv">
                        <img src={msg.from.picture} alt="msg profile pic" className="messageProfilePic"></img>
                    </div>
                    <div className="messageContent">
                        <div className="messageHeader">
                            <p className="messageName">{msg.from.name}</p>
                            <p className="messageDate">{dateParser(msg.date, 'ddd h:mm a')}</p>
                        </div>
                        <p className="messageMessage">{msg.message}</p>
                    </div>
                </div>
            })

            dms = this.state.dms.map(dm => {
                // filter out recipient
                let recipient = dm.members.filter(member => member._id !== this.state.userId)
                recipient = recipient[0];

                // update classname of selected dm
                let classname = dm._id === this.state.dmId ? "dmItem selectedDm" : "dmItem"

                return <div className={classname} onClick={() => { this.selectDm(dm._id) }} key={dm._id} >
                    <img src={recipient.picture} alt="dms profile pic" className="dmsProfilePic"></img>
                    <div className="recipientName">
                        <p >{recipient.name}</p>
                    </div>
                </div>
            })
        }
        return (
            <div className='pageDMs'>
                <div className="dmsWelcome">
                    <div>
                        <p className="welcomeText">Welcome {this.state.name}</p>
                        <img className="profilePic" src={this.state.profilePic} alt=""/>
                    </div>
                    <input onChange={(e) => this.updateInput('userId', e)} value={this.state.userId} placeholder="Please enter your ID..."/>
                    <button onClick={this.login}>login</button>
                </div>

                <div className="dmsHeader">
                    <h4>Chats</h4>
                    <button onClick={() => this.setState({ showNewDM: !this.state.showNewDM })}>Create new DM</button>
                    <div className="newDm" style={{ display: this.state.showNewDM ? "block" : "none" }}>
                        <input onChange={(e) => this.updateInput('toId', e)} value={this.state.toId} placeholder="Enter recipient's ID here" required />
                        <input onChange={(e) => this.updateInput('toMessage', e)} value={this.state.toMessage} placeholder="Enter message here" required />
                        <button onClick={this.createDM}>Send Message</button>
                    </div>
                </div>
                <div className="dmsSidebar">
                    {dms}
                </div>
                    <div className="dmsMessages">
                        {messages}
                        <div ref={this.messagesEndRef} />
                    </div>

                    <div className='enterDM'>
                        <textarea onChange={(e) => this.updateInput('message', e)} value={this.state.message} placeholder= "Enter your DM here..." />
                        {/* <input onChange={(e) => this.updateInput('message', e)} value={this.state.message} placeholder= "Enter your DM here..." /> */}
                        <button onClick={this.submitMessage}>Submit Message</button>
                    </div>
                </div>

        )
    }
}

export default DmsDemo
