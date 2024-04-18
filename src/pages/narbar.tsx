import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
export default function NavBar(){
    const router = useRouter();

    const handleAddBalanceClick = () => {
        router.push('/dank'); // Redirects to the /dank page
    };
    const { data: sessionData } = useSession();
    const balance = api.credits.getCredits.useQuery();

    const [ mobileOpen, mobileStatus] = useState(false);

    const openMenu = () =>{
        mobileStatus(!mobileOpen);
    }

    return (
        <>
            <div className="relative z-[99999]">
                <header className="z-10 relative bg-transparent">
                    <nav className="container max-w-5xl flex items-center justify-between px-8 py-4 mx-auto" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a className="flex items-center gap-2 shrink-0" title="CartoonTrait Home Page" href="/">
                        <Image
                            src="/icon.png"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                        <span className="font-extrabold text-lg">CartoonTrait</span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" onClick={openMenu}>
                        <span className="sr-only">Open main menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-base-content">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
                        <a className="link link-hover" title="Pricing" href="/#pricing">Pricing</a>
                        <a className="link link-hover" title="FAQ" href="/#faq">FAQ</a>
                    </div>
                    <div className="hidden lg:flex lg:justify-end lg:flex-1">
                        <p className="mr-4 mt-1">{sessionData && `Balance: $${balance.data}`}</p>
                        {sessionData && (
                            <button className="btn btn-sm mr-4 bg-sky-500/75 hover:bg-sky-700/75" onClick={handleAddBalanceClick}>
                                Add Balance
                            </button>
                        )}
                        <button className="btn btn-sm " onClick={sessionData ? () => void signOut() : () => void signIn()}> {sessionData ? "Sign out" : "Sign in"}</button>
                    </div>
                    </nav>
                    <div className={`relative z-50 ${mobileOpen ? '' : 'hidden'}`}>
                        <div className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300">
                            <div className="flex items-center justify-between">
                            <a className="flex items-center gap-2 shrink-0 " title="Zenvoice homepage" href="/">
                                <Image
                                src="/icon.png"
                                width={32}
                                height={32}
                                alt="logo"
                                />
                                <span className="font-extrabold text-lg">CartoonTrait</span>
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5" onClick={openMenu}>
                                <span className="sr-only">Close menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            </div>
                            <div className="flow-root mt-6">
                            <div className="py-4">
                                <div className="flex flex-col gap-y-4 items-start">
                                <a className="link link-hover" title="Pricing" href="/#pricing">Pricing</a>
                                <a className="link link-hover" title="FAQ" href="/#faq">FAQ</a>
                                <a className="link link-hover" title="FAQ" href="/#faq">Add Balance</a>
                                <p>{sessionData && `Balance: $${balance.data}`}</p>
                                </div>
                            </div>
                            <div className="border-b my-4"></div>
                            <div className="flex flex-col gap-4">
                                <button className="btn btn-secondary btn-block group !btn-block !btn-sm" onClick={sessionData ? () => void signOut() : () => void signIn()}> {sessionData ? "Sign out" : "Sign in"}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></button>
                            </div>
                            </div>
                        </div>
                    </div>
                </header>
                </div>

        </>
    )
}