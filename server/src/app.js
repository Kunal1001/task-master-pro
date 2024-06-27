import express from "express";
import cors from 'cors'
import { passport } from "./middlewares/auth.middleware.js";
import session from "express-session";
import { userRouter } from "./routes/user.routes.js";
import { taskRouter } from "./routes/tasks.routes.js";


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}))
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1/user',userRouter)
app.use('/api/v1/data',taskRouter)

export {app};