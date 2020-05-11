const graphql = require('graphql');
const { studentSignUp, companySignUp, login } = require("../mutations/signUp");
const {jobPost} = require("../mutations/jobs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLDate
} = graphql;

const StudentExperience = new GraphQLObjectType({
  name: "experience",
  fields: () => ({
    title: { type: GraphQLString },
    company: { type: GraphQLString },
    location: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const StudentEducation = new GraphQLObjectType({
  name: "education",
  fields: () => ({
    collegeName: { type: GraphQLString },
    degree: { type: GraphQLString },
    location: { type: GraphQLString },
    yearOfPassing: {type:GraphQLInt},
    cgpa: {type:GraphQLString},
    major: { type: GraphQLString },
  }),
});

const StudentAddress = new GraphQLObjectType({
  name: "address",
  fields: () => ({
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});

const StudentModel = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    collegeName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    major: { type: GraphQLString },
    careerObjectives: { type: GraphQLString },
    experience: {
      type: StudentExperience,
      resolve(parent, args) {
        return parent.experience;
      },
    },
    education: {
      type: StudentEducation,
      resolve(parent, args) {
        return parent.education;
      },
    },
    address: {
      type: StudentAddress,
      resolve(parent, args) {
        return parent.address;
      },
    },
  }),
});


const StatusType = new GraphQLObjectType({
  name: "Status",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    student: {
      type: StudentModel,
      args: { studentId: { type: GraphQLString } },
      async resolve(parent, args) {
        let student = await Student.findById(args.studentId);
        if (student) {
          return student;
        }
      },
    },
  },
});
console.log("IN SCHEMA");


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        collegeName: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentSignUp(args);
      },
    },
    addCompany: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companySignUp(args);
      },
    },
    login: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userType: { type: GraphQLString },
      },
      resolve(parent, args) {
        return login(args);
      },
    },
    jobPost: {
      type: StatusType,
      args: {
        title: { type: GraphQLString },
        postingDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        jobType: { type: GraphQLString },
        description: { type: GraphQLString },
        companyId: { type: GraphQLString },
        companyName: { type: GraphQLString },
      },
    },
  },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
