const mongoose = require('mongoose');

var issueSchema = mongoose.Schema({
    summary:{
        type:String,
    },
    description:{
        type:String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectID,
      ref : 'User'
    },
    issued_to: [{
        type: mongoose.Schema.Types.ObjectID,
        ref:'User'
      }],
    project_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref:'Project'
    },
    date_of_creation: {
        type : Date,
        default:new  Date().toLocaleDateString()
    },
    priority: {
        type: String
    },
    status : {
        type : String
    },
    type : {
        type : String
    },
    tags :[
        {type : String}
    ],
    story_points : {
        type : String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectID,
        ref : 'Comment'
    }]
  });

  
  
const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue