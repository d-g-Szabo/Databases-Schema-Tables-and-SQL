// a seed file is used for testing our database with sql queries
// creating our tables
// inserting test data#

// import db form server.js --> I have destructured db from server.js
import { db } from "./server.js";

// as sql in the seed file
// IF NOT EXISTS is used to check if a table exists before creating it
db.query(`CREATE TABLE IF NOT EXISTS biscuits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL,
    calories DECIMAL,
    flavour  TEXT,
    crunchiness int
)`);

// a sql querry to insert data into our table
db.query(`INSERT INTO biscuits (name, price, calories, flavour, crunchiness) 
VALUES ('Oreo', 1.99, 100, 'chocolate', 10),
('Digestive', 0.99, 150, 'plain', 5),
('Hobnob', 1.49, 200, 'oat', 8),
('Rich Tea', 0.79, 80, 'plain', 3)`);
