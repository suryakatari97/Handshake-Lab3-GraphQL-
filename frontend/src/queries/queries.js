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

export { getJobsQuery, getCompanyJobsQuery };