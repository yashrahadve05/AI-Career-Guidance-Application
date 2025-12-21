import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Career from '../models/Career.js';

dotenv.config();

const careers = [
  {
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to create efficient and scalable solutions.',
    requiredSkills: ['Programming', 'Problem Solving', 'Data Structures', 'Algorithms'],
    preferredSkills: ['JavaScript', 'Python', 'Git', 'Database Design'],
    relatedInterests: ['Technology', 'Problem Solving', 'Innovation', 'Coding'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Junior',
    roadmap: [
      {
        step: 1,
        title: 'Learn Programming Fundamentals',
        description: 'Master basic programming concepts, data structures, and algorithms',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Choose a Specialization',
        description: 'Focus on web development, mobile apps, or backend systems',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Build Projects',
        description: 'Create a portfolio of real-world projects to showcase your skills',
        duration: 'Ongoing'
      },
      {
        step: 4,
        title: 'Get an Internship or Entry-Level Position',
        description: 'Gain practical experience in a professional environment',
        duration: '6-12 months'
      }
    ],
    averageSalary: { min: 60000, max: 120000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make data-driven decisions. Use statistical methods, machine learning, and programming to extract insights.',
    requiredSkills: ['Statistics', 'Python', 'Data Analysis', 'Machine Learning'],
    preferredSkills: ['SQL', 'R', 'Data Visualization', 'Deep Learning'],
    relatedInterests: ['Mathematics', 'Analytics', 'Research', 'Technology'],
    educationLevel: 'Master',
    experienceLevel: 'Mid',
    roadmap: [
      {
        step: 1,
        title: 'Build Strong Math Foundation',
        description: 'Master statistics, linear algebra, and calculus',
        duration: '6-12 months'
      },
      {
        step: 2,
        title: 'Learn Data Science Tools',
        description: 'Become proficient in Python, R, SQL, and data visualization libraries',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Study Machine Learning',
        description: 'Learn ML algorithms, model training, and evaluation techniques',
        duration: '6-12 months'
      },
      {
        step: 4,
        title: 'Work on Real Projects',
        description: 'Apply your skills to solve real-world data problems',
        duration: 'Ongoing'
      }
    ],
    averageSalary: { min: 80000, max: 150000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'Product Manager',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to define product vision and strategy.',
    requiredSkills: ['Communication', 'Strategic Thinking', 'Project Management', 'Market Research'],
    preferredSkills: ['Agile', 'User Research', 'Data Analysis', 'Leadership'],
    relatedInterests: ['Business', 'Innovation', 'Technology', 'Strategy'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Mid',
    roadmap: [
      {
        step: 1,
        title: 'Understand Product Development',
        description: 'Learn about product lifecycle, user research, and market analysis',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Develop Technical Understanding',
        description: 'Gain basic knowledge of software development and design principles',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Build Communication Skills',
        description: 'Practice stakeholder management and cross-functional collaboration',
        duration: 'Ongoing'
      },
      {
        step: 4,
        title: 'Start as Associate PM',
        description: 'Begin in a junior role and work your way up',
        duration: '1-2 years'
      }
    ],
    averageSalary: { min: 70000, max: 140000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing user interfaces. Conduct user research and design experiences that meet user needs.',
    requiredSkills: ['Design Thinking', 'User Research', 'Prototyping', 'Visual Design'],
    preferredSkills: ['Figma', 'Adobe XD', 'User Testing', 'Wireframing'],
    relatedInterests: ['Design', 'User Experience', 'Creativity', 'Technology'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Junior',
    roadmap: [
      {
        step: 1,
        title: 'Learn Design Fundamentals',
        description: 'Study color theory, typography, layout, and design principles',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Master Design Tools',
        description: 'Become proficient in Figma, Adobe Creative Suite, and prototyping tools',
        duration: '3-6 months'
      },
      {
        step: 3,
        title: 'Study User Research',
        description: 'Learn how to conduct user interviews, usability testing, and research',
        duration: '3-6 months'
      },
      {
        step: 4,
        title: 'Build a Design Portfolio',
        description: 'Create case studies showcasing your design process and solutions',
        duration: 'Ongoing'
      }
    ],
    averageSalary: { min: 55000, max: 110000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'DevOps Engineer',
    description: 'Bridge development and operations. Automate deployment, manage infrastructure, and ensure system reliability and scalability.',
    requiredSkills: ['Linux', 'Cloud Computing', 'CI/CD', 'Containerization'],
    preferredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    relatedInterests: ['Infrastructure', 'Automation', 'Technology', 'Problem Solving'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Mid',
    roadmap: [
      {
        step: 1,
        title: 'Learn Linux and Scripting',
        description: 'Master Linux administration and shell scripting',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Understand Cloud Platforms',
        description: 'Learn AWS, Azure, or GCP fundamentals and services',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Master CI/CD and Containers',
        description: 'Learn Docker, Kubernetes, and CI/CD pipeline tools',
        duration: '6-12 months'
      },
      {
        step: 4,
        title: 'Get Certified',
        description: 'Obtain cloud certifications to validate your skills',
        duration: '3-6 months'
      }
    ],
    averageSalary: { min: 75000, max: 130000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats. Monitor systems, analyze security incidents, and implement security measures.',
    requiredSkills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Security Tools'],
    preferredSkills: ['Penetration Testing', 'SIEM', 'Compliance', 'Cryptography'],
    relatedInterests: ['Security', 'Technology', 'Problem Solving', 'Analytics'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Junior',
    roadmap: [
      {
        step: 1,
        title: 'Learn Networking Fundamentals',
        description: 'Understand TCP/IP, network protocols, and network architecture',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Study Security Concepts',
        description: 'Learn about threats, vulnerabilities, and security frameworks',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Get Security Certifications',
        description: 'Obtain CompTIA Security+, CEH, or similar certifications',
        duration: '3-6 months'
      },
      {
        step: 4,
        title: 'Gain Practical Experience',
        description: 'Work in security operations or as a junior analyst',
        duration: '1-2 years'
      }
    ],
    averageSalary: { min: 65000, max: 120000 },
    jobOutlook: 'Growing'
  },
  {
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute marketing campaigns across digital channels. Analyze performance and optimize strategies to reach target audiences.',
    requiredSkills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
    preferredSkills: ['Google Ads', 'Email Marketing', 'PPC', 'Marketing Automation'],
    relatedInterests: ['Marketing', 'Social Media', 'Analytics', 'Communication'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Entry',
    roadmap: [
      {
        step: 1,
        title: 'Learn Marketing Fundamentals',
        description: 'Understand marketing principles, consumer behavior, and branding',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Master Digital Channels',
        description: 'Learn SEO, social media marketing, email marketing, and PPC',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Get Certified',
        description: 'Obtain Google Analytics, Google Ads, or HubSpot certifications',
        duration: '2-4 months'
      },
      {
        step: 4,
        title: 'Build Campaign Experience',
        description: 'Run real campaigns and analyze results to build your portfolio',
        duration: 'Ongoing'
      }
    ],
    averageSalary: { min: 45000, max: 85000 },
    jobOutlook: 'Stable'
  },
  {
    title: 'Business Analyst',
    description: 'Analyze business processes and requirements. Bridge the gap between business stakeholders and technical teams.',
    requiredSkills: ['Requirements Analysis', 'Data Analysis', 'Process Modeling', 'Communication'],
    preferredSkills: ['SQL', 'Business Intelligence', 'Agile', 'Stakeholder Management'],
    relatedInterests: ['Business', 'Analytics', 'Problem Solving', 'Strategy'],
    educationLevel: 'Bachelor',
    experienceLevel: 'Junior',
    roadmap: [
      {
        step: 1,
        title: 'Learn Business Analysis Fundamentals',
        description: 'Study requirements gathering, process modeling, and documentation',
        duration: '3-6 months'
      },
      {
        step: 2,
        title: 'Develop Technical Skills',
        description: 'Learn SQL, data analysis tools, and basic programming',
        duration: '6-12 months'
      },
      {
        step: 3,
        title: 'Get Certified',
        description: 'Obtain CBAP or similar business analysis certification',
        duration: '3-6 months'
      },
      {
        step: 4,
        title: 'Gain Industry Experience',
        description: 'Work on projects in your target industry to build domain expertise',
        duration: '1-2 years'
      }
    ],
    averageSalary: { min: 55000, max: 95000 },
    jobOutlook: 'Stable'
  }
];

const seedDatabase = async () => {
  try {
    // FIXED: Better error handling for MongoDB connection with clear instructions
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_career_guidance';
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB');

    await Career.deleteMany({});
    console.log('Cleared existing careers');

    await Career.insertMany(careers);
    console.log(`Seeded ${careers.length} careers successfully`);

    process.exit(0);
  } catch (error) {
    // FIXED: Provide clear instructions for missing MongoDB
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n❌ MongoDB Connection Error:');
      console.error('   MongoDB is not running on localhost:27017');
      console.error('\n📋 To fix this, do ONE of the following:');
      console.error('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
      console.error('   2. Use MongoDB Atlas (Cloud):');
      console.error('      a) Create free account at https://www.mongodb.com/cloud/atlas');
      console.error('      b) Add connection string to server/.env as MONGODB_URI');
      console.error('      c) Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai_career_guidance\n');
    } else {
      console.error('Error seeding database:', error.message);
    }
    process.exit(1);
  }
};

seedDatabase();

