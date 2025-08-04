"use client"

import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export default function Header() {

    return (
        <>
            <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-gradient-to-r hover:text-white from-primary to-primary/80 text-white hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary transition-colors duration-300">
                        <Sparkles />
                        Ask AI
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </>
    )
}