// ? Packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// ? Middlewares
import errorHandler from "./middlewares/errors-middleware.js";

// ? Routes
import authRoutes from "./routes/auth-routes.js";
import uploadRoutes from "./routes/upload-routes.js";
import passwordRoutes from "./routes/password-routes.js";



const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ! App
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
  express.json()(req, res, next);
});
app.use(cookieParser());
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = ['http://localhost:8000', "https://spotly-clinet.vercel.app"];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, origin);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));
// !----------
const allowedOrigins = [
  "http://localhost:8000",
  "https://spotly-clinet.vercel.app",
  "https://spotly-clinet-git-test-saeed-ebrahims-projects.vercel.app"
  ,"https://spotly-clinet-git-landingpg-saeed-ebrahims-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(null, origin);
        // callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Handle OPTIONS preflight dynamically
app.options(/.*/, cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(null, origin);
      // callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));
// !----------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ! API v1 Router
const apiV1 = express.Router();
app.use("/api/v1", apiV1);

// ! Routes
apiV1.get("/welcome", (_, res) => {
  res.json({ message: "Welcome to Spotly API v1 (Spotly Backend)" });
});
apiV1.use("/auth", authRoutes);
apiV1.use("/password", passwordRoutes);
apiV1.use("/upload", uploadRoutes);
 



// ! 404
app.all(/.*/, (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// ! Error Handler
app.use(errorHandler);

export default app;
