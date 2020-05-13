import React, { Component } from 'react';
import CompanyNavbar from './companyNavbar';
import swal from "sweetalert";
import axios from "axios";
import { graphql } from "react-apollo";
import flowright from "lodash.flowright";
import { postJobMutation } from "../../mutation/mutations";
import { getCompanyJobsQuery } from "../../queries/queries";
import "../../App.css";

class companyDashboard extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      keyword: "",
      location: "",
      modal: false,
      modal1: false,
      file: null,
      job: null,
      view: false,
      apply: false,
      errors: {},
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
      
    var jobdetails;

    if (this.props.data && this.props.data.companyJobs) {
      jobdetails = this.props.data.companyJobs.map((job) => {
          return (
            <div className="col w-75" id="eventscard">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5 className="card-title col-7">{job.title}</h5>
                    {/* <div className="col-6"></div> */}
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => this.showModala(job)} //changed this.showmodal
                      >
                        View Applicants
                      </button>
                    </div>
                  </div>

                  <p className="card-text">
                    <strong>{job.companyName}</strong>,{" "}
                    <strong>{job.location}</strong>
                  </p>
                  <p className="card-text">
                    <strong>Salary: {job.salary}</strong>
                  </p>
                  <p className="card-text">
                    <strong>Posted on : </strong>
                    <strong>{job.postingDate}</strong>
                    <strong> Application Deadline : </strong>
                    <strong>{job.deadline}</strong>
                  </p>

                  <p className="card-text">
                    <strong>Job Details : </strong>
                    {job.description}
                  </p>
                  <div className="col-10"></div>
                  {/* <a
                 href="/studentApplyJob"
                 className="btn btn-primary"
                 onClick={this.apply(job.job_id)}
               >
                 Apply
               </a> */}
                  {/* <button
                   type="button"
                   className="btn btn-primary"
                   onClick={() => this.showModal11(job)} //changed this.showmodal1
                 >
                   Apply
                 </button> */}
                </div>
              </div>
            </div>
          );

      
      });
    }
    return (
      <div>
        <CompanyNavbar />
        <div className="container">{jobdetails}</div>
      </div>
    );
  }
}


export default flowright(
  graphql(getCompanyJobsQuery, {
      options: {
        variables: { name: localStorage.getItem("name") },
      },
  }),
  graphql(postJobMutation, { name: "postJobMutation" })
)(companyDashboard);