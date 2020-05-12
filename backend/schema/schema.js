const graphql = require("graphql");
const student = require("../dbSchema/StudentModel");
const Job = require("../dbSchema/JobModel");
const JobApplication = require("../dbSchema/JobApplicationsModel");
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
const { postJob, applyJob } = require("../mutations/jobs");

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
    _id: { type: GraphQLString },
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
    _id: { type: GraphQLString },
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
    _id: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});

const StudentModel = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    collegeName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    major: { type: GraphQLString },
    careerObjectives: { type: GraphQLString },

    experience: {
      type: GraphQLList(StudentExperience),
    },
    education: { type: GraphQLList(StudentEducation) },
    address: {
      type: GraphQLList(StudentAddress),
    },
  }),
});

const CompanyModel = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const JobModel = new GraphQLObjectType({
  name: "job",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    postingDate: { type: GraphQLString },
    deadline: { type: GraphQLString },
    location: { type: GraphQLString },
    salary: { type: GraphQLString },
    jobType: { type: GraphQLString },
    description: { type: GraphQLString },
    companyId: { type: GraphQLString },
    companyName: { type: GraphQLString },
  }),
});

const JobApplicationsModel = new GraphQLObjectType({
  name: "jobApplications",
  fields: () => ({
    _id: { type: GraphQLString },
    job: {
      type: JobModel,
      async resolve(parent, args) {
        console.log("parent id is " + parent.jobId);
        let result = await Job.findOne({ _id: parent.jobId });
        console.log("RESULT IS " + JSON.stringify(result));
        return result;
      },
    },
    company: {
      type: CompanyModel,
      async resolve(parent, args) {
        console.log("parent id is " + parent.companyId);
        let result = await Company.findOne({ _id: parent.companyId });
        console.log("RESULT IS " + JSON.stringify(result));
        return result;
      },
    },
    student: {
      type: StudentModel,
      async resolve(parent, args) {
        console.log("parent id is " + parent.studentId);
        let result = await Student.findOne({ _id: parent.studentId });
        console.log("RESULT IS " + JSON.stringify(result));
        return result;
      },
    },
    jobStatus: { type: GraphQLString },
    studentName: { type: GraphQLString },
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
        if (studentdet) {
          return studentdet;
        }
      },
    },
    //getallstudents
    students: {
      type: new GraphQLList(StudentModel),
      async resolve(parent, args) {
        let students = await student.find();
        console.log(students);

        if (students) {
          return students;
        }
      },
    },
    //getjobdetails
    job: {
      type: new GraphQLList(JobModel),
      args: { jobId: { type: GraphQLString } },
      async resolve(parent, args) {
        let job = await Job.findById({ _id: args.jobId });
        if (job) {
          return job;
        }
      },
    },
    //getjobbytitle
    jobByTitle: {
      type: new GraphQLList(JobModel),
      args: { title: { type: GraphQLString } },
      async resolve(parent, args) {
        let job = await Job.find({ title: args.title });
        if (job) {
          return job;
        }
      },
    },
    //getalljobs
    
    jobs: {
      type: new GraphQLList(JobModel),
      args: { email: { type: GraphQLString } },
      async resolve(parent) {
        let jobs = await Job.find();
        console.log("companyJobs result " + jobs);
        if (jobs) {
          return jobs;
        }
      },
    },
    //getcompanyjobs
    companyJobs: {
      type: new GraphQLList(JobModel),
      args: { companyId: { type: GraphQLString } },
      async resolve(parent, args) {
        let jobs = await Job.find({ companyId: args.companyId });
        console.log("companyJobs result " + jobs);
        return jobs;
      },
    },
    // companyJobApplicationDetails: {
    //   type: new GraphQLList(JobApplicationsModel),
    //   args: { jobId: { type: GraphQLString } },
    //   async resolve(parent, args) {
    //     let applications = await Job.find({ jobId: args.jobId });
    //     console.log("companyJobApplicationDetails result " + applications);
    //     if (applications) {
    //       return applications;
    //     }
    //   },
    // },
    //viewstudentappliedjobs
    studentJobApplications: {
      type: new GraphQLList(JobApplicationsModel),
      args: { studentId: { type: GraphQLString } },
      async resolve(parent, args) {
        let applications = await JobApplication.find({
          studentId: args.studentId,
        });
        console.log("studentJobApplications result " + applications);
        if (applications) {
          return applications;
        }
      },
    },
    //viewstudentsappliedforjobs
    companyJobApplicants: {
      type: new GraphQLList(JobApplicationsModel),
      args: { jobId: { type: GraphQLString } },
      async resolve(parent, args) {
        let applications = await JobApplication.find({ jobId: args.jobId });
        console.log("companyJobApplicants result " + applications);
        if (applications) {
          return applications;
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

    postJob: {
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
      resolve(parent, args) {
        return postJob(args);
      },
    },

    applyJob: {
      type: StatusType,
      args: {
        jobId: { type: GraphQLString },
        companyId: { type: GraphQLString },
        studentId: { type: GraphQLString },
        jobStatus: { type: GraphQLString },
        studentName: { type: GraphQLString },
      },
      resolve(parent, args) {
        return applyJob(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
