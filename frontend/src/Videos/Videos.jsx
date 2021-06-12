import { Link } from "react-router-dom";
import React, {Component} from 'react';

class Videos extends Component {
    render(){
        return(
            <div>
                <Link className="nav-link" to="/videos/examplevideo">Example Video</Link>
            </div>
        )
    }
}

export default Videos