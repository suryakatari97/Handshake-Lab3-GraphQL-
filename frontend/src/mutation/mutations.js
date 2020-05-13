import { gql } from "apollo-boost";

const addStudentMutation = gql`
mutation AddStudent($name: String,$email:String,$password:String,$collegeName:String){
    addStudent(name: $name, email:$email, password:$password,collegeName:$collegeName){
        message
        status
    }
}
`;

const addCompanyMutation = gql`
mutation AddCompany($name: String,$email:String,$password:String,$location:String){
    addCompany(name: $name,email:$email,password:$password,location:$location){
        message
        status
    }
}
`;

const loginMutation = gql`
mutation login($email:String,$password:String,$userType:String){
    login(email:$email,password:$password,userType:$userType){
        message
        status
    }
}
`;



const postJobMutation = gql`
    mutation PostJob($title: String, $postingDate: String, $deadline: String, $location: String, $salary: String, $jobType: String, $description: String, $companyId: String, $companyName: String){
        postJob(title: $title, postingDate: $postingDate, deadline: $deadline, location: $location, salary: $salary, jobType: $jobType, description: $description, companyId: $companyId, companyName: $companyName){
            message 
            status
        }
    }
`;



const studentProfileMutation = gql`
  mutation studentProfileMutation(
    $email: String
    $dateOfBirth: String
    $major: String
    $salary: String
    $skillSet: String
    $careerObjectives: String
  ) {
    studentProfileMutation(
      email: $email
      dateOfBirth: $dateOfBirth
      major: $major
      location: $location
      skillSet: $skillSet
    ) {
      message
      status
    }
  }
`;
const updatestudentProfileMutation = gql`
  mutation updatestudentProfileMutation(
    $email: String
    $dateOfBirth: String
    $major: String
    $salary: String
    $skillSet: String
    $careerObjectives: String
  ) {
    updatestudentProfile(
      email: $email
      dateOfBirth: $dateOfBirth
      major: $major
      location: $location
      skillSet: $skillSet
    ) {
      message
      status
    }
  }
`;

const applyJobMutation = gql`
    mutation ApplyJob($jobId: String, $companyId: String, $studentId: String, $jobStatus: String, $studentName: String){
        applyJob(jobId: $jobId, companyId: $companyId, studentId: $studentId, jobStatus: $jobStatus, studentName: $studentName){
            message
            status
        }
    }
`;
export {
  applyJobMutation,
  loginMutation,
  addCompanyMutation,
  addStudentMutation,
  postJobMutation,
  studentProfileMutation,
  updatestudentProfileMutation,
};