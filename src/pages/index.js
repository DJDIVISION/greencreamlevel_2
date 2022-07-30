const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require ('mysql2');

const db = mysql.createPool({
    database: 'hierbas',
    user: '4s23aw6qrnif',
    host: 'rqiw8ux75k5m.us-east-2.psdb.cloud',
    password: 'pscale_pw_rC8jASerqhpbkm1D90ONf1wGN67CaizlAa38FbVKwQ4',
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