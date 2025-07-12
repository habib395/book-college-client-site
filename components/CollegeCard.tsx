import Link from "next/link";

const CollegeCard = ({ college }: { college: any }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <img src={college.image} alt={college.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{college.name}</h2>
      <p>📅 Admission: {college.admissionDates}</p>
      <p>⭐ Ratings: {college.rating}</p>
      <Link href={`/colleges/${college._id}`}>
        <button className="bg-blue-500 text-white mt-2 px-4 py-1 rounded">
          Details
        </button>
      </Link>
    </div>
  );
};

export default CollegeCard;