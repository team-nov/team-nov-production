import axios from "axios";
import React, { Component } from "react";
// import './cssfilename.css'
// import axios from 'axios'
// see demo for how to use axios

// class names must start with Capital letter
class UserPost extends Component {
    state = {
        name: "",
        message: "",
        picture: "",
        db: [],
    };

    componentDidMount() {
        this.showPosts();

        // axios get request
        axios.get("https://randomuser.me/api/").then((res) => {
            let user = res.data.results[0];
            console.log(user.picture.large);
            this.setState({
                name: user.name.first,
                picture: user.picture.large,
                message: "Hey my name is " + user.name.first,
            });
        });
    }

    getFirstPerson = () => {
        axios.get(process.env.REACT_APP_HOST + "/api/users").then((res) => {
            console.log(res.data[0].name);
            let user = res.data[0];
            this.setState({
                name: user.name,
            });
        });
    };

    onInputChange = (e) => {
        this.setState({ message: e.target.value });
    };

    showPosts = () => {
        axios
            .get("http://localhost:5000/api/discussions")
            .then((res) => this.setState({ db: res.data }));
    };

    addPost = () => {
        axios
            .post("http://localhost:5000/api/discussions", {
                name: this.state.name,
                picture: this.state.picture,
                message: this.state.message,
            })
            .then(() => {
                alert("Added a post");
                this.showPosts();
            });
    };

    render() {
        let dbPosts = this.state.db.map((post, postsIndex) => {
            return (
                <div className="post" key={postsIndex}>
                    <p>
                        {post.name}: {post.message}
                    </p>
                    <img src={post.picture} alt="user pic"></img>
                </div>
            );
        });

        return (
            <div className="UserPost">
                <input
                    type="text"
                    onChange={(e) => this.onInputChange(e)}
                    value={this.state.message}
                ></input>
                <button onClick={this.addPost}>Add Post</button>
                <button onClick={this.showPosts}>Show Posts</button>
                <div className="posts">{dbPosts}</div>
            </div>
        );
    }
}

export default UserPost;
