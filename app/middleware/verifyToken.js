// app/middleware/verifyToken.js
import { auth } from '../../lib/firebaseConfig';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const user = await auth.verifyIdToken(token); // Replace this with your own Firebase Auth verification logic
    req.user = { email: user.email, name: user.name }; // Attach user info to the request
    return next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Forbidden' });
  }
};
