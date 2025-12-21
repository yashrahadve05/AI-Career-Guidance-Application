import Career from '../models/Career.js';
import User from '../models/User.js';
import Assessment from '../models/Assessment.js';

const calculateSkillMatch = (userSkills, careerRequired, careerPreferred) => {
  if (!userSkills || userSkills.length === 0) return 0;
  
  const requiredMatches = userSkills.filter(skill => 
    careerRequired.some(req => req.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const preferredMatches = userSkills.filter(skill => 
    careerPreferred.some(pref => pref.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const totalSkills = careerRequired.length + careerPreferred.length;
  const matchedSkills = requiredMatches + (preferredMatches * 0.5);
  
  if (totalSkills === 0) return 0;
  
  return Math.min((matchedSkills / totalSkills) * 100, 100);
};

const calculateInterestMatch = (userInterests, careerInterests) => {
  if (!userInterests || userInterests.length === 0) return 0;
  if (!careerInterests || careerInterests.length === 0) return 0;
  
  const matches = userInterests.filter(interest => 
    careerInterests.some(careerInterest => 
      careerInterest.toLowerCase() === interest.toLowerCase()
    )
  ).length;
  
  return (matches / Math.max(userInterests.length, careerInterests.length)) * 100;
};

const calculateEducationMatch = (userEducation, careerEducation) => {
  const educationLevels = {
    'High School': 1,
    'Associate': 2,
    'Bachelor': 3,
    'Master': 4,
    'PhD': 5
  };
  
  const userLevel = educationLevels[userEducation] || 1;
  const careerLevel = educationLevels[careerEducation] || 1;
  
  if (userLevel >= careerLevel) return 100;
  
  return (userLevel / careerLevel) * 100;
};

const calculateExperienceMatch = (userExperience, careerExperience) => {
  const experienceLevels = {
    'Entry': 1,
    'Junior': 2,
    'Mid': 3,
    'Senior': 4,
    'Executive': 5
  };
  
  const userLevel = experienceLevels[userExperience] || 1;
  const careerLevel = experienceLevels[careerExperience] || 1;
  
  if (userLevel >= careerLevel) return 100;
  
  return (userLevel / careerLevel) * 100;
};

export const getRecommendations = async (req, res) => {
  try {
    const clerkUserId = req.userId;
    
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please complete your profile first.' });
    }

    if (!user.assessmentCompleted) {
      return res.status(400).json({ error: 'Please complete your assessment first' });
    }

    const careers = await Career.find({});
    
    const recommendations = careers.map(career => {
      const skillMatch = calculateSkillMatch(
        user.skills,
        career.requiredSkills,
        career.preferredSkills
      );
      
      const interestMatch = calculateInterestMatch(
        user.interests,
        career.relatedInterests
      );
      
      const educationMatch = calculateEducationMatch(
        user.education.level,
        career.educationLevel
      );
      
      const experienceMatch = calculateExperienceMatch(
        user.experience.level,
        career.experienceLevel
      );
      
      const finalScore = (
        skillMatch * 0.4 +
        interestMatch * 0.3 +
        educationMatch * 0.2 +
        experienceMatch * 0.1
      );
      
      return {
        career: career,
        score: Math.round(finalScore * 100) / 100,
        breakdown: {
          skillMatch: Math.round(skillMatch * 100) / 100,
          interestMatch: Math.round(interestMatch * 100) / 100,
          educationMatch: Math.round(educationMatch * 100) / 100,
          experienceMatch: Math.round(experienceMatch * 100) / 100
        }
      };
    });

    recommendations.sort((a, b) => b.score - a.score);

    const topRecommendations = recommendations.slice(0, 10);

    const assessment = new Assessment({
      userId: user._id,
      skills: user.skills,
      interests: user.interests,
      education: user.education,
      experience: user.experience,
      recommendations: topRecommendations.map(rec => ({
        careerId: rec.career._id,
        score: rec.score,
        breakdown: rec.breakdown
      }))
    });

    await assessment.save();

    res.json({
      recommendations: topRecommendations.map(rec => ({
        career: {
          _id: rec.career._id,
          title: rec.career.title,
          description: rec.career.description,
          requiredSkills: rec.career.requiredSkills,
          preferredSkills: rec.career.preferredSkills,
          relatedInterests: rec.career.relatedInterests,
          educationLevel: rec.career.educationLevel,
          experienceLevel: rec.career.experienceLevel,
          roadmap: rec.career.roadmap,
          averageSalary: rec.career.averageSalary,
          jobOutlook: rec.career.jobOutlook
        },
        score: rec.score,
        breakdown: rec.breakdown
      }))
    });
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
};

export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find({});
    res.json(careers);
  } catch (error) {
    console.error('Error in getAllCareers:', error);
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
};

