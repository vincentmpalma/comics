import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true
});
const conn = await pool.getConnection();

//root route goes to homepage
app.get('/', async (req, res) => {

  // database query to get all comic sites from the database
  let sitesSQL = `SELECT * 
                  FROM fe_comic_sites`
  const [sites] = await conn.query(sitesSQL);

  // database query to get a random comic to display
  let randomSQL = `SELECT * 
                  FROM fe_comics
                  ORDER BY RAND()
                  LIMIT 1`
  let random = await conn.query(randomSQL);

  console.log(random[0][0].comicUrl)

   res.render('home', {sites, random:random[0][0]})
});


// api to send data of a random comic from the database
app.get("/api/comics/random", async(req, res) => {

  let randomSQL = `SELECT * 
  FROM fe_comics
  ORDER BY RAND()
  LIMIT 1`
  let random = await conn.query(randomSQL);

  res.json(random[0])
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})