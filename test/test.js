// Setting the environment to test
process.env.NODE_ENV = "test";

const assert = require("assert");
const request = require("supertest");
const server = require("../server");
const database = require("../database");

// Function to generate test data
const generateTestData = () => ({
    serial: "TEM-000001",
    swVersion: "01-01",
    temperature: "28",
    date: "2023-04-17T12:22:43",
    gps: "52.52,12.04",
});

// Test suite for /api/sensors endpoint
describe("/api/sensors endpoint", () => {
    it("should return 405 if the request method is not POST", async () => {
        const response = await request(server).get('/api/sensors');
        assert.strictEqual(response.status, 405);
        assert.deepStrictEqual(response.body, {error: "Method Not Allowed", allowedMethods: ["POST"]});
      });

    it("should return 400 if request body is missing required properties", async () => {
        const response = await request(server).post("/api/sensors").send({});
        assert.strictEqual(response.status, 400);
        assert.deepStrictEqual(response.body, { error: "Missing required properties in the request body" });
    });

    it("should store data in the database and return 201 if the request is valid", async () => {
        const testData = generateTestData();

        const response = await request(server).post("/api/sensors").send(testData);
        assert.strictEqual(response.status, 201);
        assert.deepStrictEqual(response.body, { message: "Data stored successfully" });
    });
});