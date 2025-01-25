'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/user/login'); // Przekierowanie na stronę logowania po wylogowaniu
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div>
      <h1>Wylogowywanie</h1>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
}
