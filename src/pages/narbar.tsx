import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

import { Palette } from "lucide-react";

export default function NavBar(){
    const router = useRouter();

    const handleAddBalanceClick = () => {
        router.push('/addbalance'); // Redirects to the /dank page
    };
    const { data: sessionData } = useSession();
    if (sessionData){
      const balance = api.credits.getCredits.useQuery();
    }

    const [ mobileOpen, mobileStatus] = useState(false);

    const openMenu = () =>{
        mobileStatus(!mobileOpen);
    }

    return (
        <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            <div className="w-[200px]">
              <Link href="/" className="flex items-center space-x-2">
                <Palette className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-lg md:text-xl font-bold">CartoonAI</span>
              </Link>
            </div>
    
            <div className="flex items-center gap-6 md:gap-10">
              {!sessionData && 
              <Link 
                href="#pricing" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Pricing
              </Link>}
              {!sessionData && <Link 
                href="#faq" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                FAQ
              </Link>}
              {sessionData && <Link 
                href="/addbalance" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Add Balance
              </Link>}
              {sessionData && <Link 
                href="/generate" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
              Generate Image
              </Link>}
            </div>
    
            <div className="w-[200px] flex justify-end">
            <div className="flex flex-col gap-4">
                                <button className="btn btn-secondary btn-block group !btn-block !btn-sm" onClick={sessionData ? () => void signOut() : () => void signIn()}> {sessionData ? "Sign out" : "Sign in"}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
                            </div>
            </div>
          </div>
        </nav>
      );
}