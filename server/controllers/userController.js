import User from '../models/User.js';

export const getOrCreateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const clerkUserId = req.userId;

    let user = await User.findOne({ clerkUserId });

    if (!user) {
      user = new User({
        clerkUserId,
        email: email || '',
        skills: [],
        interests: [],
        education: { level: 'High School', field: '' },
        experience: { level: 'Entry', years: 0 },
        assessmentCompleted: false
      });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getOrCreateUser:', error);
    res.status(500).json({ error: 'Failed to fetch or create user' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const clerkUserId = req.userId;
    const { skills, interests, education, experience, assessmentCompleted } = req.body;

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    if (education) user.education = { ...user.education, ...education };
    if (experience) user.experience = { ...user.experience, ...experience };
    if (assessmentCompleted !== undefined) user.assessmentCompleted = assessmentCompleted;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const clerkUserId = req.userId;
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

