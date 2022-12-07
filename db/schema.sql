DROP DATABASE IF EXISTS mycompany_db;

CREATE DATABASE mycompany_db;

USE mycompany_db;

CREATE TABLE department(
id INT AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT AUTO_INCREMENT, 
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee(
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id)
);



