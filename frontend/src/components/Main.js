import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import login from './signUp/login';
import studentSignUp from './signUp/studentSignUp';
import companySignUp from './signUp/companySignUp';
import studentDashboard from './student/studentDashboard';
import companyDashboard from './company/companyDashboard';

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={login} />
            <Route exact path="/studentSignUp" component={studentSignUp} />
            <Route exact path="/companySignUp" component={companySignUp} />
            <Route exact path="/companyDashboard" component={companyDashboard} />
            <Route exact path="/studentDashboard" component={studentDashboard} />
          </div>
        );
    }
}

export default Main;