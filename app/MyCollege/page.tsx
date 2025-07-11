"use client";

import { useGetAdmissionsQuery } from "@/redux/admissionApi";
import { useAddReviewMutation } from "@/redux/reviewApi";
import { useState } from "react";

export default function MyCollegePage() {
  const userEmail = "habib@gmail.com"; // Replace with real auth if available
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

  if (isLoading) return <p>Loading college info...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My College</h1>

      {admissions?.length > 0 ? (
        admissions.map((admission: any) => (
          <div key={admission._id} className="bg-white shadow p-4 rounded mb-8">
            <img
              src={admission.image}
              alt={admission.name}
              className="w-40 h-40 object-cover rounded mb-2"
            />
            <p><strong>Candidate Name:</strong> {admission.name}</p>
            <p><strong>College ID:</strong> {admission.collegeId}</p>
            <p><strong>Subject:</strong> {admission.subject}</p>
            <p><strong>Email:</strong> {admission.email}</p>
            <p><strong>Phone:</strong> {admission.phone}</p>

            {/* Review Form */}
            <form
              onSubmit={(e) => handleSubmit(e, admission)}
              className="bg-gray-50 mt-4 p-4 rounded space-y-4"
            >
              <h2 className="text-lg font-semibold">Leave a Review</h2>
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                min={1}
                max={5}
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: +e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Your comment"
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        ))
      ) : (
        <p>No admission record found.</p>
      )}
    </div>
  );
}