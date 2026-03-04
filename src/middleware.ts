import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
        cookieName: req.nextUrl.protocol === "https:"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    })

    const isLoggedIn = !!token
    const isAdmin = token?.role === "ADMIN"

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    // Protect admin API routes
    if (pathname.startsWith("/api/admin")) {
        if (!isLoggedIn || !isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    }

    // Redirect logged-in users away from login page
    if (pathname === "/login" && isLoggedIn) {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/admin", req.url))
        }
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
}
