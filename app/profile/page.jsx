'use client'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/firebase/config";
import { Navbar } from "../_components/navbar_mobile";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Settings, Check } from 'lucide-react'; // Import the Settings icon from lucide-react
import '@fortawesome/fontawesome-free/css/all.min.css';
import { set } from "react-hook-form";
import { Footer } from "../_components/footer";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User detected:", currentUser);
        try {
          // Query Firestore for the user document with matching UID
          const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserDocRef(userDoc.ref); 
            setUser(userData);
            setNewBio(userData.bio || '');
            setNewLocation(userData.location || '');
            setNewPhone(userData.phone || '');
          } else {
            console.log("No such document!");
          }

          // Fetch profile image
          const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
          const downloadURL = await getDownloadURL(storageRef);
          setProfileImage(downloadURL);
        } catch (error) {
          console.error("Error fetching user data or profile image: ", error);
        }
      } else {
        console.log("No user detected");
        setUser(null);
        setProfileImage(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImage(downloadURL);
    }
  };

  const handleSaveBio = async () => {
    if (newBio && userDocRef) {
      await setDoc(userDocRef, { bio: newBio }, { merge: true });
      setUser({ ...user, bio: newBio });
      setIsEditingBio(false);
    }
  };
  const handleSaveLocation = async () => {
    if (newLocation && userDocRef) {
      await setDoc(userDocRef, { location: newLocation }, { merge: true });
      setUser({ ...user, location: newLocation });
      setIsEditingLocation(false);
    }
  };
  const handleSavePhone = async () => {
    if (newPhone && userDocRef) {
      await setDoc(userDocRef, { phone: newPhone }, { merge: true });
      setUser({ ...user, phone: newPhone });
      setIsEditingPhone(false);
    }
  }

  return (
    <main className="flex flex-col items-center bg-timberwolf h-screen">
      <img src="/logo.png" alt="Logo" className="top-10 mx-auto mt-3 w-32 h-14" />
      <div className="relative mt-6">
        <div className="w-40 h-40 rounded-full border-4 border-BrunswickGreen bg-timberwolf flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <i className="fa-regular fa-user text-6xl text-fernGreen"></i>
          )}
        </div>
        <Settings
          className="absolute bottom-0 right-0 translate-x-5 translate-y-4 text-iconColor bg-inherit rounded-full p-2 cursor-pointer w-12 h-12"
          onClick={() => document.getElementById('fileInput').click()}
        />
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {user ? (
        <div className="bg-BrunswickGreen flex flex-col gap-3 px-6 mt-7 rounded-xl h-auto">
          <div className="w-64 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-timberwolf">Name</p>
            </div>
            <p className="text-timberwolf">{user.firstName} {user.lastName}</p>
          </div>
          <hr className="bg-timberwolf opacity-50" />
          <div className="w-64 flex flex-col justify-between">
            <div className="flex items-center">
              <p className="text-timberwolf">Bio</p>
              {isEditingBio ? (
                <Check
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={handleSaveBio}
                />
              ) : (
                <Settings
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={() => setIsEditingBio(true)}
                />
              )}
            </div>
            {isEditingBio ? (
              <div className="flex items-center ">
                <textarea
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="bg-fernGreen text-timberwolf p-1 rounded"
                />
              </div>
            ) : (
              <p className="text-timberwolf">{user.bio}</p>
            )}
          </div>
          <hr className="bg-timberwolf opacity-50" />
          <div className="w-64 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-timberwolf">Location</p>
              {isEditingLocation ? (
                <Check
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={handleSaveLocation}
                />
              ) : (
                <Settings
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={() => setIsEditingLocation(true)}
                />
              )}
            </div>
            {isEditingLocation ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="bg-fernGreen text-timberwolf p-1 rounded w-full"
                />
              </div>
            ) : (
              <p className="text-timberwolf">{user.location}</p>
            )}
          </div>
          <hr className="bg-timberwolf opacity-50" />
          <div>
            <div className="bg-BrunswickGreen w-64 flex justify-between">
              <p className="text-timberwolf">Email</p>
              <p className="text-timberwolf">{user.email}</p>
            </div>
          </div>
          <hr className="bg-timberwolf opacity-50" />
          <div className="w-64 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-timberwolf">Phone</p>
              {isEditingPhone ? (
                <Check
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={handleSavePhone}
                />
              ) : (
                <Settings
                  className="text-timberwolf bg-inherit rounded-full p-2 cursor-pointer w-8 h-8"
                  onClick={() => setIsEditingPhone(true)}
                />
              )}
            </div>
            {isEditingPhone ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-fernGreen text-timberwolf p-1 rounded w-full"
                />
              </div>
            ) : (
              <p className="text-timberwolf">{user.phone}</p>
            )}
          </div>
          <hr className="bg-timberwolf opacity-50 mb-6" />
        </div>
        
      ) : (
        <p>No user is signed in.</p>
      )}
      <Navbar />
      <Footer />
    </main>
  );
};

export default ProfilePage;