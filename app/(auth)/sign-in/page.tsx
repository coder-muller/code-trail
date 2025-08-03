import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            {/* Navbar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between w-full p-4 z-10 backdrop-blur-sm bg-background/50">
                <Link href="/">
                    <Button variant="outline">
                        <ArrowLeft />
                        Back
                    </Button>
                </Link>
                <ThemeToggle />
            </div>

            {/* Form */}
            <Card className="w-full max-w-xs md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">Access your GitHub account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="default" className="w-full">
                        <Github />
                        Continue with GitHub
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}