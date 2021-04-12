////////////////////////////////////////////
//
// index.js
// Author: Brian M
//
///////////////////////////////////////////

console.log("Start...");
var express = require('express');
var bodyParser = require('body-parser');
const restperson = require('./restapi/restperson');
const restcontacts = require('./restapi/restcontacts');
var { graphqlHTTP } = require('express-graphql');
const graphqlapi = require('./graphqlapi/gqlschema');

var app = express();
var now = new Date();
var pc = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname+'/app'));

app.set('port', (process.env.PORT || 8000));

app.get('/', function(req, res) {
  console.log(dbTime()+" Get index#"+ pc++);
  res.sendFile(__dirname +'/'+'app/pages/index.html');
});

app.get('/app', function(req, res) {
  console.log(dbTime()+" Get app#"+ pc++);
  res.sendFile(__dirname +'/'+'app/pages/newperson.html');
});

app.get('/app2', function(req, res) {
  console.log(dbTime()+" Get app2#"+ pc++);
  res.sendFile(__dirname +'/'+'app/pages/app2.html');
});

app.use('/postperson', restperson.postPerson);
app.use('/person', restperson.getPerson);
app.use('/updateperson/:id', restperson.putPerson);
app.use('/deleteperson/:id', restperson.deletePerson);
app.use('/postcontacts', restcontacts.postContacts);
app.use('/getcontacts/:pid', restcontacts.getContactsByPid);
app.use('/deletecontacts', restcontacts.deleteContacts);
app.use('/contacts', restcontacts.getContacts);

app.use('/graphql', graphqlHTTP ({
  schema: graphqlapi.schema,
  rootValue: graphqlapi.root,
  graphiql: true,
}));

app.get('/graphqlapp', function(req, res) {
  console.log(dbTime()+" Get graphqlapp#"+ pc++);
  res.sendFile(__dirname +'/'+'app/pages/graphqlapp.html');
});

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

var pport = app.get('port');
app.listen(pport, function() {
  console.log('App is now running at http://localhost:'+pport+'/');
  console.log('Hit CTRL-C to stop the server');
  console.log(now, dbTime(), pc++);
  console.log('GraphQL API is now running at http://localhost:'+pport+'/graphql');
});
