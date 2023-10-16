# 5micron-backend-challenge

This project is a Node.js web server using Express that listens on port 3000 and handles incoming sensor data in JSON format.
The data is stored in a PostgreSQL database.
The main endpoint for handling sensor data is `/api/sensors`, which only allows POST requests in JSON format with specific properties.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 9.6 or higher)

## Environment Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/raiyanrc/5micron-backend-challenge.git
    ```

2. **Navigate to the project folder:**

    ```bash
    cd /path/to/project
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a PostgreSQL database and configure the environment variables:**

    - Create a database in PostgreSQL.
    - Create or modify the `.env` file in the project root and add the following:

        ```env
        # Database config
        DB_USER=your_postgres_username
        DB_HOST=your_postgres_host
        DB_NAME=your_postgres_database_name
        DB_PASSWORD=your_postgres_password
        DB_PORT=your_postgres_port
        ```

    Replace `your_postgres_username`, `your_postgres_host`, `your_postgres_database_name`, `your_postgres_password`, and `your_postgres_port` with your PostgreSQL credentials.

## Running the Application

To start the server, run the following command:

```bash
npm start
