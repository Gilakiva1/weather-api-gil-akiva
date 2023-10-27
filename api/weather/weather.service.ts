import axios from "axios";
import Favorites from "../../src/models/favorites";
import sequelize from "../../src/service/sqlService";
import dotenv from "dotenv";
import CityData, { CityDataType } from "../../src/models/weathers";

dotenv.config();

const BASE_URL = "http://dataservice.accuweather.com/";
const API_KEY = process.env.WEATHER_TOKEN;

const axiosServices = axios.create({ baseURL: BASE_URL });

async function syncModels() {
  await sequelize.sync({ force: false });
}

const getCities = async (query: string) => {
  try {
    const response = await axiosServices.get(
      `locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`
    );
    return response.data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

const getCityData = async (key: string) => {
  try {
    const cityFromDB = await findWeather(key);
    if (cityFromDB) {
      console.log("here");
      return cityFromDB;
    }

    const response = await axiosServices.get(
      `currentconditions/v1/${key}?apikey=${API_KEY}`
    );
    return response.data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

const deleteFavorite = async (key: string) => {
  syncModels();
  try {
    const deletedRows = await Favorites.destroy({
      where: {
        key,
      },
    });

    if (deletedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const addFavorite = async (key: string, name: string) => {
  await syncModels();

  try {
    await Favorites.findOrCreate({
      where: { key },
      defaults: { name },
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

const getFavorite = async () => {
  try {
    const favoritesData = await Favorites.findAll();

    if (favoritesData) {
      const favoritesArray = favoritesData.map((data) => data.toJSON());
      return favoritesArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving favorites data:", error);
    throw error;
  }
};

const addWeather = async (data: CityDataType) => {
  try {
    const { key, ...weatherData } = data;
    const createdWeather = await CityData.create({
      key,
      ...weatherData,
    });

    console.log("Weather data added:", createdWeather.toJSON());
  } catch (error) {
    console.error("Error adding weather data:", error);
  }
};

const findWeather = async (key: string) => {
  try {
    const existingWeather = await CityData.findOne({
      where: { key },
    });

    if (existingWeather) return existingWeather.toJSON();
    else return;
  } catch (error) {
    console.error("Error finding weather data:", error);
  }
};

export const WeatherService = {
  getCities,
  getCityData,
  addFavorite,
  deleteFavorite,
  findWeather,
  addWeather,
  getFavorite,
};
