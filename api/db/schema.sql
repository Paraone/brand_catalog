DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  logo VARCHAR(255),
  headline VARCHAR(255)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  logo VARCHAR(255),
  brand_id integer,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);
