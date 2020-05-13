const Job = require("../dbSchema/JobModel");
const JobApplication = require("../dbSchema/JobApplicationsModel");


const postJob = async (args) => {
  console.log("REQUEST IS " + JSON.stringify(args));

  let data = {
    title: args.title,
    postingDate: args.postingDate,
    deadline: args.deadline,
    location: args.location,
    salary: args.salary,
    jobType: args.jobType,
    description: args.description,
    companyId: args.companyId,
    companyName: args.companyName,
  };
  console.log("INPUT IS " + JSON.stringify(data));
  let jobCreated = await Job.create(data);
  if (jobCreated) {
    console.log("INSIDE IF");
    return { status: 200, message: "SUCCESS" };
  } else {
    console.log("INSIDE ELSE");
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

const applyJob = async (args) => {
  console.log("INSIDE APPLY JOB " + JSON.stringify(args));

  let data = {
    jobId: args.jobId,
    companyId: args.companyId,
    studentId: args.studentId,
    jobStatus: args.jobStatus,
    studentName: args.studentName,
  };

  let jobApplied = await JobApplication.create(data);

  if (jobApplied) {
    console.log("INSIDE IF");
    return { status: 200, message: "APPLIED!" };
  } else {
    console.log("INSIDE ELSE");
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};


exports.postJob = postJob;
exports.applyJob = applyJob;


