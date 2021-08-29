import React, { Component } from "react";
import axios from "axios";
import "./CompanyInfoPage.css";

class CompanyInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.id,
            name: "",
            logo: "",
            location: "",
            description: "",
            founder: "",
            founderName: "",
        };
    }

    componentDidMount() {
        axios
            .get(process.env.REACT_APP_HOST + "/api/company/" + this.state._id)
            .then((res) => {
                this.setState({
                    name: res.data.company,
                    logo: res.data.companyLogo,
                    location: res.data.companyLocation,
                    description: res.data.companyDescription,
                    founder: res.data.founder,
                });

                axios
                    .get(
                        process.env.REACT_APP_HOST + "/api/users/" + this.state.founder
                    )
                    .then((res) => {
                        this.setState({
                            founderName: res.data.name,
                        });
                    });
            });
    }

    render() {
        if (sessionStorage.getItem("_id") == null) {
            return (
                <div className="container">
                    <br></br>
                    <div className="alert alert-danger" role="alert">
                        Please login to view this page.
                    </div>
                </div>
            );
        }

        var editButton;
        if (this.state.founder === sessionStorage.getItem("_id")) {
            editButton = (
                <a class="btn btn-dark" href={"/editCompany/" + this.state._id}>
                    Edit Company Information
                </a>
            );
        }

        return (
            <div class="container-fluid">
                <br></br>
                <div class="row">
                    <div class="col offset-sm-1 col-sm-3">
                        <img
                            class="img-fluid userProfilePic"
                            src={this.state.logo}
                            alt={this.state.name + " picture"}
                        />
                        <br></br>
                        <br></br>
                        <h1 class="font-weight-bold text-uppercase">
                            {this.state.name}
                        </h1>
                        <h5 class="text-uppercase">
                            Location: {this.state.location}
                        </h5>
                        <h5 class="text-uppercase">
                            Founder: {this.state.founderName}
                        </h5>
                        <br></br>
                        {editButton}
                    </div>
                    <div class="col offset-sm-1 col-sm-5">
                        <h4 class="text-uppercase text-left">
                            About {this.state.name}
                        </h4>
                        <p class="text-justify">{this.state.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default CompanyInfoPage;
