import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
    // clears the session storage and refreshes the page.
    handleLogOut() {
        sessionStorage.clear();
        window.location.href = '/';
    }

    render() {

        let myCompany;

        // conditional rendering
        // if user isn't logged in, show Login link
        // else show their name and logout option
        let registerLink;
        let loginLink;
        let logout;
        let loggedInLinks;
        if(sessionStorage.getItem("_id") != null) {
            registerLink = null;
            loggedInLinks = [<li className="nav-item"><Link className="nav-link" to="/forum">Forum</Link></li>,       
                            <li className="nav-item"><Link className="nav-link" to="/dms">DMs</Link></li>,
                            <li className="nav-item"><Link className="nav-link" to="/videos">Videos</Link></li>,
                            <li className="nav-item"><Link className="nav-link" to="/companies">Company information</Link></li>,
                            <li className="nav-item"><Link className="nav-link" to="/allusers">Users</Link></li>,
                            <li className="nav-item"><Link className="nav-link" to="/newCompany">Create Organization</Link></li>]      
            loginLink = <li className="nav-item"><Link className="nav-link" to={"/user/" + sessionStorage.getItem('_id')}>My Profile</Link></li>;
            logout = <li className="nav-item"><Link className="nav-link" to='/' onClick={this.handleLogOut}>Logout</Link></li>;       
        } else {
            loggedInLinks = null;
            registerLink = <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            loginLink = <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>;
            logout = null;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">African Impact</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {loggedInLinks}
                        </ul>
                        <ul className="navbar-nav">
                            {registerLink}        
                            {loginLink}
                            {logout}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavigationBar