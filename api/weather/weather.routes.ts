import express from "express";
import {
  getCities,
  getCityData,
  addFavorite,
  deleteFavorite,
  addWeather,
  getFavorite,
} from "./weather.controller";

export const WeatherRoutes = express.Router();

WeatherRoutes.get("/", getCities);
WeatherRoutes.get("/cityData", getCityData);
WeatherRoutes.post("/", addFavorite);
WeatherRoutes.delete("/", deleteFavorite);
WeatherRoutes.get("/favorite", getFavorite);
WeatherRoutes.post("/weather", addWeather);
