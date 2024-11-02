import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./components/alert";
import { Palette, DollarSign, AlertCircle } from "lucide-react"
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card";
import Link from "next/link" 


export default function addBalance(){
    const PRESET_AMOUNTS = [5, 10, 20, 50]

    const router = useRouter()
    const {data: session, status} = useSession()

    useEffect(() => {
        if (status == "authenticated"){
            router.push("/")
        }
    }),[status,router]
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setCustomAmount(value)
        setSelectedAmount(null)
        }
    }

    const handlePresetAmount = (amount: number) => {
        setSelectedAmount(amount)
        setCustomAmount("")
    }

    const handleSubmit = async () => {
        try {
        setLoading(true)
        setError(null)

        const amount = selectedAmount || parseFloat(customAmount)
        
        if (!amount || amount < 1) {
            setError("Please select an amount or enter a valid custom amount")
            return
        }

        // Here you would integrate with your Stripe backend
        // For demo purposes, we'll just show a success message
        setError("Demo: Stripe integration would process $" + amount.toFixed(2))
        
        } catch (err) {
        setError("Failed to process payment. Please try again.")
        } finally {
        setLoading(false)
        }
    }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
              <Palette className="h-8 w-8" />
              <span className="text-2xl font-bold">CartoonAI</span>
            </Link>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Add Balance</CardTitle>
            <CardDescription>Select an amount to add to your account</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Preset Amounts */}
          <div className="grid grid-cols-2 gap-4">
            {PRESET_AMOUNTS.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => handlePresetAmount(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Minimum amount: $1.00
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleSubmit}
            disabled={loading || (!selectedAmount && !customAmount)}
          >
            {loading ? "Processing..." : "Add Funds"}
          </Button>
          {error && <p>{error}</p>}
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Secure payments powered by Stripe</p>
        </CardFooter>
      </Card>
    </main>
  )
}