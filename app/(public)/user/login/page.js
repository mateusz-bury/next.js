'use client';
import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { 
  browserSessionPersistence, 
  setPersistence, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from "@/app/lib/firebase";
import { useRouter } from 'next/navigation';

function LoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
     
      setErrorMessage("");
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("User Logged!", userCredential.user);
      router.push('/user/profile');
      console.log("Zalogowano użytkownika:", userCredential.user);
    } catch (error) {
      console.error("Login error:", error.message);
      console.error("Błąd logowania:", error.message);
      setErrorMessage("Nieprawidłowy email lub hasło. Spróbuj ponownie.");
    }
  };

  return (
    <section className="bg-gray-800">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="Planszówki"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl bg-gray-900 p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl md:text-5xl text-center">
          Zaloguj się na konto 😀
        </h1>

        {errorMessage && (
          <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-lg shadow">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-300"
            >
              Podaj Adres mailowy
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Musisz wpisać adres mailowy",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Adres email ma niepoprawny format",
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
              Wprowadź hasło
            </label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Podaj hasło",
                },
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

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-lg bg-yellow-500 px-12 py-3 text-lg font-medium text-gray-900 transition hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-400 active:bg-yellow-700"
            >
              Login
            </button>

            <p className="mt-4 text-sm text-gray-400 sm:mt-0">
              Nie masz jeszcze konta?{" "}
              <a
                href="/user/register"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Rejestracja
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

export default LoginForm;
