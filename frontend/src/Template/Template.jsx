import React,{Component} from 'react';
// import './cssfilename.css'
// import axios from 'axios'
// see demo for how to use axios

// class names must start with Capital letter
class Template extends Component{
    state={
        property : 'value'
    }
    render(){
        // must wrap everything in a one div
        return(
            <div>
                <p>{'any js code goes in {}'}</p>

            </div>

        )
    }
}

export default Template
