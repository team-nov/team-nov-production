import React,{Component} from 'react'
import axios from 'axios'
import './RegistrationPage.css'
class RegistrationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            email:'',
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
        axios.post('http://localhost:5000/users', {
            name: this.state.name,
            email: this.state.email,
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
                    <label>Name: </label>
                    <input type='text' name='name' onChange={this.handleChange}></input>
                    <label>Email: </label>
                    <input type='text' name='email' onChange={this.handleChange}></input>
                    <label>Username: </label>
                    <input type='text' name='username' onChange={this.handleChange}></input>
                    <label>Password: </label>
                    <input type='password' name='password' onChange={this.handleChange}></input>
                    <select name='typeOfUser' onChange={this.handleChange}>
                        <option value=''>--</option>
                        <option value='mentee'>Mentee</option>
                        <option value='mentor'>Mentor</option>
                        <option value='investor'>Investor</option>
                        <option value='other'>Other</option>
                    </select>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}
export default RegistrationPage
