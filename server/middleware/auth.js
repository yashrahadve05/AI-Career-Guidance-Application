import { clerkClient } from '@clerk/express';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    // Verify token with Clerk using the correct method
    const payload = await clerkClient.verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    if (!payload || !payload.sub) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = payload.sub;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Token verification failed', details: error.message });
  }
};
