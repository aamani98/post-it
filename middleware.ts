import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req:NextRequest){
    const token = await getToken({req});
    const isAuthenticated = !! token;

    const {pathname} = req.nextUrl;

    if(isAuthenticated && (pathname === "/login" || pathname === "/signup")){
        return NextResponse.redirect(new URL("/",req.url));
    }

    if(!isAuthenticated && pathname !== "/login" && pathname !== "/signup" && pathname !== "/"){
        return NextResponse.redirect(
            new URL(
              `/login${pathname !== "/" ? `?next=${encodeURIComponent(pathname)}` : ""}`,
              req.url,
            ),
          );
    }
}

export const config = {
    matcher: ["/", "/login", "/signup","/new"],
  }
  