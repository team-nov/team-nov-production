import React, { Component } from 'react';
import axios from 'axios';

const serverUrl = "http://localhost:5000/api";

class AllUsersPage extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        axios.get(serverUrl + "/users")
            .then(users => {
                this.setState({ users: users.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        let users = this.state.users.map((user, index) => {
            return (
                <div class="col p-3 " key={index}>
                    <a href={"/user/" + user._id} className="cardLink" >
                        <div class="card text-start h-100" >
                            <div class="text-center">
                                <img class="card-img-top userProfilePic text-center" src={user.picture} alt="oops" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{user.username}</h5>
                                {[user.team ? <p class="card-text">Member of {user.team}</p> : []]}
                            </div>
                        </div>
                    </a>
                </div>
            )
        })

        if (users.length === 0)
            users = <h1>No Results found</h1>

        return (
            <div>
                <div className="container-fluid p-5">
                    <h1 className="mb-5 ">Users</h1>
                    <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {users}
                    </div>
                </div>
            </div>

        );
    }
}

export default AllUsersPage
