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
  res.json("API IS ALIVE");
});

///////////////// BRANDS //////////////////////////

// ALL BRANDS
app.get('/api/brands', (req, res) => {
  db.many("SELECT * FROM brands ORDER BY name ASC")
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// SINGLE BRAND
app.get('/api/brands/:id', (req, res) => {
  db.any('SELECT b.name as brand, b.logo as brand_logo, b.description as brand_description, b.headline, p.id, p.name, p.logo, p.description, p.brand_id FROM brands as b JOIN products as p ON b.id=p.brand_id WHERE p.brand_id=$1', [Number(req.params.id)])
    .catch((err)=> console.log(err))
    .then((data) => {
      res.json(data);
    });
});

// CREATE NEW BRAND
app.post('/api/brands', (req, res) => {
  const {name, description, logo, headline} = req.query;
  db.one("INSERT INTO brands (id, name, description, logo, headline) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *",
    [name, description, logo, headline])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// UPDATE BRAND
app.put('/api/brands/:id', (req, res) => {
  const {name, description, logo, headline} = req.query;
  db.any("UPDATE brands SET name=$2, description= $3, logo= $4, headline= $5 WHERE id= $1 RETURNING *",
    [req.params.id, name, description, logo, headline])
    .catch(err => console.log(err))
    .then(data => res.json(data));
});

// DELETE BRAND
app.delete('/api/brands/:id', (req, res) => {
  db.any("DELETE FROM brands WHERE id=$1", [req.params.id])
    .catch(err => console.log(err))
    .then(res.json({message: `Deleted brand ${req.params.id}`}));
});

///////////////// PRODUCTS //////////////////////////////

//ALL PRODUCTS
app.get('/api/products', (req, res) => {
  db.any("SELECT * FROM products")
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// SINGLE PRODUCT
app.get('/api/products/:id', (req, res) => {
  db.one('SELECT * FROM products WHERE id=$1', [req.params.id])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// CREATE NEW PRODUCT
app.post('/api/products', (req, res) => {
  const {name, description, logo, brand_id} = req.query;
  db.one("INSERT INTO products (id, name, description, logo, brand_id) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;",
    [name, description, logo, brand_id])
    .catch((err)=> console.log(err))
    .then((data) => res.json(data));
});

// UPDATE PRODUCT
app.put('/api/products/:id', (req, res) => {
  const {name, description, logo} = req.query;
  db.one("UPDATE products SET name=$2, description=$3, logo=$4 WHERE id=$1 RETURNING *",
    [req.params.id, name, description, logo])
    .catch(err => console.log(err))
    .then(data => {
      console.log(data);
      res.json(data);
    });
});

// DELETE PRODUCT
app.delete('/api/products/:id', (req, res) => {
  db.any("DELETE FROM products WHERE id=$1", [req.params.id])
    .catch(err => console.log(err))
    .then(res.json({message: `Deleted product ${req.params.id}`}));
});
