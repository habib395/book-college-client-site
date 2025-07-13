"use client";

import { useGetCollegesQuery } from "@/redux/collegeApi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Colleges() {
  const { data: colleges, isLoading, error } = useGetCollegesQuery();
  const { user } = useAuth(); // 👈 Add this

  if (isLoading)
    return <p className="text-center py-10 text-lg">Loading colleges...</p>;
  if (error)
    return <p className="text-center text-red-600 py-10">Error loading colleges.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-10">
        🎓 Available Colleges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges?.map((college: any) => (
          <div
            key={college._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-1">
              <div className="space-y-2 flex-1">
                <h2 className="text-xl font-semibold text-emerald-800">
                  {college.name}
                </h2>
                <p className="text-gray-600">
                  <strong>⭐ Rating:</strong> {college.rating}
                </p>
                <p className="text-gray-600">
                  <strong>Admission Date:</strong> {college.admissionDates}
                </p>
                <p className="text-gray-600">
                  <strong>Research Papers:</strong> {college.research}
                </p>
              </div>

              <div className="mt-4">
                {user ? (
                  <Link
                    href={`/colleges/${college._id}`}
                    className="inline-block text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition"
                  >
                    Details
                  </Link>
                ) : (
                  <p className="text-center italic text-right text-sm text-emerald-500">Login to see details</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}