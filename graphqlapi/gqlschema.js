///////////////////////////////
//
// gqlschema.js
// @Author: Brian
//
////////////////////////////

var { buildSchema } = require('graphql');
const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidator');
const dbperson = require('../dbapi/person');
const Person = dbperson.Person;
const dbcontacts = require('../dbapi/contactslist');
const Contactslist = dbcontacts.Contactslist;

var myDB = {};
var myDB2 = {};
var pc = 0;
var pid = 0;
var pid2 = 0;
var pc2 = 0;
var dDate = dbperson.dbDate();
console.log(dDate);
var temp = {
  id: pid++,
  name: 'Cool',
  surname: 'Deal',
  age: 22,
  gender: '',
  birthday: '',
  phone: '',
  email: pid+'cool@deal.de',
  contacts: [Object],
  created: dDate,
  modified: dDate,
  ref: '22cfee09947f43a5867b',
  page: "email,email,1,10,0",
  pagination: true,
  offset: 0
}

var schema = buildSchema (`
  input PersonInput {
    id: Int
    name: String
    surname: String
    age: Int
    gender: String
    birthday: String
    phone: String
    email: String
    contacts: [ContactsInput]
    created: String
    modified: String
    pagination: Boolean
    page: String
    offset: Int
    qsize: Int
    ref: String
  }

  input ContactsInput {
    personid: Int
    contactsid: Int
    contactsname: String
    contactsphone: String
    contactsemail: String
    personemail: String
    pagination: Boolean
    page: String
    offset: Int
    qsize: Int
    ref: String
  }

  type Person {
    id: Int
    name: String
    surname: String
    age: Int
    gender: String
    birthday: String
    phone: String
    email: String
    contacts: [Contactslist]
    created: String
    modified: String
    pagination: Boolean
    page: String
    offset: Int
    qsize: Int
    personList: [Person]
    contactsList: [Contactslist]
    dbPersonList: [Person]
    ref: String
  }

  type Contactslist {
    id: Int
    personid: Int
    contactsid: Int
    contactsname: String
    contactsphone: String
    contactsemail: String
    personemail: String
    pagination: Boolean
    page: String
    offset: Int
    qsize: Int
    ref: String
  }

  type Query {
    getPersonPage(page: String, plimit: Int): [Person]
    getContactsPage(page: String, id: Int): [Person]
    getContacts(page: String, plimit: Int): [Person]
  }

  type Mutation {
    postPerson(input: PersonInput): Person
    updatePerson(id: Int, input: PersonInput): Person
    deletePerson(id: Int, input: PersonInput): Person
    postContacts(input: ContactsInput): Contactslist
    deleteContacts(id: Int, input: ContactsInput): Contactslist
  }
`);

var root = {
  postPerson: ({input}) => {
    var pperson = new Person(pid++, input);
    var results = {"postPerson": pc++};
    console.log(dbTime()+"#1 postPerson: "+pc++, pperson);
    if((pperson.name == "") | (pperson.surname == "") | (pperson.email == "")){
      console.log(dbTime(), pperson.name, "dbErr postPerson 0000..."+pc++);
      return [{"dbError": dbTime()}];
    }
    pperson.contacts = {};
    pperson.postPerson(pperson).then((res) =>{
      results = res;
      console.log(dbTime()+"#2 postPerson: "+pc2++, res);
      return pperson;
    }).catch((error) =>{
      console.log(dbTime(), error);
    });
    //myDB[pid-1] = pperson;
    console.log(dbTime()+"#3 pid: "+pid+" ref: "+pperson.ref);
    console.log(dbTime()+"#4 postPerson Results: "+pc++, results);
    return pperson
  },
  getPersonPage: ({page, plimit}) => {
    var dy = new Date();
    var done = false;
    var personPg = {};
    var dblist = {ref: dbTime()};
    //var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: "", created: "", modified: "", pagination: true, page: "email,email,1,10,0", ref: "setupDb@2021"};
    //Person(id, {name, surname, age, gender, birthday, phone, email, contacts, created, modified,pagination,page, ref})
    var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: "", created: "", modified: "", pagination: true, page: page, ref: "setupDb@2021"};
    dblist = new Person(++pid, input);
    dblist.getdbData().then((value) => {
      done = true;
      personPg = value;
      var dx0 = new Date();
      var dx0y = dx0 - dy;
      console.log(dbTime()+" #1 0111 ///@///#: "+dx0y);
      console.log("#2 getDataPage  #: "+dblist.ref);
      //return personPg;
    }).catch((error) => {
      console.log(dbTime()+" getdbData: @ "+pc++, error);
    });

    var person1 = {};
    var contacts1 = {};
    var waitFor = 0;
    var waitX = 0;

    if(done){
      console.log(dbTime()+"#3 done: "+pc++, dblist);
    } else {
      console.log(dbTime()+"#4 waitingFor :"+dblist.ref);
    }
    dblist.getPersonList().then((value) => {
      person1 = value;
      waitFor = 1001;
      //console.log(person1);
      console.log(dbTime()+" #5 0222 A01/////////////////////#: "+pc++);
      return person1;
    }).catch((error) => {
      console.log(dbTime()+" getPersonList : @ "+pc++, error);
    });
    console.log(dbTime()+" #6 A02/////////////////////#: "+pc++);
    var person = {};
    var contacts = {};
    return new Promise ((resolve, reject) => {
      var dy = new Date()
      var dx;
      var dxy = 0;
      setTimeout(function(){
        console.log(dbTime()+"#7  1 0333 dblist waitFor: "+pc++, waitFor);
        contacts = dblist.getdbData().then((value) => {
          dx = new Date();
          person = value;
          console.log(dbTime()+" #8  2 0333 dblist: ", person)
          dxy = dx - dy;
          console.log(dbTime()+" #9  3 0333 getdbData  Done # @: "+dxy);
          resolve(db2Data(person));
          return person;
        }).catch((error) => {
          console.log(dbTime()+"#  4 0333 getdbData : @ "+pc++, error);
        });
      }, 1001);
      var dx2 = new Date();
      var dxy2 = dx2 - dy;
      console.log(dbTime()+" #10  3 000 /////////////////#32: @ "+dxy2);
    });
    console.log(dbTime()+" #11  4 000 PgData2 Done: "+pc++);
  },
  updatePerson: ({id, input}) => {
    console.log(dbTime()+"#1 updatePerson: "+id, input);
    var uperson = new Person(id, input);
    var results = {};
    console.log(dbTime()+"#2 updatePerson: ", uperson);
    if((uperson.name == "") | (uperson.surname == "") | (uperson.email == "")){
      console.log(dbTime(), uperson.name, "dbErr postPerson 0000..."+pc++);
      return [{"dbError": dbTime()}];
    }
    uperson.updatePerson(uperson).then((res)=>{
      results = res;
      console.log(dbTime()+"#3 updatePerson "+pc++, res);
      return uperson;
    }).catch((error) =>{
      console.log(dbTime()+" updatePerson: ", error);
    });
    //myDB[id] = uperson;
    console.log(dbTime()+"#4 pid: "+id+" ref: "+uperson.ref);
    console.log(dbTime()+"#5 updatePerson Results: ", results);
    return uperson;
  },
  deletePerson: ({id, input}) => {
    console.log(dbTime()+"#1 deletePerson: "+pc++," "+id);
    var id2 = parseInt(id);
    var input2 = {name: "", surname: "", age: "", gender: "", birthday: "", phone: "", email: input.email, data: ""+pc++};
    if(isNaN(id2) | (input2.email == "")){
      console.log(dbTime()+" dbErr deletePerson 0000..."+pc++);
      return [{"dbError": dbTime()}];
    }
    var dperson = new Person(id2, input2);
    var done = false;
    console.log(dbTime()+"#2 deletePerson: "+pc++, dperson);
    var results = {"deletePerson": pc++};
    dperson.deletePerson(dperson).then((res) =>{
      results = res;
      console.log(dbTime()+"#3 deletePerson: "+pc++, res);
      done = true;
      return dperson;
    }).catch((error) =>{
      console.log(dbTime()+" deletePerson: "+pc++, error);
    });
    //myDB[id] = {};
    console.log(dbTime()+"#4 ref: "+pc++, dperson.ref);
    console.log(dbTime()+"#5 deletePerson Results: "+pc++, results);
    if(done){
      console.log(dbTime()+"#6 ",personPg);
    } else {
      console.log(dbTime()+"#7 waitingFor :"+dperson.ref);
    }
    console.log(dbTime()+"#8 "+pc++, results);
    return dperson
  },
  postContacts: ({input}) => {
    var contacts = new Contactslist(pid2++, input);
    console.log(dbTime()+" postContacts: "+pc2++, contacts);
    if((contacts.personid == "") | (contacts.contactsid == "") | (contacts.contactsemail == "")){
      console.log(dbTime(), "Done 0000..."+pc2++);
      return [{"dbError": dbTime()}];
    }
    //contacts.ref = require('crypto').randomBytes(10).toString('hex');
    //myDB2[pid2-1] = contacts;
    console.log(dbTime()+"#1 ref: "+pc2++, contacts.ref);
    contacts.postContacts(contacts).then((res) =>{
      console.log(dbTime()+"#2 postContacts: "+pc2++, res);
      return contacts;
    }).catch((error) =>{
      console.log(dbTime()+" Contacts "+pc2++, error);
    });
    console.log(dbTime()+" #3 ref: "+pc2++, contacts.ref);
    return contacts;
  },
  deleteContacts: ({id, input}) => {
    var results = {"deleteContacts": "id "+id+", "+pc2++};
    var contacts = {};
    try {
      console.log(dbTime()+"#1 deleteContacts: "+pc2++, results)
      contacts = new Contactslist(pid2++, input);
      if((contacts.personid == "") | (contacts.contactsid == "") | (contacts.contactsemail == "")){
        console.log(dbTime(), "Done 0000..."+pc++);
        return [{"dbError": dbTime()}];
      }
      console.log(dbTime()+"#2 ref: "+pc2++, contacts.ref);
      contacts.deleteContacts(contacts).then((res) =>{
        results = res;
        console.log(dbTime()+"#3 deleteContacts: ", res);
        return contacts;
      }).catch((error) =>{
        console.log(dbTime()+"001 deleteContacts "+pc2++, error);
      });
      console.log(dbTime()+" #4 results: "+results);
    } catch (e) {
      console.log(dbTime()+"002 deleteContacts "+pc2++, e);
    } finally {
      console.log(dbTime()+"#5 deleteContacts: "+pc2++, results);
    }
    console.log(dbTime()+"#6 Delete Contacts: "+pc2++, results);
    return contacts;
  },
  getContacts: ({page, plimit}) => {
    console.log(dbTime()+"#1 getContacts: "+pc2++, page, plimit);
    var db1 = {};
    var db2 = {};
    var personPg = {};
    //var contacts = {}''
    var done = false;
    try {
      var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: "", created: "", modified: "", pagination: "", page: "", ref: ""};
      personPg = new Person(++pid, input);
      //var input = {personid: 0, contactsid: 0, contactsname: "", contactsphone: "", contactsemail: "", personemail: "", listdate: "", modified: ""}
      //var contacts = new Contactslist(++pid, input);
      var pg = dbvalidator.dbpaginator(page);
      if (pg[0] == 0) {
        console.log(dbTime()+" getContacts dberror: "+pc2++);
        return [{ContactsList: "dberror"+pc2++}];
      }
      console.log(dbTime()+"#2 orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]);
      db.pool.query(dbcontacts.dbsql(pg[0]), [pg[1], pg[2]], (err, resp) => {
        if (err) {
          console.log(dbTime()+" dberror: "+pc2++, err);
          return [{ContactsList: "dberror"+pc2++, Error: err}];
        } else {
          console.log(dbTime()+"#3 Contacts: "+pc2++);
          db1 = JSON.stringify(resp["rows"]);
          db2 = JSON.parse(db1);
          personPg.contacts = db2;
          done = true;
          console.log(dbTime()+"#4 Contacts: "+pc2++, personPg);
          console.log(dbTime()+"#5 Contacts: "+pc2++, personPg.contacts);
          console.log(dbTime()+"#6 ##/////////////////##"+pc2++, done);
          return personPg;
          console.log(dbTime()+"#7 Contacts: "+pc2++, done);
        }
      });
    } catch (e) {
      console.log(dbTime()+"## getContacts: "+pc2++, e);
    } finally {
      console.log(dbTime()+"#8 getContacts: Done "+pc2++, done);
    }
    console.log(dbTime()+"#9 getContacts: "+pc2++, done, personPg);
    console.log(dbTime()+"#10 ##/////////////////##"+pc2++);
  },
  getContactsPage: ({page, id}) => {
    console.log(dbTime()+"#1 getContacts: "+pc2++, id, page);
    var db1 = {};
    var db2 = {};
    var personPg = {};
    //var contacts = {}''
    var done = false;
    try {
      var input = {name: "N", surname: "S", age: "", gender: "", birthday: "", phone: "", email: "e@m.io",contacts: "", created: "", modified: "", pagination: "", page: "", ref: ""};
      personPg = new Person(++pid, input);
      //var input = {personid: 0, contactsid: 0, contactsname: "", contactsphone: "", contactsemail: "", personemail: "", listdate: "", modified: ""}
      //var contacts = new Contactslist(++pid, input);
      var pg = dbvalidator.dbpaginator(page);
      if (pg[0] == 0) {
        console.log(dbTime()+" getContacts dberror: "+pc2++);
        return [{ContactsList: "dberror"+pc2++}];
      }
      var id2 = parseInt(id);
      console.log(dbTime()+" SELECT ... personid: "+pid+" orderby: "+pg[0]+" offset: "+pg[1]+" limit: "+pg[2]);
      db.pool.query(dbcontacts.dbsqlContacts(pg[0]), [id2, pg[1], pg[2]], (err, resp) => {
        if (err) {
          console.log(dbTime()+" dberror: "+pc2++, err);
          return [{ContactsList: "dberror"+pc2++, Error: err}];
        } else {
          console.log(dbTime()+"#3 Contacts: "+pc2++);
          db1 = JSON.stringify(resp["rows"]);
          db2 = JSON.parse(db1);
          personPg.contacts = db2;
          done = true;
          console.log(dbTime()+"#4 Contacts: "+pc2++, personPg);
          console.log(dbTime()+"#5 Contacts: "+pc2++, personPg.contacts);
          console.log(dbTime()+"#6 ##/////////////////##"+pc2++, done);
          return personPg;
          console.log(dbTime()+"#7 Contacts: "+pc2++, done);
        }
      });
    } catch (e) {
      console.log(dbTime()+"## getContacts: "+pc2++, e);
    } finally {
      console.log(dbTime()+"#8 getContacts: Done "+pc2++, done);
    }
    console.log(dbTime()+"#9 getContacts: "+pc2++, done, personPg);
    console.log(dbTime()+"#10 ##/////////////////##"+pc2++);
  },
  getContactsPageT: ({page, id}) => {
    var results = {"getContactsPage": "id, page, "+id+", "+page+", "+pc2++};
    try {
      console.log(dbTime()+"#1 getContactslist: "+pc2++, results);
      var input = {personid: id, contactsid:"0", contactsname:"", contactsphone:"", contactsemail:"", personemail:"", listdate: "", modified: ""};
      var contacts = new Contactslist(++pid, input);
      contacts.getContactsByPid(page, contacts).then((value) => {
        results = value;
        console.log(dbTime()+"#2 getContactsByPid: "+pc2++, value);
        return results;
      }).catch((error) => {
        console.log(dbTime()+"#3 getContactsByPid: "+pc2++, error);
      });
    } catch (e) {
      console.log(dbTime()+"#4 getContactsByPid: "+pc2++, e);
    } finally {
      console.log(dbTime()+"#5 getContactsByPid: "+pc2++, results);
    }
    console.log(dbTime()+"#6 getContactsByPid: "+pc2++, results);
  },
};

async function db2Data(data){
  var ref = dbTime();
  try {
    var data2 = data;
    ref = require('crypto').randomBytes(10).toString('hex');
    data2[0]["ref"] = ref;
    return data2;
  } catch (e) {
    console.log(dbTime()+" db2Data: "+pc++, e);
  } finally {
    console.log(dbTime()+" db2Data Done: "+pc++);
  }
  return [{"ref": ref}];
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

//Date.
const dbDate = () => {
  var now = new Date();
  return now.getFullYear()+"/"+now.getMonth()+"/"+now.getDate();
};

async function refDb() {
   return require('crypto').randomBytes(10).toString('hex');
}

module.exports = {
  schema,
  root
}
