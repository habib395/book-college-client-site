"use client";

import { useState } from "react";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useAddAdmissionMutation } from '@/redux/admissionApi';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admission Form</h1>

      {loadingColleges ? (
        <p>Loading colleges...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
          <div>
            <label className="block font-semibold mb-1">Select College:</label>
            <select
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Choose a College --</option>
              {colleges?.map((college: any) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Candidate Name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Admission
          </button>
        </form>
      )}
    </div>
  );
}