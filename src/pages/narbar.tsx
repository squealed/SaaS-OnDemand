import { signIn, signOut, useSession } from "next-auth/react"
import { userRouter } from "~/server/api/routers/getCredits";
import { api } from "~/utils/api";
export default function NavBar(){
    const { data: sessionData } = useSession();
    const balance = api.credits.getCredits.useQuery();
    return (
        <>
            <div className="relative z-[99999]">
                <header className="z-10 relative bg-transparent">
                    <nav className="container max-w-5xl flex items-center justify-between px-8 py-4 mx-auto" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a className="flex items-center gap-2 shrink-0" title="CartoonTrait Home Page" href="/">
                        <img alt="Zenvoice logo" width="32" height="32" decoding="async" data-nimg="1" className="w-6 md:w-7"  />
                        <span className="font-extrabold text-lg">CartoonTrait</span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
                        <span className="sr-only">Open main menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-base-content">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
                        <a className="link link-hover" title="Pricing" href="/#pricing">Pricing</a>
                        <a className="link link-hover" title="FAQ" href="/#faq">FAQ</a>
                        <a className="link link-hover" title="FAQ" href="/#faq">Add Balance</a>
                        <p>{sessionData && `Balance: $${balance.data}`}</p>
                    </div>
                    <div className="hidden lg:flex lg:justify-end lg:flex-1">
                        <button className="btn btn-sm" onClick={sessionData ? () => void signOut() : () => void signIn()}> {sessionData ? "Sign out" : "Sign in"}</button>
                    </div>
                    </nav>
                    <div className="relative z-50 hidden">
                    <div className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300">
                        <div className="flex items-center justify-between">
                        <a className="flex items-center gap-2 shrink-0 " title="Zenvoice homepage" href="/">
                            <img alt="Zenvoice logo"  width="32" height="32" decoding="async" data-nimg="1" className="w-6" />
                            <span className="font-extrabold text-lg">Zenvoice</span>
                        </a>
                        <button type="button" className="-m-2.5 rounded-md p-2.5">
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
                            </div>
                        </div>
                        <div className="border-b my-4"></div>
                        <div className="flex flex-col gap-4">
                            <button className="btn btn-sm" onClick={sessionData ? () => void signOut() : () => void signIn()}> {sessionData ? "Sign out" : "Sign in"}</button>
                            <a className="btn btn-primary btn-block group !btn-block !btn-sm" href="https://buy.stripe.com/fZebJw9rO4z5cwgeUU?prefilled_promo_code=LAUNCH">Get Zenvoice
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] fill-white/10 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200">
                                <path d="m3 3 3 9-3 9 19-9Z"></path>
                                <path d="M6 12h16"></path>
                            </svg>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </header>
                </div>

        </>
    )
}