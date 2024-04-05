import fs from "fs";
import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(
  __dirname,
  `../data/members.sqlite`
);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: console.log,
});

async function initializeDatabase() {
  try {
    // Synchronize the database by creating tables based on the defined models
    await sequelize.sync();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

function databaseExists() {
  return fs.existsSync(databasePath);
}

if (!databaseExists()) {
  initializeDatabase();
}

export default sequelize;

// async function testing() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   } finally {
//     sequelize.close();
//   }
// }
// testing();
