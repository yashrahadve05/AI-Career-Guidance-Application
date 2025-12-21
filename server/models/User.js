import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  interests: {
    type: [String],
    default: []
  },
  education: {
    level: {
      type: String,
      enum: ['High School', 'Associate', 'Bachelor', 'Master', 'PhD'],
      default: 'High School'
    },
    field: {
      type: String,
      default: ''
    }
  },
  experience: {
    level: {
      type: String,
      enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Executive'],
      default: 'Entry'
    },
    years: {
      type: Number,
      default: 0
    }
  },
  assessmentCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);

