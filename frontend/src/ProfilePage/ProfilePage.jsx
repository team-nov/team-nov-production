import React,{Component} from 'react'
import axios from 'axios'
import './LoginPage.css'
class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/profile/', {username: this.state.username, password: this.state.password})
        .then(res=> alert("submitted"))
        .catch((error)=> {
            alert("invalid form");
        });
    }

    render(){
        return(
            <div className="LoginPage">
                <form className='LoginForm' onSubmit={this.handleSubmit}>
                    <div className='error'>
                        <label>Could not log in! Incorrect Login Credentials!</label>
                    </div>
                    <div className='field'>
                        <label>Username: </label>
                        <input type='text' name='username' placeholder='Enter name' onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Password: </label>
                        <input type='password' name='password' placeholder='Enter name' onChange={this.handleChange}></input>
                    </div>
                    <input className='LoginButton' type='submit' value="Login"></input>
                </form>
            </div>
        )
    }
}
export default LoginPage
