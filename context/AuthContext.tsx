"use client"

import { auth, googleProvider } from "@/firebase/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";


const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    console.log(user)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const register = (email: string, password: string) => 
        createUserWithEmailAndPassword(auth, email, password)
    const login = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password)
    const logout = () => signOut(auth)
    const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)

    const loginWithGoogle = async() => {
        try {
            await signInWithPopup(auth, googleProvider)
            router.push("/");
          } catch (err) {
            alert("Login failed");
          }
    }
    
    return(
        <AuthContext.Provider value={{ user, loading, register, login, logout, loginWithGoogle, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)