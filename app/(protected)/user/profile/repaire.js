'use client';
 
import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';
 
export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setError('Użytkownik nie jest zalogowany.');
        setLoading(false);
        router.push('/user/login');
        return;
      }
 
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
 
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          setError('Nie znaleziono danych użytkownika.');
        }
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err.message);
        setError('Wystąpił problem podczas pobierania danych.');
      } finally {
        setLoading(false);
      }
    };
 
    fetchProfileData();
  }, [user]);
 
  const handleSave = async () => {
    if (!user) return;
 
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, profileData);
      setIsEditing(false);
    } catch (err) {
      console.error('Błąd podczas zapisywania danych:', err.message);
      setError('Nie udało się zapisać zmian.');
    }
  };
 
  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
 
  if (loading) {
    return <p>Ładowanie danych...</p>;
  }
 
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
 
  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profil użytkownika</h1>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Imię</label>
            <input
              value={profileData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={profileData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Miasto</label>
            <input
              value={profileData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ulica</label>
            <input
              value={profileData.street || ''}
              onChange={(e) => handleChange('street', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Kod pocztowy</label>
            <input
              value={profileData.zipCode || ''}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Zdjęcie profilowe (URL)</label>
            <input
              value={profileData.photoURL || ''}
              onChange={(e) => handleChange('photoURL', e.target.value)}
              className="w-full border rounded-md p-2 bg-gray-400"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Zapisz
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Anuluj
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Imię:</strong> {profileData?.name || 'Brak danych'}
          </p>
          <p>
            <strong>Email:</strong> {profileData?.email || 'Brak danych'}
          </p>
          <p>
            <strong>Miasto:</strong> {profileData?.city || 'Brak danych'}
          </p>
          <p>
            <strong>Ulica:</strong> {profileData?.street || 'Brak danych'}
          </p>
          <p>
            <strong>Kod pocztowy:</strong> {profileData?.zipCode || 'Brak danych'}
          </p>
          <p>
            <strong>Zdjęcie profilowe:</strong>
          </p>
          <img
            src={profileData?.photoURL || 'https://via.placeholder.com/150'}
            alt="Zdjęcie profilowe"
            className="w-32 h-32 rounded-full"
          />
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
          >
            Edytuj
          </button>
        </div>
      )}
    </div>
  );
}
 