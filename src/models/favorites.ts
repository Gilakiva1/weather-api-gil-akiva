// models/User.ts

import { DataTypes } from "sequelize";
import sequelize from "../../src/service/sqlService";

const Favorites = sequelize.define("favorites", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Favorites;
