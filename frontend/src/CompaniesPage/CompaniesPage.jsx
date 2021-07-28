import React,{Component} from 'react'
import axios from 'axios'

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
          <a href={"/company/" + company._id} className="cardLink">
          <div class="card text-start h-100" >
              <img class="card-img-top" src={company.companyLogo} alt="oops"/>
              <div class="card-body">
                  <h4 class="card-title">{company.company}</h4>
                  <h6 class="card-description">{company.companyLocation}</h6>
                  <p class="card-text">{company.companyDescription}</p>
              </div>
          </div>
          </a>
        </div>
      )
    })

    return(
      <div>
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