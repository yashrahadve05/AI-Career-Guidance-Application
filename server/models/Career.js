import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  preferredSkills: {
    type: [String],
    default: []
  },
  relatedInterests: {
    type: [String],
    required: true
  },
  educationLevel: {
    type: String,
    enum: ['High School', 'Associate', 'Bachelor', 'Master', 'PhD'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Executive'],
    required: true
  },
  roadmap: {
    type: [
      {
        step: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        duration: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  averageSalary: {
    min: Number,
    max: Number
  },
  jobOutlook: {
    type: String,
    enum: ['Growing', 'Stable', 'Declining'],
    default: 'Stable'
  }
}, {
  timestamps: true
});

export default mongoose.model('Career', careerSchema);

