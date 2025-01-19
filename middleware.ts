import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
      {
        headers: {
          Cookie: `auth_token=${authToken.value}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - login route
     * - public folder files (images, etc)
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    "/((?!login|statics|public|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
