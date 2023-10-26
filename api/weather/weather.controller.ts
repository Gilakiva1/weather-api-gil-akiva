import { Request, Response } from "express";
import { WeatherService } from "./weather.service";

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
