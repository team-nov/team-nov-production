import React, { Component } from "react";
import axios from "axios";
const serverUrl = process.env.REACT_APP_HOST + "/api";

class UserSearchComponent extends Component {
    state = {
        results: [],
        selectedUser: {},
        value: "",
        showSuggestions: false,
    };

    getSearchSuggestions = async () => {
        let res = await axios.get(
            serverUrl + "/users/search/" + this.state.value
        );
        // check for search filter prop
        // search filter is a function
        let suggestions = res.data;
        if (this.props.filter) {
            console.log(res.data);
            suggestions = res.data.filter(this.props.filter);
        }
        this.setState({ results: suggestions });
    };
    onSearchInputChange = async (e) => {
        let value = e.target.value;
        await this.setState({ showSuggestions: true, value: value });
        this.getSearchSuggestions();
    };
    onSearchInputClick = async () => {
        await this.setState({ showSuggestions: true });
    };
    onSuggestionClick = async (e, username) => {
        alert("Selected user " + username);
        let selectedUser = this.state.results.find(
            (result) => result.username === username
        );
        await this.setState({
            showSuggestions: false,
            selectedUser: selectedUser,
            value: username,
        });
        // call parent function handler
        this.props.onSuggestionClick(selectedUser);
    };
    onSearchButtonClick = async () => {
        await this.getSearchSuggestions();
        // clear searchbar
        this.setState({ value: "", selectedUser: {}, showSuggestions: false });
    };
    render() {
        let options = this.state.value
            ? this.state.results.map((suggest, index) => {
                  return (
                      <li
                          className="list-group-item"
                          style={{ textAlign: "left" }}
                          key={index}
                          onClick={(e) =>
                              this.onSuggestionClick(e, suggest.username)
                          }
                      >
                          {suggest.username}
                      </li>
                  );
              })
            : [];
        return (
            <div className="userSearch d-flex flex-wrap">
                <div className="input-group w-100">
                    <div className="w-100">
                        <input
                            className="form-control"
                            type="search"
                            value={this.state.value}
                            onChange={(e) => this.onSearchInputChange(e)}
                            onClick={this.onSearchInputClick}
                        />
                    </div>
                    <button
                        class="btn btn-primary"
                        onClick={this.onSearchButtonClick}
                        style={{
                            display: this.props.hideSearchButton
                                ? "none"
                                : "block",
                        }}
                    >
                        Search
                    </button>
                    <ul
                        class="list-group w-100"
                        style={{
                            display: this.state.showSuggestions
                                ? "flex"
                                : "none",
                        }}
                    >
                        {options}
                    </ul>
                </div>
            </div>
        );
    }
}
export default UserSearchComponent;
