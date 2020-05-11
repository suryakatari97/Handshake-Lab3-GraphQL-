const job = require("../dbSchema/JobModel");

const jobPost = async (args) => {

    let newJob = new job({
      title: args.title,
      postingDate: args.postingDate,
      deadline: args.deadline,
      location: args.location,
      salary: args.salary,
      jobType: args.jobType,
      description: args.description,
      companyId: args.companyId,
      companyName: args.companyName
    });

    let job = await job.create(newJob).save();
    if (job) {
      return { status: 200, message: "JOB_ADDED" };
    } else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.jobPost = jobPost;