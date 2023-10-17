const Pool = require("pg").Pool;
const dotenv = require("dotenv");

// Loads environment variables from .env file
dotenv.config();

const databaseName = process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME;

// Creating our database pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: databaseName,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Defining the sensor_data table create query
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sensor_data (
    id SERIAL PRIMARY KEY,
    serial VARCHAR(255),
    sw_version VARCHAR(255),
    temperature VARCHAR(255),
    date VARCHAR(255),
    gps VARCHAR(255)
  );
`;

// Defining the data insert query
const insertDataQuery = `
  INSERT INTO sensor_data (serial, sw_version, temperature, date, gps)
  VALUES ($1, $2, $3, $4, $5)
`;

// Handling database connection
async function connectToDatabase(dbConnectionAttempts) {
  const MAX_DB_RETRIES = 5;
  const RETRY_INTERVAL = 3000;

  return new Promise(async (resolve, reject) => {
    try {
      const client = await pool.connect();
      console.log("Connected to the database");

      await createTable();
      console.log("Table created successfully");

      resolve(client);
    } catch (err) {
      console.error("Error connecting to the database:", err);
      dbConnectionAttempts++;

      if (dbConnectionAttempts < MAX_DB_RETRIES) {
        console.log(`Retrying database connection (attempts: ${dbConnectionAttempts})`);
        setTimeout(async () => {
          try {
            const client = await connectToDatabase(dbConnectionAttempts);
            resolve(client);
          } catch (err) {
            reject(err);
          }
        }, RETRY_INTERVAL);
      } else {
        console.error("Maximum number of database connection attempts reached. Make sure the correct database exists. Exiting...");
        reject(err);
      }
    }
  });
}

// Function to create a table in the database
async function createTable() {
  try {
      const result = await pool.query(createTableQuery);
  } catch (err) {
      console.error("Error creating table:", err);
      process.exit(1);
  }
}

// Function to insert data into the database
async function insertData(data) {
  const { serial, swVersion, temperature, date, gps } = data;
  const values = [serial, swVersion, temperature, date, gps];

  try {
      const result = await pool.query(insertDataQuery, values);
      console.log("Data inserted successfully");
      return { message: "Data stored successfully" };
  } catch (err) {
      console.error("Error inserting data:", err);
      return { error: "Internal Server Error" };
  }
}

let connectionAttempts = 0;
connectToDatabase(connectionAttempts);

module.exports = {
  insertData,
  connectToDatabase,
};