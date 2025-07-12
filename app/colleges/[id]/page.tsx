"use client";
import { useGetCollegeByIdQuery } from "@/redux/collegeApi";
import { useParams } from "next/navigation";

export default function CollegeDetails() {
  const { id } = useParams();
  const { data: college, isLoading, error } = useGetCollegeByIdQuery(id as string);

  if (isLoading) return <p className="text-center py-8 text-lg font-medium">Loading college details...</p>;
  if (error || !college) return <p className="text-center text-red-500 py-8">College not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header Image */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-72 object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>

      {/* College Info */}
      <div className="mt-8 bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-3xl font-bold text-emerald-700">{college.name}</h1>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">⭐ Rating:</span> {college.rating}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">🎓 Admission Dates:</span> {college.admissionDates}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">📖 Admission Process:</span>{" "}
          {college.admissionProcess || "Not provided"}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">📅 Events:</span>{" "}
          {college.events?.join(", ") || "Not available"}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">🧪 Research:</span> {college.research}
        </p>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-gray-800">🏅 Sports:</span>{" "}
          {college.sports?.join(", ") || "Not available"}
        </p>
      </div>
    </div>
  );
}