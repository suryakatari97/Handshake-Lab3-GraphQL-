import React, { Component } from 'react';
import StudentNavbar from './studentNavbar';
import {getJobsQuery} from '../../queries/queries';
import { applyJobMutation } from "../../mutation/mutations";
import swal from "sweetalert";
import axios from "axios";
import { graphql } from 'react-apollo';
import flowright from "lodash.flowright";
import '../../App.css'

 class studentDashboard extends Component {
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
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }

   handleUpload = async (event) => {
     console.log(event.target.files[0]);
     await this.setState({ file: event.target.files[0] });
     console.log(this.state.file);
   };

   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }

   async onSubmit(e) {
     e.preventDefault();
     const jobSearch = {
       keyword: this.state.keyword,
       location: this.state.location,
     };
     console.log(jobSearch);

     //List of all filtered posted
     await axios.post("/jobs/getSearchedJobDetails", jobSearch).then((res) => {
       const { jobs } = res.data;
       this.setState({ jobs: jobs });
       console.log(jobs);
     });
   }

   showModal = () => {
     //view
     //console.log("hello");
     this.setState({
       modal: !this.state.modal,
     });
   };

   showModala = (job) => {
     //view job
     //console.log("hello");
     this.setState({
       modal: !this.state.modal,
       job: job,
       view: true,
       apply: false,
     });
   };
   showModal1 = () => {
     //apply
     //console.log("hello");
     this.setState({
       modal1: !this.state.modal1,
     });
   };

   showModal11 = (job) => {
     //apply
     console.log("11");
     console.log(job.job_id);

     this.setState({
       modal1: !this.state.modal1,
       job: job,
       apply: true,
       view: false,
     });
   };



   render() {

    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    const closeBtn1 = (
      <button className="close" onClick={() => this.showModal1()}>
        &times;
      </button>
    );
     var jobdetails;

     if (this.props.data && this.props.data.jobs) {
       jobdetails = this.props.data.jobs.map((job) => {
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
                       className="btn btn-outline-success"
                       onClick={() => this.showModala(job)} //changed this.showmodal
                     >
                       View Job Details
                     </button>
                   </div>
                 </div>

                 <p className="card-text">
                   <strong>{job.company_name}</strong>,{" "}
                   <strong>{job.location}</strong>
                 </p>
                 <p className="card-text">
                   <strong>Salary:</strong> {job.salary}
                 </p>
                 <p className="card-text">
                   <strong>Posted on : </strong>
                   <strong>{job.location}</strong>
                   <strong> Application Deadline : </strong>
                   <strong>{job.location}</strong>
                 </p>

                 <p className="card-text">
                   <strong>Job Details : </strong>
                   {job.job_description}
                 </p>
                 <div className="col-10"></div>
                 {/* <a
                 href="/studentApplyJob"
                 className="btn btn-primary"
                 onClick={this.apply(job.job_id)}
               >
                 Apply
               </a> */}
                 <button
                   type="button"
                   className="btn btn-primary"
                   onClick={() => this.showModal11(job)} //changed this.showmodal1
                 >
                   Apply
                 </button>
               </div>
             </div>
           </div>
         );
       });
     }

     return (
       <div>
         <StudentNavbar />
         <div className="container">
           <form onSubmit={this.onSubmit} className="container">
             <div className="form-row align-items-center">
               <div className="form-group col-md-4">
                 {/* <label className="sr-only" for="inlineFormInput">Keyword</label> */}
                 <input
                   type="text"
                   className="form-control mb-2"
                   name="keyword"
                   placeholder="Search Employers, Jobs, Keywords.."
                   value={this.state.keyword}
                   onChange={this.onChange}
                 />
               </div>
               <div className="form-group col-md-4">
                 {/* <label className="sr-only" for="inlineFormInput">Location</label> */}
                 <input
                   type="text"
                   className="form-control mb-2"
                   name="location"
                   placeholder="Location"
                   value={this.state.location}
                   onChange={this.onChange}
                 />
               </div>
               <div className="form-group col-md-2">
                 <button type="submit" className="btn btn-primary mb-2">
                   Submit Search
                 </button>
               </div>
             </div>
           </form>
           {jobdetails}
         </div>
       </div>
     );
   }
 }

export default flowright(
  graphql(getJobsQuery, {
    options: {
      variables: { email: localStorage.getItem("email") },
    },
  }),
  graphql(applyJobMutation, { name: "applyJobMutation" })
)(studentDashboard);
