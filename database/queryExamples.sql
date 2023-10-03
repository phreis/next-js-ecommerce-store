-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  image varchar(30),
  price integer,
  slug varchar(30) NOT NULL
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO products
 (name, image, price, slug)
VALUES
  ('Product one',  '/images/product01.jpg', 10,'product-one' ),
  ('Product two',  '/images/product02.jpg', 10,'product-two' ),
  ('Product three',  '/images/product03.jpg', 10,'product-three' ),
  ('Product four',  '/images/product04.jpg', 10,'product-four' ),
  ('Product five',  '/images/product05.jpg', 10,'product-five' );

-- Read some animals (R in CRUD - Read)
SELECT * FROM products;
