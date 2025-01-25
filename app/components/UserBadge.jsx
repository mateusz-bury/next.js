'use client';

import { useAuth } from '@/app/lib/AuthContext';

export default function UserBadge() {
  const { user } = useAuth();

  if (!user) {
    return null; 
  }

  const { displayName, photoURL } = user;

  return (
    <div className="flex items-center space-x-4">
      <p className="text-white text-sm font-medium">{displayName || 'Nieznany użytkownik'}</p>
      <img
        src={photoURL || ''}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
  );
}
