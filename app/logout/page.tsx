"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuth, signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase.config"

export default function Logoutpage() {
    const router = useRouter()

    useEffect(() => {
        signOut(auth)
        .then(() => {
            router.push("/login")
        })
        .catch((error) =>{
            console.error("Logout failed:", error)
        })
    },[router])
    return <p>Logging you out...</p>
}
