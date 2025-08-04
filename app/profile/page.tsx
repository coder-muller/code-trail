"use client";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
    const session = authClient.useSession()

    return (
        <div className="relative flex flex-col gap-4 items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center">
                <Label className="text-2xl font-bold">Hello, {!session.data?.user?.name ? <Skeleton className="w-24 h-4" /> : session.data?.user?.name}!</Label>
                <Label className="text-sm text-muted-foreground">Select a project in the sidebar to start working</Label>
            </div>
        </div>
    )
}