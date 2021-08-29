import React,{Component} from 'react'
import axios from 'axios'
import './UserPage.css'

const serverUrl = process.env.REACT_APP_HOST + '/api';

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
            interests:[],
            team: [],
        }
    }

    componentDidMount() {
        axios.get(serverUrl + '/users/' + this.state._id)
            .then(res => {
                this.setState({
                    name: res.data.name, 
                    email: res.data.email,
                    picture: res.data.picture,
                    username: res.data.username,
                    typeOfUser: res.data.typeOfUser,
                    aboutMe: res.data.aboutMe,
                    interests: res.data.interests,
                    team: res.data.team })
            })
    }

    render() {
        if (sessionStorage.getItem("_id") == null) {
			return (
				<div className="container">
                    <br></br>
					<div className="alert alert-danger" role="alert">
						Please login to view this page.
					</div>
				</div>
			)
		}

        var editButton;
        if(this.state._id === sessionStorage.getItem('_id')) {
            editButton = <a class='btn btn-dark' href='/profile'>Edit Profile</a>
        }

        var interestsList = [];
        for (var i = 0; i < this.state.interests.length; i++) {
            interestsList[i] = <li class='list-group-item'>{this.state.interests[i]}</li>
        }

        if(interestsList.length === 0) {
            interestsList[0] = <h6>This user has no interests.</h6>
        }

        var organization = [];
        for (var i = 0; i < this.state.team.length; i++) {
            organization[i] = 
            <a class='nounderline' href={'/company/' + this.state.team[i].id}><li class='list-group-item'>{this.state.team[i].company}</li></a>
        }

        if(organization.length === 0) {
            organization[0] = <h6>This user has no affiliations.</h6>
        }
        

        return(
            <div class='container-fluid'>
                <br></br>
                <div class='row'>
                    <div class='col offset-sm-1 col-sm-3'>
                        <img class='img-fluid userProfilePic' src={this.state.picture} alt={this.state.name + " picture"}/>
                        <br></br><br></br>
                        <h1 class='font-weight-bold text-uppercase'>{this.state.name}</h1>
                        <h5 class='text-uppercase'>{this.state.typeOfUser}</h5>
                        <h5 class='text-uppercase'>{this.state.email}</h5>
                        <br></br>
                        {editButton}
                    </div>
                    <div class='col offset-sm-1 col-sm-5'>
                        <h4 class='text-uppercase text-left'>My Interests</h4>
                        <ul class='list-group list-group-horizontal'>
                            {interestsList}
                        </ul>
                        <br></br>
                        <h4 class='text-uppercase text-left'>My Affiliations:</h4>
                        <ul class='list-group list-group-horizontal'>
                            {organization}
                        </ul>
                        <br></br>
                        <h4 class='text-uppercase text-left'>About Me</h4>
                        <p class='text-justify'>{this.state.aboutMe}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserPage
