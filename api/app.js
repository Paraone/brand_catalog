const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const pgp = require("pg-promise")();
const db = pgp('postgres://paraone@localhost:5432/brand_catalog');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: 'GET,PUT,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

app.listen(port);
console.log("Server started on " + port);

app.get("/", (req, res) => {
  console.log("Hit route /");
  res.json("API IS ALIVE");
});

///////////////// BRANDS //////////////////////////

// ALL BRANDS
app.get('/api/brands', (req, res) => {
  console.log("Got a get request");
  db.many("SELECT * FROM brands")
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// SINGLE BRAND
app.get('/api/brands/:id', (req, res) => {
  console.log("Get request: id "+req.params.id);
  db.one('SELECT * FROM brands WHERE id=$1', [req.params.id])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// CREATE NEW BRAND
app.post('/api/brands', (req, res) => {
  const {name, description, logo, headline} = req.query;
  console.log("Got a post request");
  db.one("INSERT INTO brands (id, name, description, logo, headline) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;",
    [name, description, logo, headline])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// UPDATE BRAND
app.put('/api/brands/:id', (req, res) => {
  console.log("Got a put request: id "+req.params.id);
  const {name, description, logo, headline} = req.query;
  db.any("UPDATE brands SET name=$2, description= $3, logo= $4, headline= $5 WHERE id= $1",
    [req.params.id, name, description, logo, headline])
    .catch(err => console.log(err))
    .then(res.json({message: `Updated brand ${req.params.id}`}));
});

// DELETE BRAND
app.delete('/api/brands/:id', (req, res) => {
  console.log("Delete request: id "+req.params.id);
  db.any("DELETE FROM brands WHERE id=$1", [req.params.id])
    .catch(err => console.log(err))
    .then(res.json({message: `Deleted brand ${req.params.id}`}));
});

///////////////// PRODUCTS //////////////////////////////

//ALL PRODUCTS
app.get('/api/products', (req, res) => {
  console.log("Got a get request");
  db.any("SELECT * FROM products")
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// SINGLE PRODUCT
app.get('/api/products/:id', (req, res) => {
  console.log("Get request: id "+req.params.id);
  db.one('SELECT * FROM products WHERE id=$1', [req.params.id])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// CREATE NEW PRODUCT
app.post('/api/products', (req, res) => {
  console.log("Got a post request");
  const {name, description, logo, brand_id} = req.query;
  db.one("INSERT INTO products (id, name, description, logo, brand_id) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;",
    [name, description, logo, brand_id])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// UPDATE PRODUCT
app.put('/api/products/:id', (req, res) => {
  console.log("Got a put request: id "+req.params.id);
  const {name, description, logo, headline, brand_id} = req.query;
  db.any("UPDATE products SET name=$2, description= $3, logo= $4, brand_id= $5 WHERE id= $1",
    [req.params.id, name, description, logo, brand_id])
    .catch(err => console.log(err))
    .then(res.json({message: `Updated product ${req.params.id}`}));
});

// DELETE PRODUCT
app.delete('/api/products/:id', (req, res) => {
  console.log("Delete request: id "+req.params.id);
  db.any("DELETE FROM products WHERE id=$1", [req.params.id])
    .catch(err => console.log(err))
    .then(res.json({message: `Deleted product ${req.params.id}`}));
});
