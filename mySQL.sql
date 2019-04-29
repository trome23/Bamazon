create database bamazon_DB;

use bamazon_DB; 

create table products( 
	item_id int auto_increment not null primary key, 
	product_name varchar(100) not null,
	department_name varchar(100) not null,
	price int,
	stock_quantity int
);

use bamazon_DB; 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "baseball", "Sports", 10, 8)
 

