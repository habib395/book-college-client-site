"use client";

import { useGetAdmissionsQuery } from "@/redux/admissionApi";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useAddReviewMutation } from "@/redux/reviewApi";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function MyCollegeContent() {
  const { user } = useAuth();
  const userEmail = user?.email;

  const { data: colleges } = useGetCollegesQuery();
  const { data: admissions, isLoading } = useGetAdmissionsQuery(userEmail, {
    skip: !userEmail,
  });

  const [addReview] = useAddReviewMutation();
  const [review, setReview] = useState({ rating: 0, comment: "" });

  const handleSubmit = async (e: React.FormEvent, admission: any) => {
    e.preventDefault();
    if (!review.rating || !review.comment) return alert("Please fill all fields");

    try {
      await addReview({
        ...review,
        candidateName: admission.name,
        collegeId: admission.collegeId,
        collegeName: admission.collegeName,
      }).unwrap();
      alert("Review submitted!");
      setReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  if (isLoading)
    return <p className="text-center py-8 text-gray-600">Loading college info...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-emerald-700">My College</h1>

      {admissions?.length > 0 ? (
        admissions.map((admission: any) => {
          const matchedCollege = colleges?.find(
            (c) => c._id === admission.collegeId
          );

          return (
            <div
              key={admission._id}
              className="bg-white shadow-lg rounded-lg p-6 mb-10 hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {matchedCollege?.image && (
                  <img
                    src={matchedCollege.image}
                    alt={matchedCollege.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl flex-shrink-0"
                    loading="lazy"
                  />
                )}
                
                <div className="flex-1 space-y-1 text-gray-800">
                  <p className="italic text-gray-600 mb-3">
                    {matchedCollege?.name || "College not found"}
                  </p>
                  <p><strong>Candidate Name:</strong> {admission.name}</p>
                  <p><strong>College ID:</strong> {admission.collegeId}</p>
                  <p><strong>Subject:</strong> {admission.subject}</p>
                  <p><strong>Email:</strong> {admission.email}</p>
                  <p><strong>Phone:</strong> {admission.phone}</p>
                </div>
                <img
                  src={admission.image}
                  alt={admission.name}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                />
                
              </div>

              {/* Review Form */}
              <form
                onSubmit={(e) => handleSubmit(e, admission)}
                className="bg-gray-50 mt-6 p-6 rounded-lg space-y-5"
              >
                <h2 className="text-xl font-semibold text-emerald-700 mb-2">Leave a Review</h2>

                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1–5)"
                  min={1}
                  max={5}
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: +e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                  required
                />

                <textarea
                  placeholder="Your comment"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none"
                  rows={4}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-md hover:bg-emerald-700 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No admission record found.</p>
      )}
    </div>
  );
}

export default function MyCollegePage() {
  return (
    <ProtectedRoute>
      <MyCollegeContent />
    </ProtectedRoute>
  );
}