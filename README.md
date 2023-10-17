# 5micron-backend-challenge

This project is a Node.js web server using Express that listens on port 3000 and handles incoming sensor data in JSON format.<br>
The data is stored in a PostgreSQL database.<br>
The main endpoint for handling sensor data is `/api/sensors`, which only allows POST requests in JSON format with specific properties.

**The application server is developed following the challenge instructions (https://github.com/minh5micron/5micron-backend-challenge). Postgresql database in plain-text format `db_dump.sql` that contains a table with at least 3 rows of data is included in the repository.**

**Also as an improvement Unit Testing and Docker containerization is also included. Both application server and unit tests can be run/executed directly or using Docker. Please find the details below:**


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
    cd /path/to/5micron-backend-challenge
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a PostgreSQL database and configure the environment variables:**

    - Create a database in PostgreSQL.
    - Create a `.env` file in the project root and add the following:

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

To start the server, simply run the following command:

```bash
npm start
```

The server will be running at http://localhost:3000


## Additional Improvements

## 1. Unit Testing:

To make the server application more comprehensive, Unit Tests are implemented under test/test.js


- **Create a test PostgreSQL database and add the "TEST_DB_NAME" environment variable:**
  
  Modify the previously created `.env` file in the project root and add "TEST_DB_NAME" like the following:

    ```env
    # Database config
    DB_USER=your_postgres_username
    DB_HOST=your_postgres_host
    DB_NAME=your_postgres_database_name
    DB_PASSWORD=your_postgres_password
    DB_PORT=your_postgres_port
    TEST_DB_NAME=your_test_database_name
    ```
        
Similarly replace `your_test_database_name` with your test PostgreSQL database name.
    
- **Executing the Unit Test**

To execute the tests, run the following command:

```bash
npm test
```

## 2. Containerization using Docker:

Docker is used to pacakage the whole application which makes it independent of environment and convenient to setup.
- **Prerequisites**

  Download and install docker based on your environment
  - [Docker](https://www.docker.com/get-started)

  __Docker Desktop for windows__ was used here for this application.


- **Setting up the containers**
    1. The cloned project root folder has a `Dockerfile` and a `docker-compose.yml` file.
       
    2. Navigate to the project's root folder:
    
    ```bash
    cd /path/to/5micron-backend-challenge
    ```
    
    3. Build the docker containers:
    
    ```bash
    docker-compose build
    ```
    
    4. Run the application containers:
    
    ```bash
    docker-compose up
    ```
    
    This starts all the container instances and now the server will be accessible at http://localhost:3000

- **Executing the Unit Test from test-runner instance**

    After running the application containers we can execute the Unit Tests using the __test-runner__ instance with the following command:
    
    ```bash
    docker-compose exec test-runner npm test
    ```
   
