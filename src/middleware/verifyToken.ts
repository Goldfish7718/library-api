import jwt from "jsonwebtoken";
import { Request } from "express";

export interface ExtendedRequest extends Request {
  decode: {
    id: number;
    name: string;
    email: string;
    isEmailVerified: boolean;
    role: string;
    isActive: boolean;
  };
}

export const verifyToken = async (
  req: ExtendedRequest,
  res: any,
  next: any
): Promise<any> => {
  try {
    let { token } = req.cookies;

    if (!token)
      return res.status(401).json({
        message: "No Token",
        isAuthenticated: false,
      });

    token = token.split(" ")[1];

    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`);

    req.decode = decode as ExtendedRequest["decode"];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
