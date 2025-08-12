import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app: Application = express();
const PORT = Number(process.env.PORT);

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use(router); // Use the routes defined in routes.ts

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
