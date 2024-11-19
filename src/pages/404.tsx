import { MoveLeft, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import {Button} from "./components/button"

export default function custom404(){
    const router = useRouter()

    return(
        <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="relative mx-auto w-24 h-24">
            <FileQuestion className="w-24 h-24 text-muted-foreground/30 absolute" />
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight">
            Page not found
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div>
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
    );
}