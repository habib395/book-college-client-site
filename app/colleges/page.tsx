"use client";

import { useGetCollegesQuery } from "@/redux/collegeApi";
import Link from "next/link";

export default function Colleges() {
  const { data: colleges, isLoading, error } = useGetCollegesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading colleges</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colleges?.map((college: any) => (
        <div key={college._id} className="p-4 shadow rounded bg-white">
          <img src={college.image} alt={college.name} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{college.name}</h2>
          <p>Rating: {college.rating}</p>
          <p>Admission Date: {college.admissionDates}</p>
          <p>Research Papers: {college.research}</p>
          <Link
              href={`/colleges/${college._id}`}
              className="inline-block mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Details
            </Link>
        </div>
      ))}
    </div>
  );
}