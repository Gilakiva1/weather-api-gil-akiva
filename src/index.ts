import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import expressSession from "express-session";
import http from "http";
import { WeatherRoutes } from "../api/weather/weather.routes";

const app = express();
const server = http.createServer(app);

const session = expressSession({
  secret: "G",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(express.json());
app.use(session);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use("/", WeatherRoutes);

const port = 3030;

server.listen(port, () => {
  console.info("Server is running on port: " + port);
});
