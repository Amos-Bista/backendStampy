import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface BusinessJwtPayload {
    id?: string;
    businessId?: string;
    role?: string;
    email?: string;
    slug?: string;
}

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing",
            });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization header",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as BusinessJwtPayload;

        console.log("JWT DECODED:", decoded);

        const businessId = decoded.businessId || decoded.id;

        if (!businessId) {
            return res.status(401).json({
                success: false,
                message: "Business context is missing",
            });
        }

        const isLegacyBusinessToken = !decoded.role && !!businessId;
        const hasBusinessRole = decoded.role === "BUSINESS";

        if (!isLegacyBusinessToken && !hasBusinessRole) {
            return res.status(403).json({
                success: false,
                message: "Business access required",
            });
        }

        (req as any).user = {
            ...decoded,
            businessId,
            role: decoded.role || "BUSINESS",
        };

        next();

    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authenticate;