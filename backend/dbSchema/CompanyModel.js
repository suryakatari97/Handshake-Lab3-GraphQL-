const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
    name: 
    {
        type: String,         
    },
    email: 
    {
        type: String, 
    },
    password:
    {
        type: String, 
        
    },
    location:{
        type: String, 
        required: false
    },
    description:{
        type: String, 
        required: false
    },
   });

const companyModel = mongoose.model('company', companySchema);
module.exports = companyModel;