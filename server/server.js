import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(multer().none());


app.get("/", (req, res) => res.send("Server is running..."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));