-- a. Display the first name, last name, and email address for each staff member.
SELECT first_name,last_name,email FROM staff;

-- b.Display the first name and last name of each actor where the last name ends in "SON".
SELECT first_name, last_name l FROM actor where last_name like '%SON';

-- c. Display a count of the R rated films that are less than 100 minutes.
SELECT count(*) FROM film WHERE length <100 and rating = 'R';

-- d. Display a count of the number of films each store has
	-- Ignoring multiple copies
	SELECT store_id,count(DISTINCT(film_id)) FROM inventory GROUP BY store_id;

	-- All copies
	SELECT store_id,count(*) FROM inventory GROUP BY store_id;

-- e. Display the title of each film and a count of how many times that film has been rented.
SELECT f.title,count(*) from film f
	INNER JOIN inventory i ON i.film_id = f.film_id
	INNER JOIN rental r ON i.inventory_id = r.inventory_id
	GROUP BY f.title
;
 
-- f.Determine the total rental revenue for each store.

SELECT i.store_id as 'Store', SUM(p.amount) as 'Revenue'
	FROM inventory i 
	INNER JOIN rental r 	ON i.inventory_id = r.inventory_id
	INNER JOIN payment p 	ON p.rental_id 	  = r.rental_id
	GROUP BY store_id
;

