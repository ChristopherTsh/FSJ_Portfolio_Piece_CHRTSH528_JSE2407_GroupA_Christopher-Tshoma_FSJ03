// app/api/auth/verifyToken.js
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

const app = initializeApp({
  credential: applicationDefault(),
});

export const verifyToken = async (token) => {
  const auth = getAuth(app);
  return auth.verifyIdToken(token);
};
