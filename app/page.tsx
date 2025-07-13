"use client";

import { useGetReviewsQuery } from "@/redux/reviewApi";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useState, useEffect } from "react";
import CollegeCard from "@/components/CollegeCard";


type College = {
  _id: string;
  name: string;
  image: string;
  admissionDates: string;
  events: string[];
  rating: number;
  research: string;
  sports: string[];
};

export default function ReviewsSection() {
  const { data: colleges, isLoading } = useGetCollegesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);

 


  useEffect(() => {
    if (!colleges) return setFilteredColleges([]);
    const term = searchTerm.trim().toLowerCase();
    setFilteredColleges(
      term === ""
        ? colleges
        : colleges.filter((c) => c.name.toLowerCase().includes(term))
    );
  }, [searchTerm, colleges]);

  if (isLoading) return <p className="text-center py-8 text-gray-600">Loading colleges...</p>;

  return (
    <div className="space-y-20">
      {/* Search and College Cards */}
      <section className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 text-emerald-700">
            🔍 Find Your Dream College
          </h2>
          <input
            type="text"
            placeholder="Search for a college name..."
            className="w-full max-w-xl mx-auto block p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredColleges.length > 0 ? (
              filteredColleges?.map((college) => (
                <CollegeCard
                  key={college._id}
                  college={college}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full text-lg font-medium">
                No colleges found.
              </p>
            )}
          </div>
        </div>
      </section>
      </div>
      )
    }