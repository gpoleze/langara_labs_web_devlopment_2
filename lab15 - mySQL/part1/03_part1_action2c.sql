 -- Part 1
 -- .c
 
create table rentals (
	 ID int not null auto_increment
	,dvd_ID int not null
	,customer_ID int not null
	,due_date date not null
	,primary key (ID)
	,constraint rentals_fk1 
		foreign key (dvd_ID)
		references gabriel_dvdstore.dvds(ID)
	,constraint rentals_fk2
		foreign key (customer_ID) 
		references `gabriel_dvdstore`.`customers`(`ID`)
)ENGINE=INNODB;