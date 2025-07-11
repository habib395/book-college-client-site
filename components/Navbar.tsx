"use client"

import Link from "next/link"

export default function Navbar(){

    return (
        <nav className="bg-green-400">
            <ul className="flex justify-between items-center gap-4 px-10 py-4">
          <Link href="/Home"
              className="hover:text-gray-200 transition duration-300 block">
                home
          </Link>
          <Link href="/College"
              className="hover:text-gray-200 transition duration-300 block">
                College
          </Link>
          <Link href="/Admission"
              className="hover:text-gray-200 transition duration-300 block">
                Admission
          </Link>
          <Link href="/MyCollege"
              className="hover:text-gray-200 transition duration-300 block">
                My College
          </Link>
          </ul>
        </nav>
    )
}