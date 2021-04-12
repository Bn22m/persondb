-- #####################
-- # persondb.sql
-- # Author:  Brian M
-- #####################
-- # http://localhost:8000/
-- # For more info.
-- ###########################

-- #Create db user.

CREATE ROLE personapp WITH LOGIN PASSWORD 'myw21pw';

-- #Alter role.

ALTER ROLE personapp CREATEDB;

-- #Check the list of roles.
\du

-- #Quit psql.
\q

-- #Login with new user personapp.
-- #Server [localhost]:
-- #Database [postgres]:
-- #Port [5432]:
-- #Username [postgres]: personapp
-- #Password for user personapp: myw21pw

-- #Create new database persondb.

CREATE DATABASE persondb;

-- #List databases.
\list

-- #Connect to persondb database.
\connect persondb
-- #You are now connected to database "persondb" as user "personapp".
-- #persondb=>

-- #Create table person.

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

-- #Create table contactslist.

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

-- #We are done.
-- #persondb=> \dt
-- #             List of relations
-- # Schema |     Name     | Type  |   Owner
-- #--------+--------------+-------+-----------
-- # public | contactslist | table | personapp
-- # public | person       | table | personapp
-- #(2 rows)
-- #
-- #persondb=> \conninfo
-- #You are connected to database "persondb" as user "personapp" on host "localhost" at port "5432".
-- #
-- #persondb=>
-- #
-- #Testing data.

INSERT INTO person (name, surname, age, gender, birthday, phone, email) VALUES
('Vony','Yony', '22', 'female', '1999/02/07', '0123456789', 'vony@ony.io'),
('Ronny','Jony', '21', 'male', '2000/03/10', '0123056789', 'ronny@ron.io'),
('Donny','Nony', '23', 'male', '1998/03/13', '0223056789', 'donny@don.io'),
('Qonny','Pony', '31', 'female', '1990/01/10', '0823056789', 'qonny@qon.io'),
('Conny','Xony', '41', 'female', '1980/02/08', '0183056789', 'conny@con.io'),
('Bonny','Zony', '60', 'female', '1961/03/10', '0723056789', 'bonny@bon.io'),
('Jonny','Jony', '61', 'male', '1960/01/09', '0123056889', 'jonny@jon.io'),
('Veny','Yony', '22', 'female', '1999/02/07', '0123406789', 'sony@ony.io'),
('Renny','Jony', '21', 'male', '2000/03/11', '0123050789', 'renny@ron.io'),
('Denny','Nony', '23', 'male', '1998/03/13', '0223050789', 'denny@don.io'),
('Qenny','Pony', '31', 'female', '1990/01/10', '0823006789', 'qenny@qon.io'),
('Cenny','Xony', '41', 'female', '1980/02/05', '0183006789', 'cenny@con.io'),
('Benny','Zony', '60', 'male', '1961/03/10', '0723056089', 'benny@bon.io'),
('Jenny','Jony', '61', 'female', '1960/01/06', '0123050889', 'jenny@jon.io'),
('Vony','Yondy', '22', 'female', '1999/02/07', '0923456789', 'vony@ondy.io'),
('Ronny','Jondy', '21', 'male', '2000/03/10', '0923056789', 'ronny@rodn.io'),
('Donny','Nondy', '23', 'male', '1998/03/13', '0923056789', 'donny@dodn.io'),
('Qonny','Pondy', '31', 'female', '1990/01/10', '0923056789', 'qonny@qodn.io'),
('Conny','Xondy', '41', 'female', '1980/02/04', '0983056789', 'conny@codn.io'),
('Bonny','Zondy', '60', 'female', '1961/03/10', '0923056789', 'bonny@bodn.io'),
('Jonny','Jondy', '61', 'male', '1960/01/01', '0923056889', 'jonny@jodn.io'),
('Voy','Nony', '22', 'female', '1999/02/07', '0123456780', 'voy@ony.io'),
('Roy','Gony', '21', 'male', '2000/03/02', '0123056780', 'rony@ron.io'),
('Doy','Lony', '23', 'male', '1998/03/13', '0223056780', 'dony@don.io'),
('Qoy','Sony', '31', 'female', '1990/01/10', '0823056780', 'qony@qon.io'),
('Coy','Xony', '41', 'female', '1980/02/10', '0183056780', 'cony@con.io'),
('Boy','Hony', '60', 'male', '1961/03/03', '0723056780', 'boy@bon.io'),
('Joy','Wony', '61', 'female', '1960/01/20', '0123056880', 'joy@jon.io'),
('Xiny','Yony', '22', 'male', '1999/01/07', '0113456789', 'xiny@ony.io'),
('Hanny','Jony', '21', 'male', '2000/02/10', '0113056789', 'hanny@ron.io'),
('Lunny','Nony', '23', 'male', '1998/02/13', '0213056789', 'lunny@don.io'),
('Fenny','Pony', '31', 'female', '1990/02/22', '0813056789', 'fenny@qon.io'),
('Tenny','Tony', '41', 'female', '1980/03/21', '0113056789', 'tenny@con.io'),
('Ginny','Zony', '60', 'female', '1961/01/15', '0713056789', 'ginny@bon.io');

-- ###########
-- INSERT 0 34
-- persondb=> SELECT * FROM person order by email OFFSET 6 LIMIT 5;
--  id | name  | surname | age | gender |  birthday  |   phone    |     email     | contacts |
--          created            |           modified
-- ----+-------+---------+-----+--------+------------+------------+---------------+----------+---
-- ----------------------------+-------------------------------
--   5 | Conny | Xony    |  41 | female | 1980-02-08 | 0183056789 | conny@con.io  |          | 20
-- 21-04-01 12:42:20.475617+02 | 2021-04-01 12:42:20.475617+02
--  26 | Coy   | Xony    |  41 | female | 1980-02-10 | 0183056780 | cony@con.io   |          | 20
-- 21-04-01 12:42:20.475617+02 | 2021-04-01 12:42:20.475617+02
--  10 | Denny | Nony    |  23 | male   | 1998-03-13 | 0223050789 | denny@don.io  |          | 20
-- 21-04-01 12:42:20.475617+02 | 2021-04-01 12:42:20.475617+02
-- 17 | Donny | Nondy   |  23 | male   | 1998-03-13 | 0923056789 | donny@dodn.io |          | 20
-- 21-04-01 12:42:20.475617+02 | 2021-04-01 12:42:20.475617+02
--  3 | Donny | Nony    |  23 | male   | 1998-03-13 | 0223056789 | donny@don.io  |          | 20
-- 21-04-01 12:42:20.475617+02 | 2021-04-01 12:42:20.475617+02
-- (5 rows)
-- #######################


INSERT INTO contactslist (personid, contactsid, contactsname, contactsphone, contactsemail, personemail) VALUES
(2, 6, 'Bonny','0723056789','bonny@bon.io','ronny@ron.io'),
(3, 7, 'Jonny','0123056889','jonny@jon.io','donny@don.io'),
(12, 15, 'Vony','0923456789','vony@ondy.io','cenny@con.io'),
(2, 16, 'Ronny','0923056789','ronny@rodn.io','ronny@ron.io'),
(15, 27, 'Boy','0723056780','boy@bon.io','vonny@ondy.io'),
(32, 25, 'Qoy','0823056780','qony@ondy.io','fenny@qon.io'),
(3, 6, 'Bonny','0723056789','bonny@bon.io','donny@don.io'),
(2, 7, 'Jonny','0123056889','jonny@jon.io','ronny@ron.io'),
(2, 15, 'Vony','0923456789','vony@ondy.io','ronny@ron.io'),
(12, 16, 'Ronny','0923056789','ronny@rodn.io','cenny@con.io'),
(32, 27, 'Boy','0723056780','boy@bon.io','fenny@qon.io'),
(15, 25, 'Qoy','0823056780','qony@ondy.io','vonny@ondy.io');

-- ##################### Enjoy ####################
-- http://localhost:8000/
-- For more info.
-- ####################################################

-- #Quit psql.
\q

-- #Login with new user personapp.
-- #Server [localhost]:
-- #Database [postgres]: persondb
-- #Port [5432]:
-- #Username [postgres]: personapp
-- #Password for user personapp: myw21pw

-- Type "help" for help.
-- persondb=> help
-- You are using psql, the command-line interface to PostgreSQL.
-- Type:  \copyright for distribution terms
--       \h for help with SQL commands
--       \? for help with psql commands
--       \g or terminate with semicolon to execute query
--       \q to quit
-- persondb=>
\dt
\d person
\d contactslist
