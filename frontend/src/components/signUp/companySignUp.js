import React, { Component } from 'react';
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import { addCompanyMutation } from "../../mutation/mutations";



 class companySignUp extends Component {
   constructor(props) {
     super(props);
     this.state = {
       name: "",
       email: "",
       password: "",
       location: "",
     };
   }

   onChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   };

   onSubmit = async (e) => {
     e.preventDefault();
     let data = {
       name: this.state.name,
       email: this.state.email,
       password: this.state.password,
       location: this.state.location,
     };
     alert(JSON.stringify(data));

     let mutationResponse = await this.props.addCompanyMutation({
       variables: {
         name: this.state.name,
         email: this.state.email,
         password: this.state.password,
         location: this.state.location,
       },
     });

     let response = mutationResponse.data.addCompany;
     if (response.status === "200") {
       this.setState({
         success: true,
         signupFlag: true,
       });
     } else {
       this.setState({
         message: response.message,
         signupFlag: true,
       });
     }
   };

   render() {
       let redirectVar = null;
       let message = "";
       if (this.state.success) {
         alert("you have registered successfully");
         redirectVar = <Redirect to="/login" />;
       } else if (this.state.message === "USER_EXISTS") {
         message = "Email already exists";
       }
     return (
       <div>
         {redirectVar}
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">Sign Up</h1>
               <p className="lead text-center">Create your Handshake account</p>
               <form noValidate onSubmit={this.onSubmit}>
                 <div class="form-group">
                   <input
                     type="text"
                     class="form-control"
                     name="name"
                     onChange={this.onChange}
                     placeholder="Name"
                   />
                 </div>

                 <div class="form-group">
                   <input
                     type="text"
                     class="form-control"
                     name="email"
                     onChange={this.onChange}
                     placeholder="email"
                   />
                 </div>

                 <div class="form-group">
                   <input
                     type="text"
                     class="form-control"
                     name="password"
                     onChange={this.onChange}
                     placeholder="password"
                   />
                 </div>

                 <div class="form-group">
                   <input
                     type="text"
                     class="form-control"
                     name="location"
                     onChange={this.onChange}
                     placeholder="Location"
                   />
                 </div>
                 <div style={{ color: "#ff0000" }}>{message}</div>
                 <br />

                 <input type="submit" className="btn btn-info btn-block mt-4" />
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }

export default graphql(addCompanyMutation,{name:"addCompanyMutation"})(companySignUp);
