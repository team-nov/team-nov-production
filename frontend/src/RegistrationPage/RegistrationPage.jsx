import React,{Component} from 'react'
import axios from 'axios'
import './RegistrationPage.css'
class RegistrationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            email:'',
            picture:'',
            username:'',
            password:'',
            typeOfUser:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users', {
            name: this.state.name,
            email: this.state.email,
            picture: this.state.picture,
            username: this.state.username,
            password:this.state.password,
            typeOfUser: this.state.typeOfUser
        })
        .then(res=> alert(res.data.message))
        .catch((error)=> {
            console.log(error);
        });
    }

    render(){
        return(
            <div className="RegistrationPage">
                <form className='RegistrationForm' onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <h3>Please fill in this form to register your account.</h3>
                    <div className='field'>
                        <label>Name: </label>
                        <input type='text' name='name' placeholder='Enter name' onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Email: </label>
                        <input type='text' name='email' placeholder='Enter email' onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Picture: </label>
                        <input type='text' name='picture' placeholder='Enter picture url'onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Username: </label>
                        <input type='text' name='username' placeholder='Enter username' onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Password: </label>
                        <input type='password' name='password' placeholder='Enter password' onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Type of User: </label>
                        <select name='typeOfUser' onChange={this.handleChange}>
                            <option value=''>--</option>
                            <option value='mentee'>Mentee</option>
                            <option value='mentor'>Mentor</option>
                            <option value='investor'>Investor</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <input className='RegisterButton' type='submit' value="Register"></input>
                </form>
            </div>
        )
    }
}
export default RegistrationPage
