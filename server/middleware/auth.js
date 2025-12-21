import { createClerkClient } from '@clerk/express';

const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    // Verify token with Clerk
    const sessionToken = await clerkClient.verifyToken(token);
    
    if (!sessionToken || !sessionToken.sub) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = sessionToken.sub;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

