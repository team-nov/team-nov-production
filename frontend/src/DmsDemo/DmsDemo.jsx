import React, { Component } from 'react';
import { io } from 'socket.io-client'
import axios from 'axios'
import './DmsDemo.css'
import { dateParser } from '../utils/DateParser'
import UserSearchComponent from '../UserSearchComponent/UserSearchComponent'

// connect to backend socket
let socket = io("localhost:5000");

class DmsDemo extends Component {
	messagesEndRef = React.createRef()
	state = {
		message: '',
		userId: '',
		toId: '',
		profilePic: '',
		name: '',
		dmId: '',
		recipient: '',
		messages: [],
		dms: [],
		showNewDM: false,
		createDMSuccess:true,
		DMerrorMessage:'Unable to create DM'
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
		socket.on('serverNewDm', message => {
			console.log(message)
			if (message.toId === this.state.userId) {
				this.login();
			}
		})
		let userId = sessionStorage.getItem("_id")
		if (userId) {
			this.setState({ userId: userId }, () => this.login())

		}
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
				if (res.data.length > 0) {
					// want most recent messages on top
					let reversedDms = res.data.reverse()
					// init first dmId
					let dmId = reversedDms[0]._id
					console.log(dmId)
					this.setState({ dms: reversedDms, dmId: dmId })
				}
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
		this.setState({
			message: ''
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
	createDM = async() => {
		try{
			let res = await axios.post('http://localhost:5000/api/dms/', {
				members: [this.state.userId, this.state.toId],
				messages: []
			})
			if(res.status === 201){
				await this.setState({createDMSuccess:true,showNewDM:false})
				alert(res.data.message)
				socket.emit('clientNewDm', {
					toId: this.state.toId,
				})
				this.login();
			}
			
		}
		catch(e){
			if(e.response.status === 400){
				this.setState({createDMSuccess:false,DMerrorMessage:e.response.data.message})
			}
			else
				this.setState({createDMSuccess:false,DMerrorMessage:'Error unable to create Dm. Check console log'})
			console.log(e);
		}
		
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

	handleUserSuggestion = async(selectedUser)=>{
		try{
			let res = await axios.post('http://localhost:5000/api/dms/checkdmexists', {
				members: [this.state.userId, selectedUser._id],
			})
			if(res.status === 200){
				await this.setState({createDMSuccess:true})
			}
		}
		catch(e){
			if(e.response.status === 400){
				this.setState({createDMSuccess:false,DMerrorMessage:e.response.data.message})
			}
			else
				this.setState({createDMSuccess:false,DMerrorMessage:'Error unable to verify Dm existence. Check console log'})
			console.log(e);
		}
		this.setState({toId:selectedUser._id})
	}

	render() {

		if (sessionStorage.getItem("_id") == null) {
			return (
				<div className="container">
					<br></br>
					<div className="alert alert-danger" role="alert">
						Please login to access the DMs feature.
					</div>
				</div>
			)
		}

		let messages = [], dms = [];

		// only update message and dms when userId is defined
		if (this.state.userId && this.state.messages && this.state.dms) {
			messages = this.state.messages.map((msg, dmsIndex) => {
				return <div className="message" key={dmsIndex}>
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
		let createDMerrorMsg = !this.state.createDMSuccess
			? 
				<div className="alert alert-danger" role="alert">
					{this.state.DMerrorMessage}
			  	</div>
			:
				[]
		return (
			<div className="container">
				<br></br>
				<div className="container d-flex justify-content-center">
					<img className="pic" src={this.state.profilePic} alt="" />
					<p className="display-6">
						Welcome {this.state.name}
					</p>
				</div>
				<div className="row">
					<div className="col-2">
						<button className="btn btn-outline-success mb-1" onClick={() => this.setState({ showNewDM: !this.state.showNewDM ,createDMSuccess:true})}>Create new DM</button>
					</div>
					<div className="col-1" style={{ display: this.state.showNewDM ? "block" : "none" }}>
						<label for="inputRecipient" className="col-form-label">To:</label>
					</div>
					<div className="col-8" style={{ display: this.state.showNewDM ? "block" : "none" }}>
						<UserSearchComponent 
							id="inputRecipient" 
							hideSearchButton={true} 
							onSuggestionClick={(selectedUser)=>this.handleUserSuggestion(selectedUser)}
							filter = {(user)=>{return!(user._id===this.state.userId)}}
							/>
					</div>
					<div className="col-1" style={{ display: this.state.showNewDM ? "block" : "none" }}>
						<button className={this.state.createDMSuccess?"btn btn-success":"btn btn-success disabled"} onClick={this.createDM} >Add</button>
					</div>
					<br /><br />
				</div>
				<div className="row">
				{createDMerrorMsg}
				</div>
				<div className="row">
					<div className="dmsSidebar col-2">
						{dms}
					</div>
					<div className="col-10">
						<div className="dmsMessages">
							{messages}
							<div ref={this.messagesEndRef} />
						</div>
						<div className="messageBox d-flex">
							<textarea className="dmMessageBox form-control" onChange={(e) => this.updateInput('message', e)} value={this.state.message} placeholder="Enter your DM here..." />
							{/* <input onChange={(e) => this.updateInput('message', e)} value={this.state.message} placeholder= "Enter your DM here..." /> */}
							<button className="dmMessageButton btn btn-success" onClick={this.submitMessage}>Send</button>
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}

export default DmsDemo
