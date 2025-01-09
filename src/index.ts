// PACKAGE IMPORTS
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config();

// ROUTE IMPORTS
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import authorRoutes from "./routes/author.routes";
import categoryRoutes from "./routes/category.routes";
import borrowedBookRoutes from "./routes/borrowedBook.routes";

// CONFIG
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use("/users", userRoutes);
app.use("/book", bookRoutes);
app.use("/author", authorRoutes);
app.use("/category", categoryRoutes);
app.use("/borrowedbook", borrowedBookRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
