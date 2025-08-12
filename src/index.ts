import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { ENV } from "./config/env";
import router from "./routes/routes";

// Create an Express application
const app: Application = express();

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use(router); // Use the routes defined in routes.ts

// Check running in which mode
console.log(`Running in ${ENV.NODE_ENV} mode`);

// Start the server
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
