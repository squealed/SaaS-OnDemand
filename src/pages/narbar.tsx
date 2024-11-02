import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Palette, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const { data: sessionData } = useSession();
  const { data: balanceData } = api.credits.getCredits.useQuery(undefined, {
    enabled: !!sessionData,
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Palette className="h-5 w-5 md:h-6 md:w-6" />
            <span className="text-lg md:text-xl font-bold">CartoonAI</span>
          </Link>
        </div>

        {/* Full Menu for Desktop */}
        <div className="hidden md:flex items-center gap-6 md:gap-10">
          {!sessionData && (
            <>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </Link>
            </>
          )}
          {sessionData && (
            <>
              <Link href="/addbalance" className="text-sm font-medium hover:text-primary transition-colors">
                Add Balance
              </Link>
              <Link href="/generate" className="text-sm font-medium hover:text-primary transition-colors">
                Generate
              </Link>
              {balanceData !== null && (
                <p className="text-sm font-medium transition-colors">
                  Balance: ${balanceData}
                </p>
              )}
            </>
          )}
        </div>

        {/* Sign-In/Sign-Out Button for Desktop */}
        <div className="hidden md:flex w-[200px] justify-end">
          <button
            className="btn btn-secondary btn-sm group"
            onClick={sessionData ? () => void signOut({ redirect: false }) : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden ml-auto focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden bg-background/95 border-t shadow-lg">
          <div className="flex flex-col items-start p-4 space-y-4">
            {!sessionData && (
              <>
                <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
                  Pricing
                </Link>
                <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
                  FAQ
                </Link>
              </>
            )}
            {sessionData && (
              <>
                <Link href="/addbalance" className="text-sm font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
                  Add Balance
                </Link>
                <Link href="/generate" className="text-sm font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
                  Generate
                </Link>
                {balanceData !== null && (
                  <p className="text-sm font-medium transition-colors">Balance: ${balanceData}</p>
                )}
              </>
            )}
            <button
              className="btn btn-secondary btn-sm group w-full"
              onClick={() => {
                toggleMenu();
                sessionData ? signOut({ redirect: false }) : signIn();
              }}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
