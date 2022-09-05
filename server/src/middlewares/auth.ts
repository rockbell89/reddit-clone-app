import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User | undefined = await res.locals.user;
    if (!user) throw new Error("not found user");
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthenticated" });
    console.log("dd");
  }
};
