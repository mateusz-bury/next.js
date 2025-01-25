'use client';
import { useForm } from 'react-hook-form';
import { auth } from '@/app/lib/firebase'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {image} from '@/boardGames.jpg'
import Image from 'next/image';

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log('User Registered:', userCredential.user);
      setSuccessMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      sendEmailVerification(user)
        .then(() => {
          console.log('Verification email sent');
        })
        .catch((error) => {
          console.error('Verification email error:', error);
        });
        router.push('/user/verify');
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrorMessage('Rejestracja nie powiodła się: ' + error.message);
    }
    
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src = {image}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Zarejestruj się już teraz!
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500"></p>
            {successMessage && (
              <div className="mt-4 text-green-600 bg-green-100 p-4 rounded">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 text-red-600 bg-red-100 p-4 rounded">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                  Twoje imię podróżniku:
                </label>
                <input
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'Imię jest wymagane',
                    },
                  })}
                  type="text"
                  id="FirstName"
                  name="firstName"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm"
                />
                {errors.firstName && <p className="text-red-700 mt-3">{errors.firstName.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Adres Twojej sowy podróżniku:
                </label>
                <input
                  {...register('email', {
                    required: 'Adres email jest wymagany',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Niepoprawny format adresu email',
                    },
                  })}
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm"
                />
                {errors.email && <p className="text-red-700 mt-3">{errors.email.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Wprowadź zakęlcie otwierające:
                </label>
                <input
                  {...register('password', {
                    required: 'Hasło jest wymagane',
                    minLength: {
                      value: 6,
                      message: 'Hasło musi mieć co najmniej 6 znaków',
                    },
                  })}
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm"
                />
                {errors.password && <p className="text-red-700 mt-3">{errors.password.message}</p>}
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  Tworząc konto, akceptujesz&nbsp;
                  <a href="#" className="text-gray-700 underline">regulamin</a>&nbsp;i&nbsp;
                  <a href="#" className="text-gray-700 underline">politykę prywatności</a>.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Zarejestruj
                </button>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Masz już konto?&nbsp;
                  <a href="/user/login" className="text-gray-700 underline">Zaloguj się</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default RegisterForm;
