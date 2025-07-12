"use client";

import { useGetReviewsQuery } from "@/redux/reviewApi";
import { useGetCollegesQuery } from "@/redux/collegeApi";
import { useState, useEffect } from "react";
import CollegeCard from "@/components/CollegeCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ReviewsSection() {
  const { data: colleges, isLoading } = useGetCollegesQuery();
  const { data: reviews } = useGetReviewsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<typeof colleges>([]);

  const galleryImages = [
    "/images/gallery/graduates1.jpg",
    "/images/gallery/graduates2.jpg",
    "/images/gallery/graduates3.jpg",
  ];

  const researchLinks = [
    { title: "AI in Higher Education", url: "https://example.com/ai-research" },
    { title: "Renewable Energy Campus Projects", url: "https://example.com/energy" },
    { title: "Neuroscience Discoveries", url: "https://example.com/neuro" },
  ];

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
      {/* 🔄 Top Slider Section */}
      <section className="bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
    <Carousel
      showArrows={true}
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
    >
      <div>
        <img
          src="/images/gallery/graduates2.jpg"
          alt="Slider 1"
          className="w-full object-cover rounded-xl h-48 sm:h-64 md:h-80 lg:h-96"
        />
        <p className="legend">Top Graduates 2024</p>
      </div>
      <div>
        <img
          src="/images/gallery/graduates1.jpg"
          alt="Slider 2"
          className="w-full object-cover rounded-xl h-48 sm:h-64 md:h-80 lg:h-96"
        />
        <p className="legend">Campus Event Highlights</p>
      </div>
      <div>
        <img
          src="/images/gallery/graduates3.jpg"
          alt="Slider 3"
          className="w-full object-cover rounded-xl h-48 sm:h-64 md:h-80 lg:h-96"
        />
        <p className="legend">Explore Our Colleges</p>
      </div>
    </Carousel>
  </div>
</section>

      {/* Search and College Cards */}
      <section className="px-6">
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
            {filteredColleges?.length > 0 ? (
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

      {/* Graduate Gallery */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
            🎓 Graduate Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
                aria-label={`Graduate ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`Graduate ${i + 1}`}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers */}
      <section className="bg-gray-100 py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-800">
            📚 Recommended Research Papers
          </h2>
          <ul className="list-disc list-inside space-y-5 text-lg text-gray-700 text-left max-w-xl mx-auto">
            {researchLinks.map((paper, i) => (
              <li key={i}>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 hover:underline font-medium transition"
                >
                  {paper.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
            🌟 Student Reviews
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {reviews?.map((r) => (
              <article
                key={r._id}
                className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-emerald-600 text-lg">{r.candidateName}</h3>
                  <span className="text-yellow-500 text-xl font-bold">⭐ {r.rating}</span>
                </div>
                <p className="italic text-gray-600 mb-3">{r.collegeName}</p>
                <p className="text-gray-700 text-base leading-relaxed">{r.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}