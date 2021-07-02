import React, { Component } from 'react';
import axios from 'axios';
import './Search.css'
const serverUrl = "http://localhost:5000/api";
class Search extends Component{
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
        await this.setState({results:res.data});
        this.resultsToSuggestions(res.data)
    }
    getSearchSuggestions = async()=>{
        let res = await axios.get(serverUrl+"/videos/search/"+this.state.value);
        this.resultsToSuggestions(res.data)
    }
    getSearchResults =async()=>{
        let res = await axios.get(serverUrl+"/videos/search/"+this.state.value);
        this.setState({results:res.data, suggestions:[]})
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
    render(){
        let options = this.state.value 
            ? this.state.suggestions.map((suggest,index)=>{
                return <li class="list-group-item" style={{textAlign:'left'}}key={index} onClick={(e)=>this.onSuggestionClick(e)}>{suggest}</li>
                })
            : []
        let videos = this.state.results.map((video,index)=>{
            return (
            <div class="card col-2 m-3" >
                <img class="card-img-top" src="https://via.placeholder.com/150" alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{video.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Watch video</a>
                </div>
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
                        <div class="input-group-append">
                            <button class="btn btn-primary" onClick={this.onSearchButtonClick}>Search</button>
                        </div>
                        <ul class="list-group w-75 ">
                            {options}
                        </ul>
                    </div>
                    
                </div>
                
                <div className="container-fluid">
                <div className="d-flex flex-row flex-wrap justify-content-around p-5">
                    {videos}
                </div>

                </div>
            </div>

        );
    }

}
export default Search