import React, { Component } from 'react';
import axios from 'axios';
import searchTheme from './Search.module.css'
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
        this.resultsToSuggestions()
    }
    getResultsByQuery =async()=>{
        let res = await axios.get(serverUrl+"/videos/search/"+this.state.value);
        await this.setState({results:res.data});
        this.resultsToSuggestions()

    }
    resultsToSuggestions = async()=>{
        let suggestions = this.state.results.map(res=>res.title)
        this.setState({suggestions:suggestions});
       
    }
    onChange = async (e)=>{
       let value =  e.target.value;
       await this.setState({value:value});
       this.getResultsByQuery();
    }
    onClick =async(e)=>{
        let value =  e.target.innerText;
        console.log(value)
        await this.setState({value:value});
        this.getResultsByQuery();
    }
    render(){
        let options = this.state.value 
            ? this.state.suggestions.map((suggest,index)=>{
                return <li class="list-group-item" key={index} onClick={(e)=>this.onClick(e)}>{suggest}</li>
                })
            : []
        let videos = this.state.results.map((video,index)=>{
            return (
            <div class="card col-3 m-3" style={{"width": "18rem"}}>
                <img class="card-img-top" src="https://via.placeholder.com/150" alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{video.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
          )
        })
        let groupSize=4;
        let videosGrouped=[];
        for(let i=0;i<videos.length/groupSize;i++){
            if(i+groupSize-1<videos.length){
                videosGrouped[i] = <div class="row ">
                    {videos.slice(i,i+groupSize)}
                </div>
            }
            else{
                videosGrouped[i] = <div class="row ">
                    {videos.slice(i,videos.length)}
                </div>

            }

        }
        return(

            <div>
                <div className="search">
                    <input type="search" value={this.state.value} onChange={(e)=>this.onChange(e)} />
                    <ul class="list-group">
                        {options}
                    </ul>
                </div>
                <div className="container-fluid">
                   {videosGrouped}

                </div>
            </div>

        );
    }

}
export default Search