import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./auth/auth";

export  async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Define public and private paths
  const isPublicPath = pathname === "/users/login" || pathname === "/users/new";
  const isPrivatePath = pathname.startsWith("/in");

  // Read cookie from the request
  const token = req.cookies.get("faturio_session")?.value; // adjust name to your cookie
  let user = null;

  if (token) {
    try {
      user = await verifyAuthToken<{ email: string; id: string; name: string }>(
        token
      );
    } catch (err) {
      user = null; // invalid/expired token
    }
  }

  // Redirects based on authentication
  if (isPublicPath && user) {
    return NextResponse.redirect(new URL("/in/dashboard", req.url));
  }

  if (isPrivatePath && !user) {
    return NextResponse.redirect(new URL("/users/login", req.url));
  }

  // If no conditions matched, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
