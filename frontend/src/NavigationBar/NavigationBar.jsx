import React, { Component } from "react";
import { Link } from "react-router-dom";
import './NavigationBar.css'

class NavigationBar extends Component {
    render() {
        return (
            <nav>
                <Link className="title" to="/">African Impact</Link>
                <ul>
                    <li>
                        <Link className="links" to="/register">Registration</Link>
                    </li>
                    <li>
                        <Link className="links" to="/dms">DMs</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavigationBar