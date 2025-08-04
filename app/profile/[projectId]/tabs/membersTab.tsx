"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleSlash, Eye, NotebookPen, Plus, Search, User } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";

export default function MembersTab() {

    function InviteMemberPopover() {
        const [email, setEmail] = useState("");
        const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

        const handleInvite = async (e: React.FormEvent) => {
            e.preventDefault();
            setStatus("loading");

            // TODO: Add backend logic to invite member

            setTimeout(() => {
                setStatus("success");
                setEmail("");
                setTimeout(() => setStatus("idle"), 1500);
            }, 1200);
        };

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="default">
                        <Plus className="size-4" />
                        <span className="hidden md:block">Add Member</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-xs md:max-w-sm" align="end">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-base mb-1">Invite Member</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                            Enter the email address of the user you want to invite to this project.
                        </p>
                        <form onSubmit={handleInvite} className="flex flex-col gap-2">
                            <Input
                                type="email"
                                placeholder="user@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                variant="default"
                                disabled={status === "loading" || !email}
                                className="w-full mt-1"
                            >
                                {status === "loading" ? "Inviting..." : "Send Invite"}
                            </Button>
                            {status === "success" && (
                                <span className="text-green-600 text-xs mt-1">Invitation sent!</span>
                            )}
                            {status === "error" && (
                                <span className="text-destructive text-xs mt-1">Failed to send invite.</span>
                            )}
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <h1 className="text-lg font-bold">Members</h1>
                <p className="text-sm text-muted-foreground">
                    Manage members from your project.
                </p>
            </div>

            <div className="flex items-center justify-between gap-2 border border-border rounded-md p-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                        placeholder="Search members"
                        className="pl-8"
                    />
                </div>
                <InviteMemberPopover />
            </div>

            <div className="flex flex-col gap-4 p-4 border border-border rounded-md">
                <div className="flex flex-col">
                    <Label className="text-sm font-bold">All Members</Label>
                    <Label className="text-xs text-muted-foreground">
                        All members from your project.
                    </Label>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="hidden md:block">
                                <AvatarFallback>
                                    <User className="size-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">
                                    john.doe@example.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Eye className="size-4" />
                                        Viewer
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <NotebookPen />
                                        Editor
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <CircleSlash className="text-destructive" />
                                        Remove Member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="hidden md:block">
                                <AvatarFallback>
                                    <User className="size-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Jane Doe</p>
                                <p className="text-xs text-muted-foreground">
                                    jane.doe@example.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <NotebookPen className="size-4" />
                                        Editor
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Eye className="size-4" />
                                        Viewer
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <CircleSlash className="text-destructive" />
                                        Remove Member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}