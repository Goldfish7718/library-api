// PACKAGE IMPORTS
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config();

// ROUTE IMPORTS
import userRoutes from "./routes/user.routes";

// CONFIG
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
