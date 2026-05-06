import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

type JwtUserPayload = {
  user_id: number;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const parts = header.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ message: "Invalid authorization format" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid authorization format" });
    }
    

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown;

    if (
        typeof decoded === "object" &&
        decoded !== null &&
        "user_id" in decoded
    ) {
        const payload = decoded as JwtUserPayload;
        (req as any).user = payload;
        return next();
    }

        return res.status(401).json({ message: "Invalid token payload" });
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};