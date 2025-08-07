"use client"

import { usePathname, useRouter } from "next/navigation"
import { SidebarGroupLabel, useSidebar } from "./ui/sidebar"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { cn } from "@/lib/utils"
import { Blend, ChevronUp, CircleDashed, Folder, FolderOpen, Loader2, LogOut, Triangle, TriangleAlert, User } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { useProject } from "@/hooks/use-project"

export default function AppSidebar() {
    const { setOpenMobile } = useSidebar()
    const pathname = usePathname()
    const { data: session } = authClient.useSession()
    const router = useRouter()
    const { projects, loading, error } = useProject()
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
                    <SidebarGroupLabel>My Projects</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {loading ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Loader2 className="size-5 animate-spin" />
                                        <span>Loading projects...</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : error ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <TriangleAlert className="size-5 text-destructive" />
                                        <span className="text-destructive">Error loading projects</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : projects.ownProjects.length === 0 ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <CircleDashed className="size-5 text-muted-foreground" />
                                        <span className="text-muted-foreground">No projects found</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : (
                                projects.ownProjects.map((item) => (
                                    <SidebarMenuItem key={item.id} onClick={() => setOpenMobile(false)}>
                                        <SidebarMenuButton tooltip={item.name} asChild className={cn(pathname.includes(item.id) && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                            <Link href={`/profile/${item.id}`}>
                                                {pathname.includes(item.id) ? <FolderOpen className="size-5 transition-transform duration-200" /> : <Folder className="size-5 transition-transform duration-200" />}
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects I&apos;m a member of</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {loading ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Loader2 className="size-5 animate-spin" />
                                        <span>Loading projects...</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : error ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <TriangleAlert className="size-5 text-destructive" />
                                        <span className="text-destructive">Error loading projects</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : projects.memberProjects.length === 0 ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <CircleDashed className="size-5 text-muted-foreground" />
                                        <span className="text-muted-foreground">No projects found</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : (
                                projects.memberProjects.map((item) => (
                                    <SidebarMenuItem key={item.id} onClick={() => setOpenMobile(false)}>
                                        <SidebarMenuButton tooltip={item.name} asChild className={cn(pathname.includes(item.id) && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                            <Link href={`/profile/${item.id}`}>
                                                {pathname.includes(item.id) ? <FolderOpen className="size-5 transition-transform duration-200" /> : <Folder className="size-5 transition-transform duration-200" />}
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            )}
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