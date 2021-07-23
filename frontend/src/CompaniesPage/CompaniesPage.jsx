import React,{Component} from 'react'
import axios from 'axios'
import './CompaniesPage.css'

const serverUrl = "http://localhost:5000/api";

class CompaniesPage extends Component {
  state={
    companies: []
  }

  componentDidMount() {
      axios.get(serverUrl + "/company")
        .then(companies => {
          this.setState({ companies: companies.data })
        })
        .catch((error) => {
          console.log(error);
        })
  }

  render() {
      let companies = this.state.companies.map((company,index)=>{
        return (
        <div class="col p-3 ">
          <div class="card text-start h-100" >
              <img class="card-img-top" src={company.companyLogo} alt="oops"/>
              <div class="card-body">
                  <h5 class="card-title">{company.company}</h5>
                  <p class="card-text">{company.companyDescription}</p>
              </div>
          </div>
        </div>
      )
    })

    return(
      <div>
        <h4>"Hi welcome to the companies page!"</h4>
        <div className="container-fluid p-5">
          <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {companies}
          </div>
        </div>
      </div>
    )
  }


}

export default CompaniesPage