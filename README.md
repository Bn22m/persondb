# persondb

## Person api Project.

Uses NodeJS and PostgreSQL. Implementing the HTTP API to expose CRUD operation on a "person" entity.

Download or git clone https://github.com/Bn22m/persondb.git

To start the app we need the database. The SQL file persondb.sql is at the db folder. We can use the PostgreSQL Command Line Client to create the database and the tables.

cd pathto/persondb
Install the required dependencies.
e.g.

```
npm install

```
or

```

npm install express express-graphql graphql --save
npm install pg

```
Once done we can start the app by using Node.js command prompt.

```

npm start

```
or

```

node index.js

```

The app will be running at localhost.
Use the browser to view the project.
i.e http://localhost:8000/
Hit CTRL-C to stop the server


Enjoy.


## One more thing:
GraphQL API is now running at http://localhost:8000/graphql


#Testing 123...

##1. create Person: cURL...

```
curl -X POST -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/postperson \
--data '{"name":"Dela","surname":"Landa","age":21,"gender":"male","birthday":"2000/03/10","phone":"0103456789","email":"dela@landas.io"}'

```

##2. create Person: graphql...

```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { postPerson(input:{name:\"Jula\",surname:\"Navu\",age:null,gender:\"\",birthday:\"2003/07/07\",phone:\"0120406432\",email:\"jula@navu.io\"}){email}}"}' \
http://localhost:8000/graphql

```
##3. create Contacts: cURL...

```
curl -X POST -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/postcontacts \
--data '{"personid":5,"contactsid":9,"contactsname":"Renny","contactsphone":"0123050789","contactsemail":"renny@ron.io","personemail":"conny@con.io" }'

```

##4. create Contacts: graphql...

```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { postContacts(input:{personid:6,contactsid:9,contactsname:\"Renny\",contactsphone:\"0123050789\",contactsemail:\"renny@ron.io\",personemail:\"bonny@bon.io\"}){contactsname,contactsemail}}"}' \
http://localhost:8000/graphql

```

##5. read: cURL...

```
curl --get http://localhost:8000/person?paginator=email,email,1,15,data,orderby,page,limit,person

```

##6. read: graphql...

```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "{getPersonPage(page: \"email,email,1,15,data\", plimit: 15){ id, name, email,id,name,surname,email, contacts{id, personid, contactsid, contactsemail, personemail}, created, modified }}"}' \
http://localhost:8000/graphql

```

##7. update: cURL..

```
curl -X PUT -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/updateperson/27 \
--data '{"name":"Loy","surname":"Hony", "age":null,"gender":"male","birthday":"1961/07/02","phone":"0290940678","email":"loy@hony.io"}'

```

##8. update: graphql....

```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { updatePerson(id: 12, input:{name:\"Cenny\",surname:\"Sony\",age:null,gender:\"female\",birthday:\"1990/10/04\",phone:\"0820060002\",email:\"cenny@sony.io\"}){name, surname, phone, email}}"}' \
http://localhost:8000/graphql

```

##9. delete: cURL...

```
curl -X "DELETE" \
-H 'Content-type: application/json' http://localhost:8000/deleteperson/25 \
--data '{"personid": 25, "email": "qony@qon.io"}'

```

##10. delete: graphql...

curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { deletePerson(id: 13, input:{email:\"benny@bon.io\"}){id, email}}"}' \
http://localhost:8000/graphql
      

```
