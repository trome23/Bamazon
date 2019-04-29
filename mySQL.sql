create database bamazon_DB;

use bamazon_DB; 

create table products( 
	item_id int auto_increment not null primary key, 
	product_name varchar(100) not null,
	department_name varchar(100) not null,
	price int,
	stock_quantity int
);

