import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./auth/auth";

export  async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Define public and private paths
  const isPublicPath = pathname === "/users/login" || pathname === "/users/new";
  const isHomePath = pathname === "/"
  const isPrivatePath = pathname.startsWith("/in");
  const onBoardingPath = pathname.startsWith("/onboarding")

  // Read cookie from the request
  const token = req.cookies.get("faturio_session")?.value; // adjust name to your cookie
  let user = null;

  if (token) {
    try {
      user = await verifyAuthToken<{ email: string; id: string; name: string,businessId:number,isActive:boolean }>(
        token
      );
    } catch (err) {
      user = null; // invalid/expired token
    }
  }
  if(onBoardingPath && !user) return NextResponse.redirect(new URL("/",req.url))
    if(onBoardingPath && user?.isActive && user?.businessId) return NextResponse.redirect(new URL("/in/dashboard",req.url))

  // Redirects based on authentication
  if (isPublicPath && user && !isHomePath) {
  
    return NextResponse.redirect(new URL("/in/dashboard", req.url));
  }

  if (isPrivatePath && !user) {
    return NextResponse.redirect(new URL("/users/login", req.url));
  }
   
  if(user && isPrivatePath && (!user?.isActive || !user?.businessId )) return NextResponse.redirect(new URL("/onboarding",req.url))

  


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
