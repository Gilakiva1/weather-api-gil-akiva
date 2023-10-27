import { DataTypes } from "sequelize";
import sequelize from "../service/sqlService";

const CityData = sequelize.define("weathers", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LocalObservationDateTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EpochTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  WeatherText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  WeatherIcon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  HasPrecipitation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PrecipitationType: {
    type: DataTypes.STRING,
  },
  IsDayTime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Temperature: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default CityData;

export interface CityDataType {
  key: string;
  city: string;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
}
