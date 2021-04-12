////////////////////////////////////////////
//
// restperson.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidator');
const restcontacts = require('./restcontacts');
const dbperson = require('../dbapi/person');
const Person = dbperson.Person;
const dbcontacts = require('../dbapi/contactslist');
const Contactslist = dbcontacts.Contactslist;

var pc = 0;
var pc2 = 0;
var pc3 = 0;
var pc10 = 0;
var pid = 5000;

const postPerson = (req, res) => {
  console.log(dbTime()+"#1 Post person#"+pc++);
  try {
    const {name, surname, age, gender, birthday, phone, email} = req.body;
    var age2 = dbvalidator.checkAge(parseInt(age), birthday);
    var gender2 = dbvalidator.checkGender(gender);
    var name2 = dbvalidator.checkData(name);
    var surname2 = dbvalidator.checkData(surname);
    var email2 = dbvalidator.checkData(email);
    var birthday2 = dbvalidator.checkData(birthday, 1);
    var phone2 = dbvalidator.checkData(phone, 1);
    if((name2 == "") | (surname2 == "") | (email2 == "")){
      res.json({Person: "dataError"+pc++, Error: "dterror"});
      console.log(dbTime()+" Done 0000..."+pc++, name2);
      return 0;
    }
    console.log(dbTime()+"#2 postPerson "+pc++, name2, age2);
    var contacts = null;
    var sqlString = 'INSERT INTO person (name, surname, age, gender, birthday, phone, email, contacts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    var sqlValues = [name2, surname2, age2, gender2, birthday2, phone2, email2, contacts];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+" postPerson dberror: "+pc++, err);
        res.json({Person: "dberror"+pc++, Error: err});
      } else {
        //console.log(pc, "postPerson", results);
        //res.json({Person: results, Info: pc, Name: name});
        console.log(dbTime(), "#3 postPerson: "+pc++, results["rowCount"]);
        res.json({Person: results["rowCount"]});
      }
    });
  } catch (e) {
    console.log(dbTime()+"#4 postPerson : "+pc++, e);
  } finally {
    console.log(dbTime()+"#5 postPerson Done: "+pc++);
  }
  console.log(dbTime()+"###6 postPerson Done: ###"+pc++);
};

const getPerson = async (req, res) => {
  var dy = new Date();
  var dblist = {ref: dbTime()};
  var done = false;
  var done2 = false;
  var personPg = {};
  try {
    var page = req.query.paginator;
    //var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: "", created: "", modified: "", pagination: true, page: "email,email,1,10,0", ref: "setupDb@2021"};
    //Person(id, {name, surname, age, gender, birthday, phone, email, contacts, created, modified,pagination,page, ref})
    var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: {}, created: "", modified: "", pagination: true, page: page, ref: "setupDb@2021"};
    dblist = new Person(++pid, input);
    dblist.getdbData().then((value) => {
      done = true;
      personPg = value;
      var dx0 = new Date();
      var dx0y = dx0 - dy;
      console.log(dbTime()+" #1 001 ///@///#: "+pc++, dx0y);
      console.log(dbTime()+" #2 001.1 getDataPage  #: "+pc++, dblist.ref);
      //res.json(personPg);
      //return personPg;
    }).catch((error) => {
      console.log(dbTime()+" getPerson db 001: @ "+pc++, error);
      // getPerson db 001: @  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers
      // after they are sent to the client
      // at ServerResponse.setHeader (_http_outgoing.js:)
    });
  } catch (e) {
    console.log(dbTime()+" getPerson: "+pc++, e)
  } finally {
    console.log(dbTime()+"#3 dbList Done: "+pc++);
  }

  var person1 = {};
  var contacts1 = {};
  var waitFor = 0;
  var waitX = 0;

  if(done){
    console.log(dbTime()+"#4 done: "+pc++, dblist);
    //res.json(personPg);
  } else {
    console.log(dbTime()+"#5 waitingFor :"+pc++, dblist.ref);
  }
  dblist.getPersonList().then((value) => {
    person1 = value;
    done2 = true;
    waitFor = 1001;
    console.log(person1);
    console.log(dbTime()+"#6  002 A01/////////////////////#: "+pc++);
    //res.json(person1);
    //return person1;
  }).catch((error) => {
    console.log(dbTime()+" getPersonList db 0002: @"+pc++, error);
  });
  console.log(dbTime()+" #7 A02/////////////////////#: "+pc++);
  var person = {};
  var contacts = {};
  if(done2){
    res.json(person1);
  }
  return new Promise ((resolve, reject) => {
    var dy = new Date()
    var dx;
    var dxy = 0;
    setTimeout(function(){
      console.log(dbTime()+"#8 waitFor: "+pc++, waitFor);
      contacts = dblist.getdbData().then((value) => {
        dx = new Date();
        person = value;
        console.log(dbTime()+"#9 #003 dblist: "+pc++, person)
        dxy = dx - dy;
        console.log(dbTime()+"#10 #003 getdbData  Done # @: "+pc++, dxy);
        resolve(db3Data(person));
        res.json(person);
        //return person;
      }).catch((error) => {
        console.log(dbTime()+" getPerson bb3: @"+pc++, error);
      });
    }, 1001);
    var dx2 = new Date();
    var dxy2 = dx2 - dy;
    console.log(dbTime()+" #11 3 000 /////////////////#32: @ "+pc++, dxy2);
  });
  console.log(dbTime()+" #12 4 000 PgData2 Done: "+pc++);
}

const putPerson = async (req, res) => {
  console.log(dbTime()+"#1 Put person# "+pc++);
  var dy = new Date();
  var done = false;
  var done2 = false;
  var personPg = {};
  var dbPerson = {};
  try {
    const id = parseInt(req.params.id);
    const {name, surname, age, gender, birthday, phone, email} = req.body;
    var input = {name: name, surname: surname, age: age, gender: gender, birthday: birthday, phone: phone, email: email, data: ""+pc++};
    dbPerson = new Person(id, input);
    dbPerson.updatePerson(dbPerson).then((value) => {
      done = true;
      personPg = value;
      var dx0 = new Date();
      var dx0y = dx0 - dy;
      console.log(dbTime()+" #2 001 ///@///#: "+pc++, dx0y);
      console.log(dbTime()+" #3 001.1 updatePerson  #: "+pc++, value);
      res.json(personPg);
      //return personPg;
    }).catch((error) => {
      console.log(dbTime()+" putPerson db 001: @ "+pc++, error);
      //EXpect: getPerson db 001: @  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after the
      //y are sent to the client
      //at ServerResponse.setHeader (_http_outgoing.js:)
    });
  } catch (e) {
    console.log(dbTime()+" putPerson: "+pc++,e)
  } finally {
    console.log(dbTime()+"#4 putPerson Done: "+pc++);
  }
  if(done){
    console.log(dbTime(),personPg);
    //res.json(personPg);
  } else {
    console.log(dbTime(), "waitingFor :"+dbPerson.ref);
  }
}

const deletePerson = async (req, res) => {
  console.log(dbTime()+"#1 deletePerson #"+pc++);
  var dy = new Date();
  var done = false;
  var done2 = false;
  var personPg = {};
  var dbPerson = {};
  try {
    var id = parseInt(req.params.id);
    const {personid, email} = req.body;
    var personid2 = parseInt(personid);
    var email2 = dbvalidator.checkData(email);
    var input = {name: "", surname: "", age: "", gender: "", birthday: "", phone: "", email: email2, data: ""+pc++};
    dbPerson = new Person(personid2, input);
    dbPerson.deletePerson(dbPerson).then((value) => {
      done = true;
      personPg = value;
      var dx0 = new Date();
      var dx0y = dx0 - dy;
      console.log(dbTime()+" #2 001 ///@///#: "+pc++, dx0y);
      console.log(dbTime()+" #3 001.1 deletePerson  #: "+pc++, value);
      res.json(personPg);
      //return personPg;
    }).catch((error) => {
      console.log(dbTime()+" deletePerson db 001: @ "+pc++, error);
      //..Person db 001: @  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after the
      //y are sent to the client
      //at ServerResponse.setHeader (_http_outgoing.js:)
    });
  } catch (e) {
    console.log(dbTime()+" deletePerson: "+pc++, e)
  } finally {
    console.log(dbTime()+"#4 deletePerson Done: "+pc++);
  }
  if(done){
    console.log(dbTime()+"#5 "+pc++, personPg);
    //res.json(personPg);
  } else {
    console.log(dbTime()+"#6 waitingFor :"+pc++, dbPerson.ref);
  }
}

/*
const deletePersonT = (req, res) => {
  console.log(dbTime()+" Delete person# "+pc2++);
  try {
    const id = parseInt(req.params.id);
    var countP = restcontacts.countContacts(id, "personid");
    var countC = restcontacts.countContacts(id, "contactsid");
    console.log("personid: "+countP, "contactsid: "+countC);
    if (countP > 0){
      var dbc2 = deleteContactsPid(id, req, res);
      console.log(dbTime(), dbc2);
    }
    if (countC > 0){
      var dbc3 = deleteContactsCid(id, req, res);
      console.log(dbTime(), dbc3);
    }
    ////////////////////
    db.pool.query('DELETE FROM person WHERE id = $1', [id], (err, resp) => {
      if (err) {
        console.log(dbTime(), err, "dberror: "+pc2++);
        res.json({deletePerson: "dberror"+pc2, Error: err});
      } else {
        console.log(dbTime()+" @"+id, resp.rows, "deletePerson: "+pc2++);
        res.json({deletePerson: resp.rows});
      }
    });

  } catch (e) {
    console.log(dbTime()+" deletePerson: "+pc++, e)
  } finally {
    console.log(dbTime()+" deletePerson: "+pc++);
  }
};
*/
/*
const getPersonByIdT = (req, res) => {
  console.log(dbTime()+" Get person# "+pc3++);
  const pid = parseInt(req.params.id);
  db.pool.query('SELECT * FROM person WHERE id = $1', [pid], (err, resp) => {
    if (err) {
      console.log(dbTime(), err, "dberror: "+pc3++);
      res.json({Person: "dberror"+pc3, Error: err});
    } else {
      console.log(dbTime(), "Person: "+pc3++, resp.rows, "pid: "+pid);
      res.json(resp.rows);
    }
  });
};
*/
/*
var deleteContactsPid = async (id) => {
  db.pool.query('DELETE FROM contactslist WHERE personid = $1', [id], (err, resp) => {
    if (err) {
      console.log(dbTime()+" dberror: "+pc2++, e);
      //res.json({deletePerson: "dberror"+pc2, Error: err});
      return -1;
    } else {
      console.log(dbTime()+" @"+id, resp.rows, "deletePerson: "+pc2++);
      //res.json({deletePerson: resp.rows});
      return resp.rows;
    }
  });
};
*/
/*
var deleteContactsCid = async (id) => {
  db.pool.query('DELETE FROM contactslist WHERE contactsid = $1', [id], (err, resp) => {
    if (err) {
      console.log(dbTime()+" dberror: "+pc2++, e);
      //res.json({deletePerson: "dberror"+pc2, Error: err});
      return -1;
    } else {
      console.log(dbTime()+" @"+id, resp.rows, "deletePerson: "+pc2++);
      //res.json({deletePerson: resp.rows});
      return resp.rows;
    }
  });
};
*/
/*
var deletePersonPC = async (id) => {
  db.pool.query('DELETE FROM person WHERE id = $1', [id], (err, resp) => {
    if (err) {
      console.log(dbTime(), err, "dberror: "+pc2++);
      //res.json({deletePerson: "dberror"+pc2, Error: err});
      return -1
    } else {
      console.log(dbTime()+" @"+id, resp.rows, "deletePerson: "+pc2++);
      //res.json({deletePerson: resp.rows});
      return resp.rows;
    }
  });
};
*/

function dbsql(orderby = "email"){
  if ( orderby == "id") {
    return 'SELECT * FROM person ORDER BY id OFFSET $1 LIMIT $2';
  } else if ( orderby == "name") {
    return 'SELECT * FROM person ORDER BY name OFFSET $1 LIMIT $2';
  } else if ( orderby == "surname") {
    return 'SELECT * FROM person ORDER BY surname OFFSET $1 LIMIT $2';
  }
  return 'SELECT * FROM person ORDER BY email OFFSET $1 LIMIT $2';
}

var db3Data = async (data) => {
  var ref = dbTime();
  try {
    ref = require('crypto').randomBytes(10).toString('hex');
    var data2 = data;
    data2[0]["ref"] = ref;
    return data2;
  } catch (e) {
    console.log(dbTime()+" db3Data: "+pc++, e);
  } finally {
    console.log(dbTime()+" db3Data Done  @: "+pc++, ref);
  }
  return [{ref: ref}];
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

module.exports = {
  postPerson,
  getPerson,
  putPerson,
  deletePerson,
  dbTime
}
