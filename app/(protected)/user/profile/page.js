'use client';

import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/app/lib/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    updateProfile(user, {
      displayName,
      photoURL,
    })
      .then(() => {
        setMessage('Profil został zaktualizowany pomyślnie.');
        console.log('Profile updated');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error updating profile:', error.message);
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil użytkownika</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium">
            Nazwa użytkownika
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100" 
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Adres email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ''}
            readOnly
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100" 
          />
        </div>

        <div>
          <label htmlFor="photoURL" className="block text-sm font-medium">
            Zdjęcie profilowe (URL)
          </label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Zaktualizuj profil
        </button>
      </form>
    </div>
  );
}
