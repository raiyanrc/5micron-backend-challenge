// Importing necessary libraries
const express = require("express");
const database = require("./database");

// Setting up the server and port
const server = express();
const port = 3000;

// Using the built-in middleware instead of body-parser
server.use(express.json());

// Additionally throwing an error message for other request methods
server.use("/api/sensors", (request, response, next) => {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['POST'] });
    }
    next();
});

// Creating the API endpoint for handling sensor data allowing only POST HTTP request
server.post("/api/sensors", (request, response) => {
    // Validating the request body
    const { serial, swVersion, temperature, date, gps } = request.body;
    if (!serial || !swVersion || !temperature || !date || !gps) {
      return response.status(400).json({ error: "Missing required properties in the request body" });
    }

    const data = { serial, swVersion, temperature, date, gps };

    // Calling the insertData function from database.js
    database.insertData(data, (err, result) => {
        if (err) {
            response.status(500).json({ error: "Internal Server Error" });
        } else {
            response.status(201).json({ message: "Data stored successfully" });
        }
    });
});

// Optionally returning a response from the landing page
server.get("/", (request, response) => {
    response.send("Welcome to Raiyan's 5micron backend challenge server!");
});

// Starting the server
if (require.main === module) {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = server;