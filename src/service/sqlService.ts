import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql", // Use the MySQL database
  host: "127.0.0.1",
  port: 3306, // Default MySQL port
  username: "root",
  password: "",
  database: "weather",
});

export default sequelize;
