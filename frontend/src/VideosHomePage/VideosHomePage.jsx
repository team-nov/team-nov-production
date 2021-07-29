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
    render(){

		if (sessionStorage.getItem("_id") == null) {
			return (
				<div className="container">
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
					<iframe className="video" src={video.link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>
				<div class='p-3 col'>
                    <ul class='list-group list-group-horizontal'>
                        {interestsList}
                    </ul>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
					<div className="d-flex">
						<div>
							<img className="authorProfilePic" src={video.author.picture} alt=""/>
                        	<span className="authorName"> {video.author.name} </span>
						</div>
						<button type="button" className="btn btn-danger" onClick={(e)=>this.deleteVideo(e, video._id)}>X</button>
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
                <div className="row justify-content-center">
                    <div className="input-group w-75">
                        <div className="w-75">
                            <input className="form-control" type="search" value={this.state.value} onChange={(e)=>this.onSearchInputChange(e)} />
                        </div>
                        <button className="btn btn-success" onClick={this.onSearchButtonClick}>Search</button>
						<button className="btn btn-secondary mx-3" onClick={this.getAllResults}>All Results</button>
						<a className="btn btn-secondary" href="/addvideo" onClick={this.getAllResults}>Add Video</a>
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