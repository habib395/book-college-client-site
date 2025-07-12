"use client";


import "../globals.css"
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { FirebaseError } from "firebase/app";

type UserProfile = {
  name: string;
  email: string;
  university: string;
  address: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Assert and merge with default structure just in case
          const data = docSnap.data() as Partial<UserProfile>;
          setProfile({
            name: data.name || user.displayName || "",
            email: data.email || user.email || "",
            university: data.university || "",
            address: data.address || "",
          });
        } else {
          // New user profile fallback
          setProfile({
            name: user.displayName || "",
            email: user.email || "",
            university: "",
            address: "",
          });
        }
      } catch (error) {
        if (error instanceof FirebaseError && error.code === "unavailable") {
          alert("Network error: Please check your internet connection.");
        } else {
          console.error("Firestore error:", error);
          alert("Failed to fetch profile data.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), profile);
      alert("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to view your profile.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-4">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
        />
        <input
          name="email"
          value={profile.email}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
        <input
          name="university"
          value={profile.university}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border px-3 py-2 rounded"
          placeholder="University"
        />
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border px-3 py-2 rounded"
          placeholder="Address"
        />
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded w-full"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}