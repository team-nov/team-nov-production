import React, { Component } from "react";
import axios from "axios";
import "./AllUsersPage.css";

const serverUrl = process.env.REACT_APP_HOST;

class AllUsersPage extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
        axios
            .get(serverUrl + "/users")
            .then((users) => {
                console.log(users.data);
                this.setState({ users: users.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (sessionStorage.getItem("_id") == null) {
            return (
                <div className="container">
                    <br></br>
                    <div className="alert alert-danger" role="alert">
                        Please login to access the user information.
                    </div>
                </div>
            );
        }

        let users = this.state.users.map((user, index) => {
            let gen = "";

            if (user.team.length >= 1) {
                gen += "Member of " + user.team[0].company;
            }

            if (user.team.length > 1) {
                gen += " and more...";
            }

            return (
                <div class="col p-3 " key={index}>
                    <a href={"/user/" + user._id} className="cardLink">
                        <div class="card text-start h-100">
                            <div class="text-center p-3">
                                <img
                                    class="card-img-top userThumb text-center"
                                    src={user.picture}
                                    alt="oops"
                                />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{user.username}</h5>
                                <p class="card-text">{gen}</p>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });

        if (users.length === 0) users = <h1>No Results found</h1>;

        return (
            <div>
                <div className="container-fluid p-5">
                    <h1 className="mb-5 ">Users</h1>
                    <div className=" row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                        {users}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllUsersPage;
