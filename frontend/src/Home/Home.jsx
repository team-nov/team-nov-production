import React, {Component} from 'react';
import './Home.css';

class Home extends Component {
    render(){
        return(

            <div className="bg-image homeContainer">
                <div className="container text-center homeInfo">
                    <h1 className="font-weight-bold">African Impact</h1>
                    <p>"The best way to predict the future of Africa is to create it"</p>
                </div>
                <div className="container text-center homeButtons">
                    <p><a className='btn btn-primary w-25 rounded' href='/login'>Login</a></p>
                    <p><a className='btn btn-success w-25 rounded' href='/register'>Register</a></p>
                </div>
            </div>
            
        )
    }
}

export default Home