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
app.use(express.json());


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

   res.render('home', {sites, random:random[0][0]})
});

app.get('/sites/:id', async (req, res) => {

  let siteId = req.params.id

  let siteSQL = `SELECT *
                 FROM fe_comic_sites
                 WHERE comicSiteId = ?`
  let siteRows = await conn.query(siteSQL, [siteId]);

  let comicsSQL = `SELECT *
                   FROM fe_comics
                   WHERE comicSiteId = ?`;
  let comicRows = await conn.query(comicsSQL, [siteId]); 

  res.render("comics", {site:siteRows[0][0], comics:comicRows[0]})
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

app.post("/api/comics", async(req, res) => {

  try{
    const {url, title, site, date} = req.body;
    console.log(url)
    console.log(title)
    console.log(site)
    console.log(date)
        
    let comicSQL = `INSERT INTO fe_comics
                    (comicUrl, comicTitle, comicSiteId, comicDate) 
                    VALUES (?,?,?,?)`
    let comicRes = await conn.query(comicSQL, [url, title, site, date]);
    res.json({
      success: true,
      message: "Comic added successfully",
    })

  } catch(error ){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add comic"
    })
  }

});

// api to send data of a random comic from the database
app.get("/api/comics/comments/:id", async(req, res) => {
  let id = req.params.id

  let commentsSQL = `SELECT * 
  FROM fe_comments
  WHERE comicId = ?`
  let comments = await conn.query(commentsSQL, [id]);

  res.json(comments[0])
});

app.post("/api/comics/comments", async(req, res) => {
  
  try{
    const {author, email, comicId, comment} = req.body;
    let commentSQL = `INSERT INTO fe_comments 
                      (author, email, comment, comicId)
                      VALUES (?,?,?,?)`
    await conn.query(commentSQL, [author, email, comment, comicId]);
    res.json({
      success: true,
      message: "Added comment successfully"
    })
} catch(e){
  console.log(e)
  res.status(500).json({
    success: false,
    message: "Failed to add comment"
  })
}


});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})