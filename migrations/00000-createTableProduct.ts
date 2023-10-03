import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  image varchar(30),
  price integer,
  slug varchar(30) NOT NULL
);`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE products;`;
}
