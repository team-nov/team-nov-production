import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
    componentDidMount() {
        console.log(process.env.REACT_APP_HOST);
    }
    render() {
        return (
            <div className="bg-image homeContainer">
                <div className="container text-center homeInfo">
                    <h1 className="font-weight-bold">AfriConnect</h1>
                    <p>
                        "The best way to predict the future of Africa is to
                        create it"
                    </p>
                </div>
                <div className="container text-center homeButtons">
                    <p>
                        <Link
                            className="btn btn-primary w-25 rounded"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                    <p>
                        <Link
                            className="btn btn-success w-25 rounded"
                            to="/register"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
