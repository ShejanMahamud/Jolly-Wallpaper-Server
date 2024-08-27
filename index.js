import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import { logReqRes } from "./middlewares/index.js";
import UserRouter from "./routes/user/user.js";
import WallpaperCategoryRouter from "./routes/wallpaper/category.js";
import wallpaperSubcategoryRouter from "./routes/wallpaper/subcategory.js";
import wallpaperRouter from "./routes/wallpaper/wallpaper.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3483;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(logReqRes("log.txt"));

app.use("/auth/users", UserRouter);
app.use("/wallpaper_category", WallpaperCategoryRouter);
app.use("/wallpaper_subcategory", wallpaperSubcategoryRouter);
app.use("/wallpapers", wallpaperRouter);

app.get("/", (req, res) => {
  res.send({
    server_status: "Running...!",
  });
});

app.use((req, res, next) => {
  const error = new Error("Requested URL not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500).send({
    success: false,
    message: error.message || "Internal Server Error!",
  });
});

// IIFE to start the server
(async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () =>
      console.log("APP RUNNING ON PORT:", PORT)
    );
  } catch (error) {
    console.error("Failed to Start the Server: ", error);
    process.exit(1);
  }
})();
