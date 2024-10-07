import { signOut } from 'firebase/auth';
import { auth } from './products';

export function logOut() {
  return signOut(auth);
}
