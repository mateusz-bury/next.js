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
    <section className="bg-gray-800">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl bg-gray-900 p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl md:text-5xl text-center">
          Zarejestruj się już teraz!
        </h1>
        <p className="mt-4 leading-relaxed text-gray-400 text-center">
          Rozpocznij swoją podróż w świecie gier planszowych!
        </p>
        {successMessage && (
          <div className="mt-6 text-green-600 bg-green-100 p-4 rounded-lg shadow">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-lg shadow">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-300"
            >
              Twoje imię podróżniku:
            </label>
            <input
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Imię jest wymagane",
                },
              })}
              type="text"
              id="FirstName"
              name="firstName"
              className="mt-1 w-full rounded-lg border-gray-700 bg-gray-800 text-lg text-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-2">{errors.firstName.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-300"
            >
              Adres Twojej sowy podróżniku:
            </label>
            <input
              {...register("email", {
                required: "Adres email jest wymagany",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Niepoprawny format adresu email",
                },
              })}
              type="email"
              id="Email"
              name="email"
              className="mt-1 w-full rounded-lg border-gray-700 bg-gray-800 text-lg text-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-300"
            >
              Wprowadź zaklęcie otwierające:
            </label>
            <input
              {...register("password", {
                required: "Hasło jest wymagane",
                minLength: {
                  value: 6,
                  message: "Hasło musi mieć co najmniej 6 znaków",
                },
              })}
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-lg border-gray-700 bg-gray-800 text-lg text-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-2">{errors.password.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-400">
              Tworząc konto, akceptujesz&nbsp;
              <a
                href="#"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                regulamin
              </a>
              &nbsp;i&nbsp;
              <a
                href="#"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                politykę prywatności
              </a>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-lg bg-yellow-500 px-12 py-3 text-lg font-medium text-gray-900 transition hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-400 active:bg-yellow-700"
            >
              Zarejestruj
            </button>
            <p className="mt-4 text-sm text-gray-400 sm:mt-0">
              Masz już konto?&nbsp;
              <a
                href="/user/login"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Zaloguj się
              </a>
              .
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
