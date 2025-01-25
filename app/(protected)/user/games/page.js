'use client';

import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/lib/AuthContext';
import { doc, deleteDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';


export default function GamesPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [newGames, setNewGames] = useState({ title: '', type: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const deleteGames = async (gamesId) => {
    setError('');
    setSuccess('');
  
    if (!gamesId) {
      setError('Nie można usunąć gry bez ID.');
      return;
    }
  
    try {

      await deleteDoc(doc(db, 'Games', gamesId));
  
      setGames((prevGames) => prevGames.filter((games) => games.id !== gamesId));
  
      setSuccess('Gra została usunięta.');
    } catch (err) {
      console.error('Error deleting games:', err.message);
  
      if (err.code === 'permission-denied') {
        setError('Nie masz uprawnień do usunięcia tej gry.');
      } else {
        setError('Nie udało się usunąć gry.');
      }
    }
};
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const q = query(collection(db, 'Games'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const gamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gamesData);
      } catch (err) {
        console.error('Error fetching games:', err.message);
      }
    };

    if (user) {
      fetchGames();
    }
  }, [user]);

  
  const addGames = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
        setError('Musisz być zalogowany, aby dodać gre.');
        return;
      }
      

    if (!newGames.title || !newGames.type) {
        setError('Wszystkie pola są wymagane.');
        return;
     }
    
    try {
      await addDoc(collection(db, 'Games'), {
        ...newGames,
        userId: user.uid, 
      });
      setSuccess('Gra została dodana.');
      setNewGames({ title: '', type: ''});
      setShowForm(false); 
      const updatedGames = [...games, { ...newGames }];
      setGames(updatedGames);
    } catch (err) {
      console.error('Error adding games:', err.message);
      setError('Nie udało się dodać gry.');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Twoje gry</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 " name="Dodaj"
        >
          Dodaj gre
        </button>
      )}

    
      {showForm && (
        <form onSubmit={addGames} className="space-y-4">
          <h2 className="text-lg font-bold">Dodaj gre</h2>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Tytuł
            </label>
            <input
              id="title"
              value={newGames.title}
              onChange={(e) => setNewGames({ ...newGames, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Typ
            </label>
            <input
              id="type"
              value={newGames.type}
              onChange={(e) => setNewGames({ ...newGames, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              required
            />
          </div>
         
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Dodaj gre
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-bold">Lista gier</h2>
        {games.length === 0? (
          <p>Nie masz jeszcze żadnych gier.</p>
        ) : (
            games.map((games) => (
                <div key={games.id} className="p-4 border rounded-md shadow-sm mt-4">
                  <h3>
                    {games.make} {games.model}
                  </h3>
                  
                  <button
          onClick={() => deleteGames(games.id)}
          className="bg-red-600 text-white py-1 px-2 rounded-md mt-2 hover:bg-red-700"
        >
          Usuń
        </button>
                </div>
             ))
        )}
      </div>
    </div>
  );
}
