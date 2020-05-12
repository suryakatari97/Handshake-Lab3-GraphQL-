const student = require("../dbSchema/StudentModel");
const company = require("../dbSchema/CompanyModel");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const {secret} = require("../config");

const studentSignUp = async (args) => {
    console.log("IN STUDENT SIGNUP MUTATION", args);
    
  let hashedPassword = passwordHash.generate(args.password);
  let newUser = new student({
    name: args.name,
    email: args.email,
    password: hashedPassword,
    collegeName: args.collegeName,
  });
  let user = await student.find({ email: args.email });
  if (user.length) {    
    return { status: 400, message: "USER_EXISTS" };
  }
  let savedUser = await newUser.save();
  if (savedUser) {
    return { status: 200, message: "USER_ADDED" };
  } else {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

const companySignUp = async (args) => {
    console.log("IN COMPANY SIGNUP MUTATION", args);
  let hashedPassword = passwordHash.generate(args.password);
  let newUser = new company({
    name: args.name,
    email: args.email,
    password: hashedPassword,
    location: args.location,
  });
  let user = await company.find({ email: args.email });
  if (user.length) {
    return { status: 400, message: "USER_EXISTS" };
  }
  let savedUser = await newUser.save();
  if (savedUser) {
    return { status: 200, message: "USER_ADDED" };
  } else {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

const login = async (args) => {
    
  var User = student;
  if (args.userType === "company") {
    User = company;
  }

  let user = await User.findOne({ email: args.email });
  if (user.length === 0) {
    return { status: 401, message: "NO_USER" };
  }
  if (passwordHash.verify(args.password, user.password)) {

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      userType: args.userType,
    };    
    var token = jwt.sign(payload, secret,{
      expiresIn: 100800,
    });
    console.log("THIS IS TOKEN", token);
    token = 'JWT '+ token;
    return { status: 200, message: token };
  } else {
    return { status: 401, message: "INCORRECT_PASSWORD" };
  }
};


exports.studentSignUp = studentSignUp;
exports.companySignUp = companySignUp;
exports.login = login;
