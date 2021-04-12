# personapp

## Personapp Project.

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

cURL and graphql samples are also included at personapp/db/curl.

Create New Person:
cURL...

```

curl -X POST -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/postperson \
--data '{"name":"Dela","surname":"Landa","age":21,"gender":"male","birthday":"2000/03/10","phone":"0123456789","email":"dela@landas.io"}'

```

graphql...

```

curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { postPerson(input:{name:\"Cula\",surname:\"Javu\",age:null,gender:\"\",birthday:\"2001/07/07\",phone:\"0120456432\",email:\"cula@javu.io\"}){email}}"}' \
http://localhost:8000/graphql

```
## And more CRUD...

View Person:

cURL...

```
curl --get http://localhost:8000/person?paginator=email,email,1,5,data,orderby,page,limit,person

```

graphql...
```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "{getPersonPage(page: \"email,email,1,15,data\", plimit: 15){ id, name, email,id,name,surname,email, contacts{id, contactsemail, personemail}, created, modified }}"}' \
http://localhost:8000/graphql

```

Create contacts:

curl....

```
curl -X POST -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/postcontacts \
--data '{"personid":5,"contactsid":9,"contactsname":"Renny","contactsphone":"0123050789","contactsemail":"renny@ron.io","personemail":"conny@con.io" }'


```

graphql...

````
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { postContacts(input:{personid:7,contactsid:9,contactsname:\"Renny\",contactsphone:\"0123050789\",contactsemail:\"renny@ron.io\",personemail:\"jonny@jon.io\"}){contactsname,contactsemail}}"}' \
http://localhost:8000/graphql

````

Update person

curl...
```
curl -X PUT -H 'Accept: application/json' \
-H 'Content-type: application/json' http://localhost:8000/updateperson/9 \
--data '{"name":"Rela","surname":"Randa", "age":21,"gender":"male","birthday":"2000/03/10","phone":"0100345678","email":"rela@randas.io"}'


```

qraphql...
```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { updatePerson(id: 27 input:{name:\"Ezoy\",surname:\"Hony\",age:null,gender:\"male\",birthday:\"1980/10/07\",phone:\"0120070002\",email:\"ezoy@hony.io\"}){name, surname, phone, email}}"}' \
http://localhost:8000/graphql

```
Delete person:

cURL....

```
curl -X "DELETE" \
-H 'Content-type: application/json' http://localhost:8000/deleteperson/25 \
--data '{"email": "qony@qon.io", "personid": 25}'

```

graphql...

```
curl -X POST \
-H "Content-Type:application/json" \
-d'{"query": "mutation { deletePerson(id: 13, input:{email:\"benny@bon.io\"}){id, email}}"}' \
http://localhost:8000/graphql

```
