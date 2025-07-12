"use client";

import { useState } from "react";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useAddAdmissionMutation } from "@/redux/admissionApi";

export default function AdmissionPage() {
  const { data: colleges, isLoading: loadingColleges } = useGetCollegesQuery();
  const [addAdmission] = useAddAdmissionMutation();

  const [formData, setFormData] = useState({
    collegeId: "",
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAdmission(formData).unwrap();
      alert("Admission submitted successfully!");
      setFormData({
        collegeId: "",
        name: "",
        subject: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        image: "",
      });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  if (loadingColleges)
    return <p className="text-center text-gray-600 py-8">Loading colleges...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-emerald-700">
        Admission Form
      </h1>

      {/* Show college list only if no college selected */}
      {!formData.collegeId && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Select a College:
          </h2>
          <ul className="space-y-3">
            {colleges?.map((college: any) => (
              <li
                key={college._id}
                className="cursor-pointer text-emerald-700 hover:underline text-lg"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, collegeId: college._id }))
                }
              >
                {college.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show form only if a college is selected */}
      {formData.collegeId && (
        <>
          <button
            type="button"
            onClick={() =>
              setFormData({
                collegeId: "",
                name: "",
                subject: "",
                email: "",
                phone: "",
                address: "",
                dob: "",
                image: "",
              })
            }
            className="mb-6 text-sm text-gray-600 underline hover:text-gray-800"
          >
            &larr; Back to College List
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Candidate Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-gray-700"
              >
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 font-semibold text-gray-700"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Intended subject/major"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 font-semibold text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block mb-2 font-semibold text-gray-700"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 font-semibold text-gray-700"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 font-semibold text-gray-700"
              >
                Image URL (Optional)
              </label>
              <input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-md hover:bg-emerald-700 transition"
            >
              Submit Admission
            </button>
          </form>
        </>
      )}
    </div>
  );
}