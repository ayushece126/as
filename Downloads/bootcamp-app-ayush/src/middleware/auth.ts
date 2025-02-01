// src/middleware/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (req: NextRequest) => {
    // const tokenCookie = req.cookies.get("token");
    // const token = tokenCookie?.value;
    // console.log("auth token", token);
    // if (!token) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "middleware Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    console.log("auth token", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // req.headers.set("user", JSON.stringify(decoded));
        const user = JSON.stringify(decoded);
        console.log("Decoded user:", decoded);

        // Clone request to append user info in headers
        // const requestClone = req.clone();
        // requestClone.headers.set("user", user);
        // return NextResponse.next({ headers: requestClone.headers });

        const response = NextResponse.next();
        // response.headers.set("x-user", JSON.stringify(decoded));

        response.cookies.set("user", user, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/", // Make this available across your app
        });

        console.log("Cookie set:", response.cookies.get("user"));

        return response;

    } catch (error) {
        console.log("Invalid token", error);
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
};
