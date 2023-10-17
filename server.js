// Importing necessary libraries
const express = require("express");
const database = require("./database");

// Setting up the server and port
const server = express();
const port = 3000;

// Using the built-in middleware to parse JSON instead of body-parser
server.use(express.json());

// Additionally throwing an error message for other request methods
server.use("/api/sensors", (request, response, next) => {
    if (request.method !== "POST") {
        return response.status(405).json({ error: "Method Not Allowed", allowedMethods: ["POST"] });
    }
    next();
});

server.post("/api/sensors", async (request, response) => {
    // Validating the request body
    const { serial, swVersion, temperature, date, gps } = request.body;
    if (!serial || !swVersion || !temperature || !date || !gps) {
        return response.status(400).json({ error: "Missing required properties in the request body" });
    }
    try {
        // Checking if database connection is intact
        const client = await database.connectToDatabase(0);
        const data = { serial, swVersion, temperature, date, gps };

        // Calling the insertData function from database.js
        await database.insertData(data);
        response.status(201).json({ message: "Data stored successfully" });
    } catch (err) {
        console.error("Data Insert Error:", err);
        response.status(500).json({ error: "Internal Server Error" });
    }
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