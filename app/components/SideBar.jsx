"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

function SideBar({ children }) {
  const { user, loading } = useAuth() || {}; 
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/user/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label htmlFor="my-drawer-2" className="btn btn-accent bg-slate-500 drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/user/login">Login</Link>
              </li>
              <li>
                <Link href="/user/register">Rejestracja</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/user/profile">Profil</Link>
              </li>
              <li>
                <Link href="/user/changepassword">Zmiana hasła</Link>
              </li>
              <li>
                <Link href="/user/games">Gry planszowe</Link>
              </li>
              <li>
                <button className="btn btn-error" onClick={() => auth.signOut()}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
