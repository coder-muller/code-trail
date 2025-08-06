import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Aperture, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center container mx-auto">

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between w-full p-4 z-10 backdrop-blur-sm bg-background/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            <Aperture className="h-5 w-5" />
          </div>
          <Label className="text-2xl font-bold">Code Trail</Label>
        </div>
        <ThemeToggle />
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-5xl font-bold text-center max-w-xs md:max-w-xl">Track your coding journey with Code Trail</h1>
        <p className="text-lg text-muted-foreground max-w-sm text-center md:max-w-2xl">
          Code Trail is a platform to track your coding journey. It is a simple and easy to use platform to track your coding journey.
        </p>
        <Link href="/sign-in" className="mt-4">
          <Button className="group">
            Get Started
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
