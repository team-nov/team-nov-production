import React,{Component} from 'react'
import axios from 'axios'
import './UserPage.css'
class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id:this.props.match.params.id,
            name:'',
            email:'',
            picture:'',
            username:'',
            typeOfUser:'',
            aboutMe:'',
            team: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users/' + this.state._id)
            .then(res => {
                this.setState({
                    name: res.data.name, 
                    email: res.data.email,
                    picture: res.data.picture,
                    username: res.data.username,
                    typeOfUser: res.data.typeOfUser,
                    aboutMe: res.data.aboutMe,
                    team: res.data.team })
            })
    }

    render() {
        var editButton;
        if(this.state._id === sessionStorage.getItem('_id')) {
            editButton = <a class='btn btn-dark' href='/profile'>Edit Profile</a>
        }

        return(
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col offset-sm-1 col-sm-3'>
                        <img class='img-fluid rounded' src={this.state.picture} alt={this.state.name + " picture"}/>
                        <h1 class='font-weight-bold text-uppercase'>{this.state.name}</h1>
                        <h4 class='text-uppercase'>{this.state.typeOfUser}</h4>
                        <h4 class='text-uppercase'>{this.state.email}</h4>
                        <h4 class='text-uppercase'>{this.state.team}</h4>
                        {editButton}
                    </div>
                    <div class='col offset-sm-1 col-sm-5'>
                        <h4 class='text-uppercase text-left'>About Me</h4>
                        <p class='text-justify'>{this.state.aboutMe}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserPage
