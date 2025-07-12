"use client";
import { useGetCollegeByIdQuery } from "@/redux/collegeApi";
import { useParams } from "next/navigation";

export default function CollegeDetails() {
  const { id } = useParams();
  const { data: college, isLoading, error } = useGetCollegeByIdQuery(id as string);

  if (isLoading) return <p>Loading...</p>;
  if (error || !college) return <p>College not found.</p>;

  return (
    <div className="p-4">
      <h1>{college.name}</h1>
      <img src={college.image} alt={college.name} className="w-full h-60 object-cover" />
      <p><strong>Rating:</strong> {college.rating}</p>
      <p><strong>Admission Date:</strong> {college.admissionDates}</p>
      <p><strong>Research:</strong> {college.research}</p>
    </div>
  );
}