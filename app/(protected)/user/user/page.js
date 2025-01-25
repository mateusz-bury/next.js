'use client';

import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();


  if (!loading && !user) {
    router.push('/user/login');
    return null; 
  }

 
  return (
    <div>
      <h1>Witaj na stronie chronionej, {user?.email}!</h1>
    </div>
  );
}
