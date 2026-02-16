import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export  function proxy(req: NextRequest) {



}

export const config = {
    matcher: ['/api/:path*']
}