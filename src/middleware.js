import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./lib/utils";

export async function middleware(request) {
  const session = await getIronSession(cookies(), sessionOptions);
  const home = request.nextUrl?.pathname.startsWith("/home");

  if (!session.isLoggedIn && home) {
    return Response.redirect(new URL("/", request.nextUrl));
  }
 
}
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
