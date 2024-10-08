import { signOut } from 'firebase/auth';
import { auth } from '../app/api/products';

export function logOut() {
  return signOut(auth);
}
