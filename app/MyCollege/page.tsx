"use client";

import { useGetAdmissionsQuery } from "@/redux/admissionApi";
import { useAddReviewMutation } from "@/redux/reviewApi";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function MyCollegePage() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const { data: admissions, isLoading } = useGetAdmissionsQuery(userEmail);
  const [addReview] = useAddReviewMutation();

  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

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
        admissions.map((admission: any) => (
          <div
            key={admission._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-10 hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={admission.image}
                alt={admission.name}
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
              <div className="flex-1 space-y-1 text-gray-800">
                <p>
                  <strong>Candidate Name:</strong> {admission.name}
                </p>
                <p>
                  <strong>College ID:</strong> {admission.collegeId}
                </p>
                <p>
                  <strong>Subject:</strong> {admission.subject}
                </p>
                <p>
                  <strong>Email:</strong> {admission.email}
                </p>
                <p>
                  <strong>Phone:</strong> {admission.phone}
                </p>
              </div>
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
                placeholder="Rating (1-5)"
                min={1}
                max={5}
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: +e.target.value })}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <textarea
                placeholder="Your comment"
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        ))
      ) : (
        <p className="text-center text-gray-500">No admission record found.</p>
      )}
    </div>
  );
}