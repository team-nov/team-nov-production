import React,{Component} from 'react'
import axios from 'axios'
const serverUrl ="http://localhost:5000/api";

class UserSearch extends Component{
    state={
        results:[],
        selectedUser:{},
        value:'',
        showSuggestions:false

    }
    
    getSearchSuggestions = async()=>{
        let res = await axios.get(serverUrl+"/users/search/"+this.state.value);
        this.setState({results:res.data});
    }
    onSearchInputChange = async (e)=>{
        let value =  e.target.value;
        await this.setState({showSuggestions:true,value:value});
        this.getSearchSuggestions();
     }
     onSearchInputClick = async()=>{
        await this.setState({showSuggestions:true});
     }
     onSuggestionClick =async(e,username)=>{
        alert("Selected user "+username)
        let selectedUser = this.state.results.find((result)=>result.username === username)
        await this.setState({showSuggestions:false,selectedUser:selectedUser});        
    }
    render(){
        let options = this.state.value 
            ? this.state.results.map((suggest,index)=>{
                return <li className="list-group-item" style={{textAlign:'left'}}key={index} onClick={(e)=>this.onSuggestionClick(e,suggest.username)}>{suggest.name}</li>
                })
            : []
        let user = this.state.selectedUser?
        <div class="card text-start " >
                <img class="card-img-top " src={this.state.selectedUser.picture} alt="oops"/>
                <div class="card-body">
                    <h5 class="card-title">{this.state.selectedUser.name}</h5>
                    <p class="card-text">Username: {this.state.selectedUser.username} </p>
                    <p class="card-text">_id: {this.state.selectedUser._id} </p>
                </div>
            </div> :null
        return(
            <div className="userSearch d-flex justify-content-center flex-wrap">
                <div className="input-group w-75">
                    <div className="w-75">
                        <input 
                            className="form-control" 
                            type="search" 
                            value={this.state.value} onChange={(e)=>this.onSearchInputChange(e)}
                            onClick={this.onSearchInputClick} />
                    </div>
                    <button class="btn btn-primary" onClick={this.onSearchButtonClick}>Search</button>
                    <ul class="list-group w-75 " style={{display:this.state.showSuggestions?'flex':'none'}}>
                        {options}
                    </ul>
                    <div className="container-fluid mt-5">
                        <h1>user</h1>
                        <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {user}
                    </div>
                    </div>
                </div>
                

                
                

            </div>
        );
    }

}
export default UserSearch