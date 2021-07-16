import React,{Component} from 'react'
import axios from 'axios'
import './CompanyPage.css'

class CompanyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        company:'',
        companyLogo:'',
        companyLocation:'',
        companyDescription:''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
        [event.target.name] : event.target.value
    })
  }

  onSubmit(e) {

    e.preventDefault();

    const company = {
      company: this.state.company,
      companyLogo: this.state.companyLogo,
      companyLocation: this.state.companyLocation,
      companyDescription: this.state.companyDescription
    }

    console.log(company);

    axios.post('http://localhost:5000/api/company', company)
      .then(res=> {
          if(res.data.success) {
              alert("Submitted company information");
          } else {
              alert("Failed to submit company information");
          }
      })
      .catch((error)=> {
          alert("Invalid submission");
      });
  }

  render(){
    return(
      <div className="CompanyPage">
        <form className='CompanyForm' onSubmit={this.onSubmit}>
            <div className='field'>
                <label>Company Name: </label>
                <input type='text' name='company' value={this.state.company} onChange={this.onChange}></input>
            </div>
            <div className='field'>
                <label>Logo: </label>
                <input type='text' name='companyLogo' value={this.state.companyLogo} onChange={this.onChange}></input>
            </div>
            <div className='field'>
                <label>Location: </label>
                <input type='text' name='companyLocation' value={this.state.companyLocation} onChange={this.onChange}></input>
            </div>
            <div className='field'>
                <label>Description: </label>
                <input type='text' name='companyDescription' value={this.state.companyDescription} onChange={this.onChange}></input>
            </div>
            <input className='CompanyButton' type='submit' value="Submit company information"></input>
        </form>
      </div>
    )
  }
}

export default CompanyPage
