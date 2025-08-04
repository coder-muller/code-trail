import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const publicRoutes = [
    "/sign-in",
    "/",
    "/auth/callback/:path*",
]

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const sessionCookie = getSessionCookie(req)

    if (pathname.startsWith("/sign-in") && sessionCookie) {
        return NextResponse.redirect(new URL("/profile", req.url))
    }

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}