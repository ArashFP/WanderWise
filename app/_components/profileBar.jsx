'use client'
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProfileBar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const formatEmail = (email) => {
    const [name] = email.split('@');
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative flex items-center space-x-4 p-2 bg-BrunswickGreen rounded-lg shadow-md">
      {user ? (
        <div className="flex items-center space-x-2">
          <p className="text-lg text-timberwolf font-semibold cursor-pointer">
            {formatEmail(user.email)}
          </p>
          <i className="fas fa-bars cursor-pointer text-timberwolf" onClick={toggleDropdown}></i>
        </div>
      ) : (
        <Link href="/sign-in">
          <button className="p-2 bg-BrunswickGreen text-white rounded-lg">
            Log In
          </button>
        </Link>
      )}
      {dropdownVisible && (
        <div className="absolute right-0 top-11 w-full bg-fernGreen border border-gray-200 rounded-lg shadow-lg">
          <button
            className="w-full rounded-xl text-timberwolf text-sm px-4 py-2 text-left bg-fernGreen"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <Link href="/profile">
            <button className="bg-fernGreen text-timberwolf px-4 py-2 text-sm rounded-lg">
              Profile
            </button>
          </Link>
          <Link href="/search_page">
            <button className="bg-fernGreen text-timberwolf px-4 py-2 text-sm rounded-lg">
              Search
            </button>
          </Link>
          <Link href="/app">
            <button className="bg-fernGreen text-timberwolf px-4 py-2 text-sm rounded-lg">
              Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileBar;