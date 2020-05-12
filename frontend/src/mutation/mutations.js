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


export { loginMutation, addCompanyMutation, addStudentMutation };