import React, { Component } from 'react';
import axios from 'axios';
import './VideosHomePage.css'
const serverUrl = "http://localhost:5000/api";
class VideosHomePage extends Component{
    state={
        value:"",
        suggestions:[],
        results:[]
    }
    componentDidMount(){
        this.getAllResults()

    }
    getAllResults = async()=>{
        let res = await axios.get(serverUrl+"/videos");
        await this.setState({results:res.data, suggestions:[]});
        this.resultsToSuggestions(res.data)
    }
    getSearchSuggestions = async()=>{
        let res = await axios.get(serverUrl+"/videos/search/"+this.state.value);
        this.resultsToSuggestions(res.data)
    }
    getSearchResults =async()=>{
        let res = await axios.get(serverUrl+"/videos/search/"+this.state.value);
        this.setState({results:res.data, suggestions:[],value:""})
    }
    resultsToSuggestions = async(results)=>{
        let suggestions = results.map(res=>res.title)
        this.setState({suggestions:suggestions});
       
    }
    onSearchInputChange = async (e)=>{
       let value =  e.target.value;
       await this.setState({value:value});
       this.getSearchSuggestions();
    }
    onSuggestionClick =async(e)=>{
        let value =  e.target.innerText;
        console.log(value)
        await this.setState({value:value});
        this.getSearchResults();
    }
    onSearchButtonClick =async()=>{
        if(!this.state.value){
            alert("Please enter a search query")
        }
        else
            this.getSearchResults();
    }
	deleteVideo = async(e, videoId) => {
		e.preventDefault();
		console.log(videoId);
		try {
            await axios.delete('http://localhost:5000/api/videos', {
				data: {
					videoId: videoId
				}
            })
			window.location.reload();
        } catch (err) {
            console.log(err)
        }
	}
	convertLinkToThumbnail = (link) => {
		const id = link.substring(link.indexOf("v=") + 2);
		return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
	}
    render(){

		if (sessionStorage.getItem("_id") == null) {
			return (
				<div className="container">
                    <br></br>
					<div className="alert alert-danger" role="alert">
						Please login to access the videos.
					</div>
				</div>
			)
		}

        let options = this.state.value 
            ? this.state.suggestions.map((suggest,index)=>{
                return <li className="list-group-item" style={{textAlign:'left'}}key={index} onClick={(e)=>this.onSuggestionClick(e)}>{suggest}</li>
                })
            : []
        let videos = this.state.results.map((video,index)=>{

			let interestsList = [];
			for (var i = 0; i < video.interests.length; i++) {
				interestsList[i] = <li class='list-group-item'>{video.interests[i]}</li>
			}
            return (
            <div key={index} className="col p-3">
                <a href={"/videos/"+video._id} className="cardLink" >
            <div className="card text-start h-100" >
				<div className="vidContainer">
					<img className="video" src={this.convertLinkToThumbnail(video.link)} alt="video"></img>
				</div>
				<div class='d-flex justify-content-between align-items-center p-3 col'>
                    <ul class='list-group list-group-horizontal'>
                        {interestsList}
                    </ul>
					{sessionStorage.getItem('_id') === video.author._id ? <button type="button" class="btn-close" onClick={(e)=>this.deleteVideo(e, video._id)}></button> : null}
                </div>
                <div className="card-body">
                    <h4 className="card-title">{video.title}</h4>
					<div className="d-flex">
						<div>
							<img className="authorProfilePic" src={video.author.picture} alt=""/>
                        	<span className="authorName"> {video.author.name} </span>
						</div>
                    </div>
                </div>
            </div>
            </a>
            </div>
          )
        })

        if(videos.length ===0)
            videos=<h1>No Results found</h1>
        
        return(

            <div>
                <br></br>
                <div className="row justify-content-center">
                    <div className="input-group w-75">
                        <div className="w-75">
                            <input className="form-control rounded-0 m-1" type="search" value={this.state.value} onChange={(e)=>this.onSearchInputChange(e)} />
                        </div>
                        <button className="btn btn-success m-1" onClick={this.onSearchButtonClick}>Search</button>
						<button className="btn btn-secondary mx-3 m-1" onClick={this.getAllResults}>All Results</button>
						<a className="btn btn-secondary m-1" href="/addvideo" onClick={this.getAllResults}>Add Video</a>
                        <ul className="list-group w-75 ">
                            {options}
                        </ul>
                    </div>
                    
                </div>
                
                <div className="container-fluid p-5">
                    <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {videos}
                    </div>
                    

                </div>
            </div>

        );
    }

}
export default VideosHomePage