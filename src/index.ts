import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";
import bodyParser from "body-parser";
import fs from "fs";
import https from "https";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app: Application = express();
const PORT = Number(process.env.PORT);

// Setup SSL
// const options = {
//   key: fs.readFileSync(path.join(__dirname, "../localhost.key")),
//   cert: fs.readFileSync(path.join(__dirname, "../localhost.crt")),
// };

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use(router); // Use the routes defined in routes.ts

// Start the server
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
