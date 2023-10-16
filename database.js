const Pool = require("pg").Pool;

// Loads environment variables from .env file
require('dotenv').config();

const databaseName = process.env.NODE_ENV === "test" ? `test_${process.env.DB_NAME}` : process.env.DB_NAME;

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

// Creating the table and handling connection errors
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  }

  // Creating the table
  client.query(createTableQuery, (err, result) => {
    done(); // Release the client back to the pool

    if (err) {
      console.error("Error creating table:", err);
      process.exit(1); // Exit the process if table creation fails
    } else {
      console.log("Table created successfully");
    }
  });
});

// Function to insert data into the database
const insertData = (data, callback) => {
  const { serial, swVersion, temperature, date, gps } = data;
  const values = [serial, swVersion, temperature, date, gps];

  pool.query(insertDataQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      callback({ error: "Internal Server Error" });
    } else {
      console.log("Data inserted successfully");
      callback(null, { message: "Data stored successfully" });
    }
  });
};

module.exports = {
  insertData,
};