import React,{Component} from 'react'
import axios from 'axios'
import './VideoAddPage.css'
class VideoAddPage extends Component {
    constructor(props) {
        super(props);
        this.requestJson = {};
        this.state = {
            userId:sessionStorage.getItem('_id'),
			title:'',
			link:'',
            interests:[],
            allInterests: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addInterest = this.addInterest.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/interests/')
            .then(res => {
                this.setState({
                    allInterests: res.data })
            })
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

    async handleSubmit(e) {
        e.preventDefault();
		console.log(this.state.title)
		console.log(this.state.interests)

		try {
            await axios.post('http://localhost:5000/api/videos', {
				author: this.state.userId,
				title: this.state.title,
				link: this.state.link,
				interests: this.state.interests
            })
        } catch (e) {
            console.log(e)
        }
    }

    render(){     
        let checklist = [];
        // console.log(this.state.allInterests);
        for(let i = 0; i < this.state.allInterests.length; i++) {
            // console.log(this.state.allInterests[i]);
            if(this.state.interests.indexOf(this.state.allInterests[i].name) === -1) {
                checklist[i] = 
                <div key={i}>
                    <input type='checkbox' name={this.state.allInterests[i].name} value={this.state.allInterests[i]._id} onChange={this.addInterest}></input>
                    <label className='checklistLabels' htmlFor={this.state.allInterests[i].name}>{this.state.allInterests[i].name}</label>
                </div>
            } else {
                checklist[i] = 
                <div key={i}>
                    <input type='checkbox' name={this.state.allInterests[i].name} value={this.state.allInterests[i]._id} onChange={this.addInterest} checked></input>
                    <label className='checklistLabels' htmlFor={this.state.allInterests[i].name}>{this.state.allInterests[i].name}</label>
                </div>
            }
        }

        return(
            <div className="VideoAddPage">
                <form className='VideoAddForm' onSubmit={this.handleSubmit}>
					<h1>Add Video</h1>
                    <div className='field'>
                        <label>Title: </label>
                        <input type='text' name='title' value={this.state.title} onChange={this.handleChange}></input>
                    </div>
					<div className='field'>
                        <label>Video link: </label>
                        <input type='text' name='link' value={this.state.link} onChange={this.handleChange}></input>
                    </div>
                    <div className='field'>
                        <label>Interests:</label>
                        {checklist}
                    </div>
                    <input className='VideoAddButton' type='submit' value="Save Changes"></input>
                </form>
            </div>
        )
    }
}
export default VideoAddPage
