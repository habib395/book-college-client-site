"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Section 1: Logo & Info */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">EduPortal</h2>
            <p className="text-sm">
              Book your dream college services easily and securely with EduPortal.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link href="/Home" className="hover:underline">Home</Link></li>
              <li><Link href="/colleges" className="hover:underline">Colleges</Link></li>
              <li><Link href="/admissions" className="hover:underline">Admission</Link></li>
              <li><Link href="/MyCollege" className="hover:underline">My College</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
            <ul className="space-y-1">
              <li>Email: md.habiburrahmanjwd@gmail.com</li>
              <li>Phone: +880-1742-923499</li>
              <li>Address: Rajshahi, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          © {new Date().getFullYear()} EduPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}