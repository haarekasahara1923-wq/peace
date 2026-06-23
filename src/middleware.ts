import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth-tokens";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware on /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    const verified = token ? await verifyAdminToken(token) : null;

    if (pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      if (verified) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // Protect all other admin pages
    if (!verified) {
      const loginUrl = new URL("/admin/login", request.url);
      // Optional: keep track of redirect path
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config to run only on paths that match /admin/:path*
export const config = {
  matcher: ["/admin/:path*"],
};
