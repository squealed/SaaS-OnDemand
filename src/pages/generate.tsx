import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./components/alert";
import { Palette, Upload, AlertCircle, Image as ImageIcon, Sparkles } from "lucide-react"
import { Button } from "./components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card";
import Link from "next/link" 
import Image from "next/image"
import { api } from "~/utils/api";

export default function generate(){

    const GenerateAPI = api.generate.generateImage.useMutation()
    const router = useRouter()
    const {data: session, status} = useSession()
    /*
    useEffect(() => {
        if (status != "authenticated"){
            router.push("/")
        }
    }),[status,router]
    */
    const CARTOON_THEMES = [
        {
          id: "simpsons",
          name: "The Simpsons",
          description: "Iconic yellow characters with overbite",
          preview: "/simpson.jpg"
        },
        {
          id: "family-guy",
          name: "Family Guy",
          description: "Bold outlines with rounded features",
          preview: "/peter.png"
        },
        {
          id: "american-dad",
          name: "American Dad",
          description: "Sharp features with defined jawlines",
          preview: "/american.jpg"
        },
        {
          id: "flintstones",
          name: "The Flintstones",
          description: "Classic retro cartoon style",
          preview: "/flintstones.jpg"
        },
        {
          id: "peanuts",
          name: "Charlie Brown",
          description: "Simple, endearing character style",
          preview: "/charlie.jpg"
        }
      ]
      
        const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
        const [uploadedImage, setUploadedImage] = useState<string | null>(null)
        const [error, setError] = useState<string | null>(null)
        const [loading, setLoading] = useState(false)
      
        const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
              setError("Image size should be less than 10MB")
              return
            }
            const reader = new FileReader()
            reader.onload = () => {
                const base64String = reader.result as string
                console.log("Full base64:", base64String)
                const base64Data = base64String.split(',')[1]
                console.log("Base64 data only:", base64Data)
                
                setUploadedImage(base64String)
                setError(null)
            }
            reader.readAsDataURL(file)
          }
        }
      
        const handleGenerate = async () => {
          if (!uploadedImage) {
            setError("Please upload an image first")
            return
          }
          if (!selectedTheme) {
            setError("Please select a cartoon theme")
            return
          }
      
          try {
            setLoading(true)
            let dank = await GenerateAPI.mutateAsync({
                prompt: selectedTheme,
                image: uploadedImage
            })
            await new Promise(resolve => setTimeout(resolve, 2000))
            setError(dank.message)
          } catch (err) {
            setError("Failed to generate image. Please try again.")
          } finally {
            setLoading(false)
          }
        }
      
        return (
          <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
            <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
              {error && (
                <Alert 
                  variant="destructive"
                  className="animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
      
            <Card className="w-full max-w-4xl">
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
                    <Palette className="h-8 w-8" />
                    <span className="text-2xl font-bold">CartoonAI</span>
                  </Link>
                </div>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl">Generate Cartoon Image</CardTitle>
                  <CardDescription>Transform your photo into various cartoon styles</CardDescription>
                </div>
              </CardHeader>
      
              <CardContent className="space-y-8">
                {/* Process Steps */}
                <div className="flex justify-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Upload</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Select Style</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Generate</span>
                  </div>
                </div>
      
                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Upload Your Image</h3>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-4">
                    {uploadedImage ? (
                      <div className="relative w-full max-w-md aspect-square">
                        <Image
                          src={uploadedImage}
                          alt="Uploaded image"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <Button
                          variant="secondary"
                          className="absolute bottom-4 right-4"
                          onClick={() => setUploadedImage(null)}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full max-w-md">
                        <div className="bg-muted rounded-lg p-8 flex flex-col items-center gap-4 hover:bg-muted/80 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="font-medium">Click to upload</p>
                            <p className="text-sm text-muted-foreground">or drag and drop</p>
                            <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
      
                {/* Theme Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2. Select Cartoon Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CARTOON_THEMES.map((theme) => (
                      <Card
                        key={theme.id}
                        className={`cursor-pointer transition-all hover:scale-[1.02] ${
                          selectedTheme === theme.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <CardContent className="p-4 flex gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={theme.preview}
                              alt={theme.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{theme.name}</h4>
                            <p className="text-sm text-muted-foreground">{theme.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
      
              <CardFooter className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="w-full max-w-md"
                  onClick={handleGenerate}
                  disabled={!uploadedImage || !selectedTheme || loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⚡</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cartoon
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Processing may take up to 60 seconds
                </p>
              </CardFooter>
            </Card>
          </main>
        )
      }