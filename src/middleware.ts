import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default withClerkMiddleware((req: NextRequest) => {
export default withClerkMiddleware(() => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
}
// export const config = {
//   matcher: "/((?!_next/image|_next/static|favicon.ico).*)"
// }
