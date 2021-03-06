import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const serverUrl = process.env.REACT_APP_HOST + "/api";

class CompaniesPage extends Component {
    state = {
        companies: [],
    };

    componentDidMount() {
        axios
            .get(serverUrl + "/company")
            .then((companies) => {
                this.setState({ companies: companies.data });
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
                        Please login to access the companies information.
                    </div>
                </div>
            );
        }

        let companies = this.state.companies.map((company, index) => {
            return (
                <div className="col p-3 ">
                    <Link to={"/company/" + company._id} className="cardLink">
                        <div className="card text-start h-100">
                            <img
                                className="card-img-top"
                                src={company.companyLogo}
                                alt="oops"
                            />
                            <div className="card-body">
                                <h4 className="card-title">
                                    {company.company}
                                </h4>
                                <h6 className="card-description">
                                    {company.companyLocation}
                                </h6>
                                <p className="card-text">
                                    {company.companyDescription}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });

        if (companies.length === 0) {
            return <h1>No companies added yet</h1>;
        } else {
            return (
                <div>
                    <div className="container-fluid p-5">
                        <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                            {companies}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default CompaniesPage;
