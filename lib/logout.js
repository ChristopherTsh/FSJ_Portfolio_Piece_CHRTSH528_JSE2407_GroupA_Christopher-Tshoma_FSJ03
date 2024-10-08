import { signOut } from 'firebase/auth';
import { auth } from '../app/products/products';

export function logOut() {
  return signOut(auth);
}
