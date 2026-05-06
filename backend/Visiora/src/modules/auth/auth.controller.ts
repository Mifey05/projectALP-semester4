import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const userId = await authService.register({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered",
      user_id: userId,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};