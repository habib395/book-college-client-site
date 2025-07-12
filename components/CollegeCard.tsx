import Link from "next/link";

export default function CollegeCard({ college }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-emerald-700">{college.name}</h3>

          <p className="text-gray-700">
            <span className="font-medium text-gray-800">🎓 Admission Dates:</span>{" "}
            {college.admissionDates}
          </p>

          <p className="text-gray-700">
            <span className="font-medium text-gray-800">📅 Events:</span>{" "}
            {college.events?.length > 0
              ? college.events.map(event => event.name || event).join(", ")
              : "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-medium text-gray-800">📚 Research:</span>{" "}
            {college.research || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-medium text-gray-800">🏅 Sports:</span>{" "}
            {college.sports?.length > 0 ? college.sports.join(", ") : "N/A"}
          </p>
        </div>

        <div className="mt-4">
          <Link
            href={`/colleges/${college._id}`}
            aria-label={`View details for ${college.name}`}
            className="inline-block text-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}