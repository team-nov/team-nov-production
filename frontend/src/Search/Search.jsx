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
            <div class="col p-3">
                <a href={"/videos/"+video._id} className="cardLink" >
            <div class="card text-start" >
                <img class="card-img-top" src="https://via.placeholder.com/267x150" alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{video.title}</h5>
                    <p class="card-text">Video Author</p>
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
                        <div class="input-group-append">
                            <button class="btn btn-primary" onClick={this.onSearchButtonClick}>Search</button>
                        </div>
                        <ul class="list-group w-75 ">
                            {options}
                        </ul>
                    </div>
                    
                </div>
                
                <div className="container-fluid p-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {videos}
                    </div>
                    

                </div>
            </div>

        );
    }

}
export default Search