import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole =
    (sessionClaims?.metadata as { userType: "student" | "teacher" })
      ?.userType || "student";
    
    // setTimeout(() => {
    //   console.log(userRole);
    //   console.log(sessionClaims?.userType );
    //   console.log(sessionClaims);
    // }, 3000);
    if (isStudentRoute(req)) {
      console.log(1, 'Reached123');
      if (sessionClaims?.userType !== "student"  && typeof sessionClaims?.userType !== 'undefined') {
        const url = new URL("/teacher/courses", req.url);
        return NextResponse.redirect(url);
      }
    }
  
    if (isTeacherRoute(req)) {
      console.log(2, 'Reached123');
      console.log(3, sessionClaims?.userType )
      if (sessionClaims?.userType !== "teacher" && typeof sessionClaims?.userType !== 'undefined') {
        console.log(4, 'reached456')
        const url = new URL("/user/courses", req.url);
        return NextResponse.redirect(url);
      }
    }
 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};