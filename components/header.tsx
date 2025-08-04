"use client"

import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {

    return (
        <>
            <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </>
    )
}