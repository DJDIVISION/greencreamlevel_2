const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require ('mysql2');

const db = mysql.createPool({
    database: 'hierbas',
    user: 'dwjkbh7uq2ea',
    host: 'rqiw8ux75k5m.us-east-2.psdb.cloud',
    password: 'pscale_pw_b56g4mdu1ruK1esHlL5R8idx5bRsPUCQKwwOdTaiK-k',
    ssl: {
        rejectUnauthorized: false
    }
}); 

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    const stock = "SELECT * FROM dispensario";
    db.query(stock, (error, result) => {
        console.log("error", error);
        console.log("result", result);
        res.send(result);
    })
    
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
})