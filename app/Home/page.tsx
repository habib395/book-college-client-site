"use client";
import { useGetReviewsQuery } from "@/redux/reviewApi";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useState, useEffect } from "react";
import CollegeCard from "@/components/CollegeCard";

export default function ReviewsSection() {
  const { data: colleges, isLoading, error } = useGetCollegesQuery();
  const { data: reviews } = useGetReviewsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<typeof colleges>([]);

  useEffect(() => {
    if (!colleges) {
      setFilteredColleges([]);
      return;
    }

    if (searchTerm.trim() === "") {
      setFilteredColleges(colleges);
    } else {
      setFilteredColleges(
        colleges.filter((college) =>
          college.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      );
    }
  }, [searchTerm, colleges]);

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div>
      <section className="p-4 bg-gray-100">
        <input
          type="text"
          placeholder="Search for a college name..."
          className="w-full p-3 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredColleges?.length > 0 ? (
            filteredColleges?.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))
          ) : (
            <p>No colleges found.</p>
          )}
        </div>
      </section>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews?.map((r) => (
            <div key={r._id} className="p-4 shadow rounded bg-white">
              <p className="font-bold">
                {r.candidateName} - {r.collegeName}
              </p>
              <p>⭐ Rating: {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}