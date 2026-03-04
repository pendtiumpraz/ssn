import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth
    const isAdmin = (req.auth?.user as any)?.role === "ADMIN"

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", req.url))
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
})

export const config = {
    matcher: ["/admin/:path*", "/login"],
}
