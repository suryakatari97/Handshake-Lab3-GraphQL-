const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentsSchema = new Schema({
    name: 
    {
        type: String, 
        required: true
    },
    email: 
    {
        type: String, 
        required: true,
        unique: true,
        dropDups: true
    },
    password:
    {
        type: String, 
        required: true
    },
    collegeName:{
        type: String, 
        required: true
    },
    dateOfBirth:{
        type : String
    },
    major:{
        type: String
    },
    skillSet:{
        type: String, 
        default: ''
    },
    careerObjectives:{
        type: String, 
        default: ''
    },
    experience : [{
        title : String,
        company : String,
        location : String,
        startDate: String,
        endDate: String,
        description : String
    }],
    education : [{
        collegeName : String,
        degree : String,
        location: String,
        yearOfPassing: String,
        cgpa : String,
        major : String
    }],
    
    address : [{
        city : String,
        state : String,
        country : String
    }]
});



const studentModel = mongoose.model('student', studentsSchema);
module.exports = studentModel;