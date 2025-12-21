import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  interests: {
    type: [String],
    required: true
  },
  education: {
    level: String,
    field: String
  },
  experience: {
    level: String,
    years: Number
  },
  recommendations: [
    {
      careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career'
      },
      score: Number,
      breakdown: {
        skillMatch: Number,
        interestMatch: Number,
        educationMatch: Number,
        experienceMatch: Number
      }
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Assessment', assessmentSchema);

