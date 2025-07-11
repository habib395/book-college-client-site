"use client";
import { useGetReviewsQuery } from "@/redux/reviewApi";

export default function ReviewsSection() {
  const { data: reviews, isLoading } = useGetReviewsQuery();

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews?.map((r, i) => (
          <div key={i} className="p-4 shadow rounded bg-white">
            <p className="font-bold">{r.candidateName} - {r.collegeName}</p>
            <p>⭐ Rating: {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}