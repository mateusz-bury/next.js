'use client';

import { useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function VerifyEmail() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      signOut(auth); 
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold text-red-600">
        Twój email nie został zweryfikowany.
      </h1>
      <p className="text-gray-700 mt-2">
        Kliknij w link, który został wysłany na Twój adres email:{" "}
        <strong>{user?.email || "Nieznany email"}</strong>
      </p>
      <p className="text-gray-500 mt-4">
        Jeśli nie otrzymałeś wiadomości, sprawdź folder Spam lub spróbuj ponownie zarejestrować konto.
      </p>
    </div>
  );
}
