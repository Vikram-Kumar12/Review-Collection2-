import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from 'express-session'
import userRouter from "./routes/user.routes.js";
import reviewRouter from "./routes/review.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeReviewRouter from "./routes/like_Review.routes.js";


const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || `http://localhost:3000`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
)


app.get("/", (req, res) => {
  res.json({
    message: "All okay!",
  });
});

app.use('/ap1/v1/auth',userRouter)
app.use('/ap1/v1/review',reviewRouter)
app.use('/ap1/v1/comment',commentRouter)
app.use('/ap1/v1/like',likeReviewRouter)

export default app;
