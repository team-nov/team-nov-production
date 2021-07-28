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
            typeOfUser:'',
            aboutMe:'',
            team: [],
            interests:'',
            allInterests: [],
            allCompanies: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCompany = this.addCompany.bind(this);
        this.addInterest = this.addInterest.bind(this);
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
                    aboutMe:res.data.aboutMe,
                    typeOfUser: res.data.typeOfUser,
                    interests: res.data.interests,
                    team: res.data.team })
                document.getElementsByName('typeOfUser')[0].value = this.state.typeOfUser;
            })

        axios.get('http://localhost:5000/api/interests/')
            .then(res => {
                this.setState({
                    allInterests: res.data })
            })
        
        axios.get('http://localhost:5000/api/company/')
            .then(res => {
                this.setState({
                    allCompanies: res.data })
            })
    }

    addCompany(event) {
        let team = this.state.team;
        if(event.target.checked) {
            if(team.indexOf(event.target.name) === -1) {
                team.push(event.target.name);
            }
        } else {
            console.log(event.target.name);
            var index = team.indexOf(event.target.name);
            if (index !== -1) {
                team.splice(index, 1);
            }
        }

        this.setState({
            team: team
        });
    }

    addInterest(event) {
        let interest = this.state.interests;
        if(event.target.checked) {
            if(interest.indexOf(event.target.name) === -1) {
                interest.push(event.target.name);
            }
        } else {
            console.log(event.target.name);
            var index = interest.indexOf(event.target.name);
            if (index !== -1) {
                interest.splice(index, 1);
            }
        }

        this.setState({
            interests: interest
        });
        
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
            if(this.state[key] !== "") {
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
        var checklist = [];
        // console.log(this.state.allInterests);
        for(var i = 0; i < this.state.allInterests.length; i++) {
            // console.log(this.state.allInterests[i]);
            if(this.state.interests.indexOf(this.state.allInterests[i].name) === -1) {
                checklist[i] = 
                <div>
                    <input type='checkbox' name={this.state.allInterests[i].name} value={this.state.allInterests[i]._id} onChange={this.addInterest}></input>
                    <label class='checklistLabels' for={this.state.allInterests[i].name}>{this.state.allInterests[i].name}</label>
                </div>
            } else {
                checklist[i] = 
                <div>
                    <input type='checkbox' name={this.state.allInterests[i].name} value={this.state.allInterests[i]._id} onChange={this.addInterest} checked></input>
                    <label class='checklistLabels' for={this.state.allInterests[i].name}>{this.state.allInterests[i].name}</label>
                </div>
            }
        }

        var company_checklist = []
        for(var i = 0; i < this.state.allCompanies.length; i++) {
            // console.log(this.state.allInterests[i]);
            if(this.state.team.indexOf(this.state.allCompanies[i].company) === -1) {
                company_checklist[i] = 
                <div>
                    <input type='checkbox' name={this.state.allCompanies[i].company} value={this.state.allCompanies[i]._id} onChange={this.addCompany}></input>
                    <label class='checklistLabels' for={this.state.allCompanies[i].company}>{this.state.allCompanies[i].company}</label>
                </div>
            } else {
                company_checklist[i] = 
                <div>
                    <input type='checkbox' name={this.state.allCompanies[i].company} value={this.state.allCompanies[i]._id} onChange={this.addCompany} checked></input>
                    <label class='checklistLabels' for={this.state.allCompanies[i].company}>{this.state.allCompanies[i].company}</label>
                </div>
            }
        }


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
                        <label>Password: </label>
                        <input type='password' name='password' placeholder="Enter new password" onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>About Me: </label>
                        <textarea name='aboutMe' value={this.state.aboutMe} onChange={this.handleChange}></textarea>
                    </div>
                    <div className='field'>
                        <label>Interests:</label>
                        {checklist}
                    </div>
                    <div className='field'>
                        <label>Organization: </label>
                        {company_checklist}
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
