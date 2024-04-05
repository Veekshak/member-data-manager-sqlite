import express from "express";
import memberRoutes from "./routes/memberRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import cors from "cors";

const app = express();

export const host = process.env.HOST || "localhost"; // Default to 'localhost' if not set
export const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(memberRoutes);
app.use(directorRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Website working</h1>");
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
