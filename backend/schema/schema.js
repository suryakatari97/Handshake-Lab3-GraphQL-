const graphql = require("graphql");
const student = require("../dbSchema/StudentModel");
const { studentSignUp, companySignUp, login } = require("../mutations/signUp");
const {
  addStudentProfile,
  addStudentEducation,
  addStudentExperience,
  updateStudentProfile,
  updateStudentEducation,
  updateStudentExperience,
  addCompanyProfile,
  updateCompanyProfile,
} = require("../mutations/profile");
const { jobPost } = require("../mutations/jobs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLDate,
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
    yearOfPassing: { type: GraphQLString },
    cgpa: { type: GraphQLString },
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
      type: new GraphQLList(StudentExperience),
    },
    education: { type: GraphQLList(StudentEducation) },
    address: {
      type: GraphQLList(StudentAddress),
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
    getStudent: {
      type: new GraphQLList(StudentModel),
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        let studentdet = await student.find({ email: args.email });
        console.log("this is student details", studentdet);

        if (studentdet) {
          return studentdet;
        }
      },
    },
  },
});

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
    addCompanyProfile: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addCompanyProfile(args);
      },
    },
    updateCompanyProfile: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateCompanyProfile(args);
      },
    },
    addStudentProfile: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        major: { type: GraphQLString },
        skillSet: { type: GraphQLString },
        careerObjectives: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addStudentProfile(args);
      },
    },
    updateStudentProfile: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        major: { type: GraphQLString },
        skillSet: { type: GraphQLString },
        careerObjectives: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateStudentProfile(args);
      },
    },
    addStudentExperience: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        title: { type: GraphQLString },
        company: { type: GraphQLString },
        location: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addStudentExperience(args);
      },
    },
    addStudentEducation: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        collegeName: { type: GraphQLString },
        degree: { type: GraphQLString },
        location: { type: GraphQLString },
        yearOfPassing: { type: GraphQLString },
        cgpa: { type: GraphQLString },
        major: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addStudentEducation(args);
      },
    },
    updateStudentEducation: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        collegeName: { type: GraphQLString },
        degree: { type: GraphQLString },
        location: { type: GraphQLString },
        yearOfPassing: { type: GraphQLString },
        cgpa: { type: GraphQLString },
        major: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateStudentEducation(args);
      },
    },

    updateStudentExperience: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        collegeName: { type: GraphQLString },
        degree: { type: GraphQLString },
        location: { type: GraphQLString },
        yearOfPassing: { type: GraphQLString },
        cgpa: { type: GraphQLString },
        major: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateStudentExperience(args);
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
  mutation: Mutation,
});
