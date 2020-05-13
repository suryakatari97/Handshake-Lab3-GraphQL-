import { gql } from "apollo-boost";

const getJobsQuery = gql`
  query($email: String) {
    jobs(email: $email) {
      _id
      title
      postingDate
      deadline
      location
      salary
      jobType
      description
      companyId
      companyName
    }
  }
`;

const getCompanyJobsQuery = gql`
  query($name: String) {
    companyJobs(companyName: $name) {
      _id
      title
      postingDate
      deadline
      location
      salary
      jobType
      description
      companyId
      companyName
    }
  }
`;

const getStudentJobApplications = gql`
  query($studentId: String) {
    studentJobApplications(studentId: $studentId) {
      _id
      job {
        _id
        title
        location
      }
      company {
        _id
        name
      }
      student {
        _id
      }
      jobStatus
      studentName
    }
  }
`;

const getStudentProfile = gql`
query($companyID: String) {
    students(companyId: $companyId) {
    _id
    name
    email
    password
    collegeName
    dateOfBirth
    major
    careerObjectives

`;

const getStudent = gql`
  query($companyID: String) {
    students(companyId: $companyId) {
    _id
    name
    email
    password
    collegeName
    dateOfBirth
    major
    careerObjectives
    }
  }
`;

export {
  getJobsQuery,
  getCompanyJobsQuery,
  getStudentJobApplications,
  getStudentProfile,
};