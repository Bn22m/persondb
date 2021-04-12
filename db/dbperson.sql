
CREATE ROLE personapp WITH LOGIN PASSWORD 'myw21pw';

ALTER ROLE personapp CREATEDB;

CREATE DATABASE persondb;

CREATE TABLE person (
id SERIAL PRIMARY KEY,
name varchar (99) NOT NULL,
surname varchar (99) NOT NULL,
age int,
gender varchar (10) CHECK ((gender = 'male') OR (gender = 'female')) DEFAULT NULL,
birthday date,
phone varchar (30),
email varchar (299) NOT NULL UNIQUE,
contacts text,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contactslist (
id SERIAL PRIMARY KEY,
personid int NOT NULL REFERENCES person (id) on delete cascade,
contactsid int NOT NULL REFERENCES person (id) on delete cascade,
contactsname varchar (99) NOT NULL,
contactsphone varchar (30),
contactsemail varchar (299) NOT NULL,
personemail varchar (299) NOT NULL,
listdate timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
