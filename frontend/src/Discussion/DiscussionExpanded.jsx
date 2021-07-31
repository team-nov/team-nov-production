import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Discussion.css'
import '../Comment/Comment.css'
import '../Comment/UserComment.css'
import './DiscussionExpanded.css'
import User from '../User/User'
import Comment from '../Comment/Comment'
import { dateParser } from '../utils/DateParser'
import { MdEdit, MdDeleteForever, MdSend, MdDeleteSweep } from 'react-icons/md'
import CommentEntry from '../Comment/CommentEntry'

class DiscussionExpanded extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this);
        this.state = {
            discussion: 'null',
            discussionId: '',
            discPicture: '',
            discUsername: '',
            discUserId: '',
            discTypeOfUser: '',
            discussionComments: [],
            initialMessage: '',
            currentMessage: '',
            postTime: '',
            commentPicture: '',
            isHidden: false,
            editing: false,
            discussionHide: false,
            imageURL: '',
            edited: ''

        }
    }

    componentDidMount() {

        const { id } = this.props.match.params;


        let url_string = `http://localhost:5000/api/discussions/${id}`;

        axios.get(url_string)
            .then(res => {
                console.log("Res: " + res.data.edited);


                this.setState({
                    discussion: res.data,
                    discussionId: res.data._id,
                    discussionComments: res.data.comments,
                    discUserId: res.data.userId,
                    discPicture: res.data.userId.picture,
                    discUsername: res.data.userId.name,
                    discTypeOfUser: res.data.userId.typeofUser,
                    initialMessage: res.data.message,
                    currentMessage: res.data.message,
                    postTime: dateParser(res.data.postTime, 'ddd h:mm a'),
                    imageURL: res.data.imageURL,
                    edited: res.data.edited,

                })


                if (this.state.edited) {
                    console.log("Yes?");
                    this.setState({
                        postTime: "(edited) " + this.state.postTime
                    })
                }

                console.log(res.data._id);
            })
            .catch((e) => {
                console.log(e)
            })

        axios.get('http://localhost:5000/api/users/' + sessionStorage.getItem("_id"))
            .then(res => this.setState(
                { commentPicture: res.data.picture }))
            .catch((e) => console.log(e))
    }

    handler() {
        const { id } = this.props.match.params;

        let url_string = `http://localhost:5000/api/discussions/${id}`;

        axios.get(url_string)
            .then(res => {
                this.setState({
                    discussionComments: res.data.comments,
                })
                console.log(res.data._id);
            })
            .catch((e) => {
                console.log(e)
            })

    }

    deleteDiscussion = async () => {
        console.log("Discussoin Id: " + this.state.discussion._id);
        console.log("Current user id: " + this.state.discUserId._id);
        console.log("Discussion user: " + this.state.discussion.userId._id);
        try {
            await axios.delete('http://localhost:5000/api/discussions', {
                data: {
                    discussionId: this.state.discussion._id,
                    userId: this.state.discUserId._id
                }
            });

            this.setState({
                discussionHide: true
            })

        } catch (e) {
            console.log(e)
        }

    }

    submitDiscussion = async () => {
        console.log("Discussoin Id: " + this.state.discussion._id);
        console.log("Current user id: " + this.state.discUserId._id);
        console.log("Discussion user: " + this.state.discussion.userId._id);
        try {
            await axios.patch('http://localhost:5000/api/discussions', {
                discussionId: this.state.discussion._id,
                message: this.state.currentMessage,
                userId: this.state.discUserId._id,
                postTime: new Date(),
                edited: true,
            }
            );
            this.setState({
                editing: false,
                postTime: "(edited) " + dateParser(new Date(), 'ddd h:mm a')
            })
        } catch (e) {
            console.log(e)
        }

    }

    editDiscussion = async () => {
        this.setState({
            editing: true
        })
    }

    discardDiscussion = async () => {
        this.setState({
            editing: false,
            currentMessage: this.state.initialMessage
        })

    }

    updateDiscussion = (e) => {
        this.setState({ currentMessage: e.target.value })
    }


    render() {
        if (sessionStorage.getItem("_id") == null) {
            return (
                <div className="container">
                    <br></br>
                    <div className="alert alert-danger" role="alert">
                        Please login to access this discussion.
                    </div>
                </div>
            )
        }

        let comments = this.state.discussionComments.map((comments, index) => {
            console.log(comments.userId.picture);
            return <Comment key={comments._id}
                userId={comments.userId._id}
                commentsId={comments._id}
                picture={comments.userId.picture}
                username={comments.userId.name}
                message={comments.message}
                postTime={dateParser(comments.postTime, 'ddd h:mm a')}
                discussionId={this.state.discussion._id}
                edited={comments.edited}
            />
        })
        comments = comments.reverse();

        if (this.state.discussionHide) {
            setTimeout(() => { this.props.history.push('/forum') }, 2000);
        }

        let commentButtons;
        let messageBox = <div className="originalPostMessage my-2" style={{ display: this.state.editing ? "none" : "block" }}> {this.state.currentMessage} </div>

        if (sessionStorage.getItem("_id") === this.state.discUserId._id) {
            if (this.state.editing) {
                commentButtons =
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={this.submitDiscussion} className="btn btn-sm btn-outline-secondary me-md-2" type="button"><MdSend /></button>
                        <button onClick={this.discardDiscussion} className="btn btn-sm btn-outline-danger" type="button"><MdDeleteSweep /></button>
                    </div>;
                messageBox = <textarea onChange={e => this.updateDiscussion(e)} type="text" className="form-control my-2" placeholder="Comment here" value={this.state.currentMessage} />
            }
            else {
                commentButtons =
                    <div className="d-grid gap- d-md-flex justify-content-md-end">
                        <button onClick={this.editDiscussion} className="btn btn-sm btn-outline-secondary me-md-2" type="button"><MdEdit /></button>
                        <button onClick={this.deleteDiscussion} className="btn btn-sm btn-outline-danger" type="button"><MdDeleteForever /></button>
                    </div>;

            }
        }
        else {
            commentButtons = null;
        }
        console.log("expanded id: " + this.state.discussion._id);
        return (
            <div className="container">
                <h3 style={{ display: this.state.discussionHide ? "block" : "none" }}><Link to='/forum'>Discussion Deleted, redirecting to the main page...</Link></h3>
                <div style={{ display: this.state.discussionHide ? "none" : "block" }}>

                    <div className="card discussionExpandedContainer my-5 p-3 bg-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <User username={this.state.discUsername} picture={this.state.discPicture} />
                                <span className="expandedPostTime">{this.state.postTime}</span>
                            </div>
                            {messageBox}
                            <br></br>
                            <br></br>
                            {this.state.imageURL ? <img src={this.state.imageURL} className="discussion-image"></img> : null}
                            {commentButtons}
                        </div>
                    </div>

                    <CommentEntry
                        discussionId={this.state.discussionId}
                        userId={sessionStorage.getItem("_id")}
                        commentUsername={sessionStorage.getItem("name")}
                        commentPicture={this.state.commentPicture}
                        updateComments={this.handler}>
                    </CommentEntry>

                    <br></br>
                    <div className="">{comments}</div>
                </div>
            </div>
        )
    }
}
export default DiscussionExpanded