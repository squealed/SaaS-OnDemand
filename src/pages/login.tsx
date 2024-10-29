import { Button } from "./components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card";
import { Input } from "./components/input";
import { Palette } from "lucide-react";
import { Separator } from "./components/separator";
import { signIn, useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertIcon } from "./components/alert";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {

  const {data: session, status} = useSession();

  const router = useRouter()

  useEffect(()=>{
    if(status == "authenticated"){
      router.push("/")
    }
  }), [status, router]

  const [error, errorstate] = useState("")
  const [email, setEmail] = useState("");
  const handleEmailSignIn = async () => {
    errorstate("")
    if (email) {
      let dank = await signIn("email", { email, redirect: false });
      errorstate("Error signing in try again");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
              <Palette className="h-8 w-8" />
              <span className="text-2xl font-bold">CartoonAI</span>
            </Link>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button variant="outline" className="w-full" size="lg" onClick={() => signIn("google")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            
            Continue with Google
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="shrink" />
            <span className="text-muted-foreground text-sm whitespace-nowrap">Or continue with email</span>
            <Separator className="shrink" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full" size="lg" onClick={handleEmailSignIn}>
              Sign in with Email
            </Button>
            {error && <p>{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
          <div>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}