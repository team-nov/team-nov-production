import React, { Component } from "react";
import axios from "axios";
import "./EditCompany.css";

class EditCompany extends Component {
    constructor(props) {
        super(props);
        this.requestJson = {};
        this.state = {
            _id: this.props.match.params.id,
            company: "",
            companyLogo: "",
            companyLocation: "",
            companyDescription: "",
            founder: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios
            .get(process.env.REACT_APP_HOST + "/api/company/" + this.state._id)
            .then((res) => {
                this.setState({
                    company: res.data.company,
                    companyLogo: res.data.companyLogo,
                    companyLocation: res.data.companyLocation,
                    companyDescription: res.data.companyDescription,
                    founder: res.data.founder,
                });
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // make a json object containing only the attributes that were modified.
        Object.keys(this.state).map((key) => {
            if (this.state[key] !== "") {
                this.requestJson[key] = this.state[key];
            }
        });
        this.requestJson["_id"] = this.state._id;

        console.log(this.requestJson);

        // send the request to update the profile
        axios
            .patch(
                "http://localhost:5000/api/company/updateCompany/",
                this.requestJson
            )
            .then((res) => {
                if (res.data.success) {
                    alert("submitted form");
                } else {
                    alert("not updated");
                }
            })
            .catch((error) => {
                alert("invalid form");
            });
    }

    render() {
        return (
            <div className="ProfilePage">
                <form className="ProfileForm" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name: </label>
                        <input
                            type="text"
                            name="company"
                            value={this.state.company}
                            onChange={this.handleChange}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Logo: </label>
                        <input
                            type="text"
                            name="companyLogo"
                            value={this.state.companyLogo}
                            onChange={this.handleChange}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Location: </label>
                        <input
                            type="text"
                            name="companyLocation"
                            value={this.state.companyLocation}
                            onChange={this.handleChange}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Description: </label>
                        <textarea
                            name="companyDescription"
                            value={this.state.companyDescription}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <input
                        className="ProfileButton"
                        type="submit"
                        value="Save Changes"
                    ></input>
                </form>
            </div>
        );
    }
}
export default EditCompany;
