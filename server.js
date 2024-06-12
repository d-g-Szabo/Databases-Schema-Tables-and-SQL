import express from "express";
import cors from "cors";
//import dotenv to use our .env file
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());

// import dotnet to use our .env file
// confuiguring dotenv
dotenv.config();

// import pg to connect our database to the server, up top

// import our database connection string from .env file
// we need to use the keyword process.env to get our variables from the .env file
const dbConnectionString = process.env.DATABASE_URL;
// initialize our database (I used export, so my db is available in seed.js)
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const PORT = 8008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// create an endpoint to READ data from the biscuits table
// need to have async and await to wait for the data to be fetched from the database
app.get("/biscuits", async (req, res) => {
  // write a sql query that SELECTS data from the database
  const result = await db.query(`
  SELECT * FROM biscuits
  `);
  // parse the result to json and wrangle the data from the reulst object
  res.json(result.rows); // rows is the array of objects
});

// create an endpoint to read the specific biscuit from the database
app.get("/somebiscuits", async (req, res) => {
  // write a sql query that SELECTS specific data from the database
  // we are using parameter values $1, $2, $3, $4, $5 for security reasons
  // we can conatenate conditions using AND
  const result = await db.query(
    `
  SELECT * FROM biscuits
  WHERE name = $1
  `,
    ["Oreo"]
  );
  // parse the result to json and wrangle the data from the reulst object
  res.json(result.rows); // rows is the array of objects
});

// Filtering Results

app.get("/somebiscuits2", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT name, price FROM biscuits WHERE id = $1`,
      [1]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Server Error");
  }
});

// Using Multiple Conditions

app.get("/somebiscuits3", async (request, response) => {
  // getting the id and message from the request object
  const id = request.query.id;
  const message = request.query.message;
  const dbResult = await db.query(
    `SELECT name, flavour FROM biscuits WHERE id = $1 AND flavour = $2`,
    [id, message]
  );
  response.json(dbResult.rows);
});

// to store my secrets, I created a .env file to keep them safe
// my .env file has been ignored by git!!!
// to store data in .env file we use variables
// uiEnGD1X1yRBvmQI
// postgres://postgres.istnonlnsevtohdidzcr:uiEnGD1X1yRBvmQI@aws-0-eu-west-2.pooler.supabase.com:6543/postgres
