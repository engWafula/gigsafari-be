const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: false
  },
  jobDescription: {
    type: String,
    required: true
  },
  requirements: {
    education: {
      type: String,
      required: false
    },
    experience: {
      type: String,
      required: false
    },
    skills: {
      type: [String],
      required: false
    },
    other: {
      type: [String],
      required: false
    }
  },
  howToApply: {
    type: String,
    required: false
  },
  deadline: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required:false
  },
  expireAt:{
    type:Date,
    expires: 0
  }
});

jobSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } )


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
