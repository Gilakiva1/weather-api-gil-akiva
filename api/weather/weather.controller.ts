import { Request, Response } from "express";
import { WeatherService } from "./weather.service";
import { CityDataType } from "../../src/models/weathers";

export const getCities = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const response = await WeatherService.getCities(query);
  res.send(response);
};

export const getCityData = async (req: Request, res: Response) => {
  const cityKey = req.query.key as string;
  const response = await WeatherService.getCityData(cityKey);
  res.send(response);
};
export const addFavorite = async (req: Request, res: Response) => {
  const key = req.body.key;
  const name = req.body.name;
  const response = await WeatherService.addFavorite(key, name);
  res.send(response);
};
export const getFavorite = async (req: Request, res: Response) => {
  const response = await WeatherService.getFavorite();
  res.send(response);
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const key = req.query.key as string;
  const response = await WeatherService.deleteFavorite(key);

  if (response === true) res.status(200).send("Favorite deleted successfully");
  else res.status(400).send("Failed to delete favorite");
};

export const addWeather = async (req: Request, res: Response) => {
  const city = req.body.city as CityDataType;
  console.log({ city }, "--------------------");
  try {
    const response = await WeatherService.addWeather(city);
    res.status(200).send("Favorite deleted successfully");
  } catch {
    res.status(400).send("Failed to delete favorite");
  }
};
