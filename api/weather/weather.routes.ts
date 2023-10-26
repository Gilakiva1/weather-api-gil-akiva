import express from "express";
import { getCities, getCityData, addFavorite } from "./weather.controller";

export const WeatherRoutes = express.Router();

WeatherRoutes.get("/", getCities);
WeatherRoutes.get("/cityData", getCityData);
WeatherRoutes.post("/", addFavorite);
