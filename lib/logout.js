import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export function logOut() {
  return signOut(auth);
}
