"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // your auth context
import { db } from "@/firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth(); // current logged in user
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load user profile from Firestore on mount
  useEffect(() => {
    if (!user?.uid) return;

    async function fetchProfile() {
      setLoading(true);
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            name: data.name || "",
            email: data.email || user.email || "",
            university: data.university || "",
            address: data.address || "",
          });
        } else {
          // No data, initialize with user email & empty others
          setProfileData({
            name: user.displayName || "",
            email: user.email || "",
            university: "",
            address: "",
          });
        }
      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  // Handle input changes during editing
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Save updated profile data to Firestore
  async function handleSave() {
    setError(null);
    setSuccess(null);

    if (!user?.uid) {
      setError("User not authenticated.");
      return;
    }

    if (!profileData.name.trim() || !profileData.email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, profileData, { merge: true });
      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError("Failed to save profile.");
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading profile...</div>;
  }

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-green-700">My Profile</h1>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded">{success}</div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1 text-black" htmlFor="name">
            Name
          </label>
          {editing ? (
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
              placeholder="Your name"
            />
          ) : (
            <p className="text-gray-700">{profileData.name || "Not set"}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1 text-black" htmlFor="email">
            Email
          </label>
          {editing ? (
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
              placeholder="Your email"
            />
          ) : (
            <p className="text-gray-700">{profileData.email || "Not set"}</p>
          )}
        </div>

        {/* University */}
        <div>
          <label className="block font-medium mb-1 text-black" htmlFor="university">
            University
          </label>
          {editing ? (
            <input
              type="text"
              id="university"
              name="university"
              value={profileData.university}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
              placeholder="Your university"
            />
          ) : (
            <p className="text-gray-700">{profileData.university || "Not set"}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1 text-black" htmlFor="address">
            Address
          </label>
          {editing ? (
            <textarea
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
              placeholder="Your address"
              rows={3}
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{profileData.address || "Not set"}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {editing ? (
          <>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              type="button"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            type="button"
          >
            Edit
          </button>
        )}
      </div>
    </main>
  );
}