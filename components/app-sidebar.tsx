"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSidebar } from "./ui/sidebar"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { cn } from "@/lib/utils"
import { Blend, ChevronUp, Folder, LogOut, User } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

const projects = [
    {
        label: "Projeto 1",
        href: "/profile/1",
        icon: Folder,
    },
    {
        label: "Projeto 2",
        href: "/profile/2",
        icon: Folder,
    },
    {
        label: "Projeto 3",
        href: "/profile/3",
        icon: Folder,
    },
    {
        label: "Projeto 4",
        href: "/profile/4",
        icon: Folder,
    },
]

export default function AppSidebar() {
    const { setOpenMobile } = useSidebar()
    const pathname = usePathname()
    const { data: session } = authClient.useSession()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await authClient.signOut()
        router.push("/sign-in")
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenuItem>
                    <Link href="/profile">
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Blend className="size-4" />
                            </div>
                            <div className="flex flex-col items-center justify-center leading-none">
                                <span className="font-semibold text-lg shrink-0 whitespace-nowrap">CodeTrail</span>
                            </div>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {projects.map((item) => (
                                <SidebarMenuItem key={item.label} onClick={() => setOpenMobile(false)}>
                                    <SidebarMenuButton tooltip={item.label} asChild className={cn(pathname.includes(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                        <Link href={item.href}>
                                            {item.icon && <item.icon className="size-5" />}
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <DropdownMenu onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="justify-between w-full cursor-pointer" size="lg">
                                <div className="flex items-center gap-2">
                                    {session?.user?.image ? (
                                        <Avatar>
                                            <AvatarImage src={session?.user?.image ?? ""} alt={""} />
                                            <AvatarFallback>
                                                <User className="size-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarFallback>
                                                <User className="size-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span className="font-medium shrink-0">{session?.user?.name ?? "Loading..."}</span>
                                </div>
                                <ChevronUp className={cn(open && "rotate-180", "transition-transform duration-200")} />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                <User className="size-4" />
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                <LogOut className="text-destructive" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}