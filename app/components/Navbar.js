import Link from 'next/link';
import { useAuth } from './auth'; // Custom hook to track auth state
import { logOut } from './auth'; // Logout function

export default function Navbar() {
  const user = useAuth();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        {user ? (
          <>
            <li>Welcome, {user.email}</li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link href="/signup">Sign Up</Link></li>
            <li><Link href="/login">Log In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
