import React, { Component } from 'react';
import {loginMutation} from '../../mutation/mutations';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import axios from "axios";
import jwt_decode from "jwt-decode";



 class login extends Component {
   constructor(props) {
     //Call the constrictor of Super class i.e The Component
     super(props);
     //maintain the state required for this component
     this.state = {};
   }

   onChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   };

   onSubmit = async (e) => {
       axios.defaults.withCredentials = true;
     e.preventDefault();
     let data = {
       email: this.state.email,
       password: this.state.password,
       userType: this.state.userType,
     };
     alert(JSON.stringify(data));
     let mutationResponse = await this.props.loginMutation({
       variables: {
         email: this.state.email,
         password: this.state.password,
         userType: this.state.userType
       },
     });
     let response = mutationResponse.data.login;
     if (response) {
       if (response.status === "200") {
           console.log("THIS IS RESPONSE",response);
         this.setState({
           success: true,
           data: response.message,
           loginFlag: true,
         });
       } else {
         this.setState({
           message: response.message,
           loginFlag: true,
         });
       }
     }
   };

   render() {
        let redirectVar = null;
        let message = ""; 
        
        if(this.state.success){
                 let token = this.state.data;
                 localStorage.setItem("token", token);
                 var decoded = jwt_decode(token.split(" ")[1]);
                 console.log("this is decode",decoded);
                 localStorage.setItem("id", decoded.id);
                 localStorage.setItem("name", decoded.name);
                 localStorage.setItem("email", decoded.email);
                 localStorage.setItem("userType", decoded.userType);
            
            if (
              localStorage.getItem("userType") === "company"
            ) {
              redirectVar = <Redirect to="/companyDashboard" />;
            } else {
              redirectVar = <Redirect to="/studentDashboard" />;
            }
            
        }
     return (
       <div>
           {redirectVar}
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">Log In</h1>
               <p className="lead text-center">
                 Sign in to your Handshake account
               </p>
               <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                   <input
                     type="email"
                     className="form-control form-control-lg"
                     placeholder="Email Address"
                     name="email"
                     value={this.state.email}
                     onChange={this.onChange}
                   />
                 </div>
                 <div className="form-group">
                   <input
                     type="password"
                     className="form-control form-control-lg"
                     placeholder="Password"
                     name="password"
                     value={this.state.password}
                     onChange={this.onChange}
                   />
                 </div>

                 <div className="custom-control custom-radio custom-control-inline">
                   <input
                     type="radio"
                     className="custom-control-input"
                     id="student"
                     name="userType"
                     value="student"
                     onChange={this.onChange}
                   />
                   <label className="custom-control-label" htmlFor="student">
                     Student
                   </label>
                 </div>
                 <div className="custom-control custom-radio custom-control-inline">
                   <input
                     type="radio"
                     className="custom-control-input"
                     id="company"
                     name="userType"
                     value="company"
                     onChange={this.onChange}
                   />
                   <label className="custom-control-label" htmlFor="company">
                     Company
                   </label>
                 </div>

                 <input type="submit" className="btn btn-info btn-block mt-4" />
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }

export default graphql(loginMutation,{name:"loginMutation"})(login);
