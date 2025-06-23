import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./src/routes/dataRoutes"
import { setupSwagger } from "./src/config/swagger";

dotenv.config();
import fs from "fs";
console.log(fs.readFileSync(".env", "utf-8"));

console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
const app = express();
const port = process.env.PORT ?? "9001";

app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use(dataRoutes);
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Mongo Uri environment variable is not defined");
}
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});