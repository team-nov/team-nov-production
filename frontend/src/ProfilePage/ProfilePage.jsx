import React,{Component} from 'react'
import axios from 'axios'
import './ProfilePage.css'
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.requestJson = {};
        this.state = {
            _id:sessionStorage.getItem('_id'),
            name:'',
            email:'',
            picture:'',
            username:'',
            password:'',
            typeOfUser:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users/' + sessionStorage.getItem('_id'))
            .then(res => {
                this.setState({
                    name: res.data.name, 
                    email: res.data.email,
                    picture: res.data.picture,
                    username: res.data.username,
                    typeOfUser: res.data.typeOfUser })
                document.getElementsByName('typeOfUser')[0].value = this.state.typeOfUser;
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // make a json object containing only the attributes that were modified.
        Object.keys(this.state).map((key) => {
            if(this.state[key] != "") {
                this.requestJson[key] = this.state[key];
            }
        })
        this.requestJson["_id"] = this.state._id;

        console.log(this.requestJson);

        // send the request to update the profile
        axios.patch('http://localhost:5000/api/users/profile/', this.requestJson)
        .then(res=> {
            if(res.data.success) {
                alert("submitted form");
            } else {
                alert("not updated");
            }
        })
        .catch((error)=> {
            alert("invalid form");
        });
    }

    render(){
        return(
            <div className="ProfilePage">
                <form className='ProfileForm' onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label>Name: </label>
                        <input type='text' name='name' value={this.state.name} onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Email: </label>
                        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Picture: </label>
                        <input type='text' name='picture' value={this.state.picture} onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Username: </label>
                        <input type='text' name='username' value={this.state.username} onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Password: </label>
                        <input type='password' name='password' placeholder="Enter new password" onChange={this.handleChange}></input>
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
                    <input className='ProfileButton' type='submit' value="Save Changes"></input>
                </form>
            </div>
        )
    }
}
export default ProfilePage
