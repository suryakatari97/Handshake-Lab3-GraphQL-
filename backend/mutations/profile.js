const student = require("../dbSchema/StudentModel");
const company = require("../dbSchema/CompanyModel");


const addStudentProfile = async (args) => {
    console.log("IN STUDENT ADD PROFILE", args);
    let user = await student.findOne({email:args.email})
    if (user) {
      user.dateOfBirth = args.dateOfBirth;
      user.major = args.major;
      user.skillSet = args.skillSet;
      user.careerObjectives = args.careerObjectives;
      let saveduser = await user.save();
      if (saveduser) {
        return { status: 200, message: "PROFILE_ADDED" };
      } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
      }
    } else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
}

const addCompanyProfile = async (args) => {
    console.log("IN COMPANY ADD PROFILE", args);
    let user = await company.findOne({ email: args.email });
    if (user) {
      user.description = args.description;
      user.location = args.location;
      let saveduser = await user.save();
      if (saveduser) {
        return { status: 200, message: "PROFILE_ADDED" };
      } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
      }
    } else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
}

const updateCompanyProfile =async (args) => {
    console.log("IN COMPANY UPDATE PROFILE", args);
      let user = await company.findOne({ email: args.email });
      if (user) {
        user.description = args.description;
        user.location = args.location;
        let saveduser = await user.save();
        if (saveduser) {
          return { status: 200, message: "PROFILE_ADDED" };
        } else {
          return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
      } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
      }

}

const addStudentEducation = async (args) => {
  //console.log("IN STUDENT  ADD EDUCATION", args);
  var user = {
    collegeName: args.collegeName,
    degree: args.degree,
    location: args.location,
    yearOfPassing: args.yearOfPassing,
    cgpa: args.cgpa,
    major: args.major,
  };
  let response = await student
    .updateOne(
      { email: args.email },
      {
        $addToSet: { 'education': user },
      }
    )
     if (response) {
       return { status: 200, message: "EDUCATION_ADDED" };
     } else {
       return { status: 500, message: "INTERNAL_SERVER_ERROR" };
     }
    
};

const addStudentExperience = async (args) => {
    console.log("IN ADD EXPERIENCE",args);
    
    var user = {
      title: args.title,
      company: args.company,
      location: args.location,
      startDate: args.startDate,
      endDate: args.endDate,
      description: args.description,
    };
    let response = await student.updateOne(
      { email: args.email },
      {
        $addToSet: { 'experience': user },
      }
    );
    if (response) {
      return { status: 200, message: "EDUCATION_ADDED" };
    } else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }

}

const updateStudentProfile = async (args) => {
    console.log("IN STUDENT UPDATE PROFILE", args);
    let user = await student.findOne({ email: args.email });
    if (user) {
      user.dateOfBirth = args.dateOfBirth;
      user.major = args.major;
      user.skillSet = args.skillSet;
      user.careerObjectives = args.careerObjectives;
      let saveduser = await user.save();
      if (saveduser) {
        return { status: 200, message: "PROFILE_UPDATED" };
      } else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
      }
    } else {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }

}

const updateStudentEducation = async (args) => {
  let response = await student.updateOne(
    { email: args.email, "education._id": args._id },
    {
      $set: {
        "education.$.collegeName": args.collegeName,
        "education.$.degree": args.degree,
        "education.$.location": args.location,
        "education.$.yearOfPassing": args.yearOfPassing,
        "education.$.cgpa": args.cgpa,
        "education.$.major": args.major,
      },
    }
  );
     if (response) {
       return { status: 200, message: "EDUCATION_UPDATED" };
     } else {
       return { status: 500, message: "INTERNAL_SERVER_ERROR" };
     }
};

const updateStudentExperience = async (args) => {
     let response = await student.updateOne(
       { email: args.email, "experience._id": args._id },
       {
         $set: {
           "experience.$.collegeName": args.collegeName,
           "experience.$.degree": args.degree,
           "experience.$.location": args.location,
           "experience.$.yearOfPassing": args.yearOfPassing,
           "experience.$.cgpa": args.cgpa,
           "experience.$.major": args.major,
         },
       }
     );
     if (response) {
       return { status: 200, message: "EXPERIENCE_UPDATED" };
     } else {
       return { status: 500, message: "INTERNAL_SERVER_ERROR" };
     }
}

exports.addStudentProfile = addStudentProfile;
exports.addStudentEducation = addStudentEducation;
exports.addStudentExperience = addStudentExperience;
exports.updateStudentProfile = updateStudentProfile;
exports.updateStudentEducation = updateStudentEducation;
exports.updateStudentExperience = updateStudentExperience;
exports.addCompanyProfile = addCompanyProfile;
exports.updateCompanyProfile = updateCompanyProfile;