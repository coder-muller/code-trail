"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Profile() {
    const session = authClient.useSession()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect("/sign-in");
                }
            },
        });
    }

    return (
        <div className="relative flex flex-col gap-4 items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <Label className="text-2xl font-bold">Hello, {!session.data?.user?.name ? <Skeleton className="w-24 h-4" /> : session.data?.user?.name}!</Label>
                <Label className="text-sm text-muted-foreground">You are signed in with your GitHub account.</Label>
            </div>
            <Button variant="outline" onClick={handleSignOut} disabled={session.isPending}>
                Sign Out
            </Button>
        </div>
    )
}