 -- Part 1
 -- .0
 
create table customers (
	 ID int not null auto_increment
	,first_name varchar(30) not null
	,last_name varchar(30) not null
	,phone varchar(20) not null
	,address varchar(50) not null
	,city varchar(20) not null
	,postal_code varchar(100) not null
	,primary key (ID)	
);