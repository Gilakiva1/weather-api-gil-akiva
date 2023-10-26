import axios from "axios";
import Favorites from "../../src/models/favorites";
import sequelize from "../../src/service/sqlService";
const BASE_URL = "http://dataservice.accuweather.com/";
const API_KEY = "SI5rgAdSOg2pYUHTC0RHufNqVS3hxXRK";

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
    const response = await axiosServices.get(
      `currentconditions/v1/${key}?apikey=${API_KEY}`
    );
    return response.data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

const deleteFavorite = async (idToDelete: number) => {
  try {
    // Use the 'destroy' method with a 'where' condition to delete specific data
    const deletedRows = await Favorites.destroy({
      where: {
        id: idToDelete, // Specify the condition to identify the data to delete
      },
    });

    if (deletedRows === 1) {
      console.log(`Successfully deleted the row with id ${idToDelete}.`);
    } else {
      console.log(`No rows were deleted for id ${idToDelete}.`);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const addFavorite = async (key: string, name: string) => {
  syncModels();

  const favorite = await Favorites.create({ key, name });

  console.log("Add Favorite:", favorite.toJSON());
};

export const WeatherService = {
  getCities,
  getCityData,
  addFavorite,
  deleteFavorite,
};
