import React, { Component } from "react";
import axios from "axios";
import "./LoginPage.css";
// console.log(process.env.REACT_APP_HOST);
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        axios
            .post(process.env.REACT_APP_HOST + "/api/users/login/", {
                username: this.state.username,
                password: this.state.password,
            })
            .then((res) => {
                if (res.data.success) {
                    sessionStorage.setItem("_id", res.data._id);
                    sessionStorage.setItem("name", res.data.name);
                    console.log(res.data);
                    this.props.history.push("/forum");
                    //window.location.reload();
                } else {
                    this.showError();
                }
            })
            .catch((error) => {
                alert("invalid form");
            });
    }

    showError() {
        const errorField = document.getElementsByClassName("error")[0];
        errorField.style.display = "block";
    }

    render() {
        if (sessionStorage.getItem("_id") != null) {
            return (
                <div className="container">
                    <br></br>
                    <div className="alert alert-danger" role="alert">
                        You are already logged in.
                    </div>
                </div>
            );
        }
        let loading = this.state.loading ? (
            <h4>Loading, please wait ...</h4>
        ) : (
            []
        );

        return (
            <div>
                <div className="LoginPage">
                    <form className="LoginForm" onSubmit={this.handleSubmit}>
                        <div className="error">
                            <label>
                                Could not log in! Incorrect Login Credentials!
                            </label>
                        </div>
                        <div className="field">
                            <label>Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter name"
                                onChange={this.handleChange}
                                required
                            ></input>
                        </div>
                        <div className="field">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter name"
                                onChange={this.handleChange}
                                required
                            ></input>
                        </div>
                        <input
                            className="LoginButton"
                            type="submit"
                            value="Login"
                        ></input>
                    </form>
                </div>
                {loading}
            </div>
        );
    }
}
export default LoginPage;
