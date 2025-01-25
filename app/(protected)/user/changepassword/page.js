'use client';

import { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useAuth } from '@/app/lib/AuthContext';

export default function ChangePassword() {
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setCurrentPasswordError(false);
        setNewPasswordError(false);
        setConfirmPasswordError(false);
    
        let hasError = false;
    
        if (!currentPassword) {
            setCurrentPasswordError(true);
            setError('Obecne hasło jest wymagane.');
            hasError = true;
        }
        if (newPassword !== confirmPassword) {
            setNewPasswordError(true);
            setConfirmPasswordError(true);
            setError('Hasła są nie zgodne.');
            hasError = true;
        }
        if (newPassword === currentPassword) {
            setNewPasswordError(true);
            setError('Nowe hasło nie może być takie samo jak stare.');
            hasError = true;
        }
        if (newPassword.length < 6) {
            setNewPasswordError(true);
            setError('Nowe hasło musi mieć co najmniej 6 znaków.');
            hasError = true;
        }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordPattern.test(newPassword)) {
            setNewPasswordError(true);
            setError('Hasło musi zawierać co najmniej jedną cyfrę, wielką literę i znak specjalny. oraz mieć co najmniej 6 znaków.');
            hasError = true;
        }
    
        if (hasError) {
            return; 
        }
    
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
    
            await updatePassword(auth.currentUser, newPassword);
    
            setMessage('Hasło zostało zmienione pomyślnie.');
        } catch (err) {
            console.error('Error changing password:', err.message);
            if (err.code === 'auth/wrong-password') {
                setError('Podano niepoprawne obecne hasło.');
            } else if (err.code === 'auth/weak-password') {
                setError('Nowe hasło jest zbyt słabe. Wybierz silniejsze hasło.');
            } else {
                setError('Nie udało się zmienić hasła. Spróbuj ponownie.');
            }
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Zmiana Hasła</h1>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium">
                        Obecne hasło
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm border bg-gray-100 ${
                            currentPasswordError ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'border-gray-300 ring-blue-500 focus:ring-blue-500'
                          }`}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium">
                        Nowe hasło
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm border bg-gray-100 ${
                            newPasswordError ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'border-gray-300 ring-blue-500 focus:ring-blue-500'
                          }`}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">
                        Potwierdź nowe hasło
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm border bg-gray-100 ${
                            confirmPasswordError ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'border-gray-300 ring-blue-500 focus:ring-blue-500'
                          }`}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Zmień Hasło
                </button>
            </form>
        </div>
    );
}