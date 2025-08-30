import express from "express";
import passport from "../middlewares/passport.middlewares.js";
import {
  googleCallback,
  googleLoginFailed,
  logoutUser,
  userProfile,
} from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
const userRouter = express.Router();

userRouter.get(
  "/login-with-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

userRouter.get(
  "/login-with-google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login-with-google/failed",
  }),
  googleCallback,
);

userRouter.get("/login-with-google/failed", googleLoginFailed);
userRouter.get("/logout",isLoggedIn, logoutUser);
userRouter.get("/profile",isLoggedIn, userProfile);


export default userRouter;
