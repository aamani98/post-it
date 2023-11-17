import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const { pathname } = req.nextUrl;

  // if there is session and path is /login or /signup the redirect to the index page
  if (
    isAuthenticated &&
    (pathname === "/auth/login" || pathname === "/auth/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if there is no session and the pathname is not either  /login or /signup or / then redirect to login page with the next search paramenter
  if (
    !isAuthenticated &&
    pathname !== "/auth/login" &&
    pathname !== "/auth/signup" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(
      new URL(
        `/auth/login${
          pathname !== "/" ? `?next=${encodeURIComponent(pathname)}` : ""
        }`,
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/signup", "/new"],
};
