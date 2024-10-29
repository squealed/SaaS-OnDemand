import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function generate(){
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