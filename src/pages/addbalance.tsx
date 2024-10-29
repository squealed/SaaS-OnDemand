import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";


export default function addBalance(){
    const router = useRouter()
    const {data: session, status} = useSession()

    useEffect(() => {
        if (status != "authenticated"){
            router.push("/")
        }
    }),[status,router]
    return (
        <>
            
        
        </>
    );
}