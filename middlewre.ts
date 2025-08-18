import { NextRequest } from "next/server";



 export default function middleware(req:NextRequest) {
     
     const pathname = req.nextUrl.pathname;
     const isPublicPath = pathname === "/login" || pathname === "/register";


 }