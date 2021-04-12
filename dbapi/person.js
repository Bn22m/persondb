///////////////////////////////
//
// person.js
// @Author: Brian
//
////////////////////////////

const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidator');
const dbcontacts = require('./contactslist');
const Contactslist = dbcontacts.Contactslist;

var myDB = {};
var myDB2 = {};
var pc = 0;
var pid = 0;
var pid2 = 0;
var pc2 = 0;

class Person {
  constructor(id, {name, surname, age, gender, birthday, phone, email, contacts="", created="", modified="", pagination="", page="", ref=""}) {
    this.id = parseInt(id);
    this.name = dbvalidator.checkData(name);
    this.surname = dbvalidator.checkData(surname);
    this.age = dbvalidator.checkAge(age, birthday);
    this.gender = dbvalidator.checkGender(gender);
    this.birthday = dbvalidator.checkData(birthday, 1);
    this.phone = dbvalidator.checkData(phone, 1);
    this.email = dbvalidator.checkData(email);
    this.contacts = [{contacts}]
    this.created = dbvalidator.checkData(created, 1);
    this.modified = dbvalidator.checkData(modified, 1);
    this.ref = refDb()+this.email;
    this.page = dbvalidator.checkData(page);
    this.offset = 0;
    //
    this.qsize = 0;
    this.setupDone = false;
    this.personDone = false;
    this.contactsDone = false;
    this.dbDataDone = false;
    this.count = 0;
    this.personList = {};
    this.contactsList = {};
    this.dbPersonList = {};
    this.doneLists = 0;
    //
    this.pagination = pagination;
    this.dy = new Date();
    console.log("Person: "+dbTime(), this.ref+this.email);
    if(pagination && (ref == "setupDb@2021")){
      this.setPerson(page);
      //Pagination String is included with it.
      //paginator=email,email,1,1,data,orderby,page,limit,person2021/4/2 20:
    }
  }

  //StartUp Get person info: Pagination:///
  async setPerson(page){
    var p3 = 0;
    this.setPersonPage(page);
    this.setContactsPage(page);
    console.log(dbTime()+"setPerson: ");
    var dx = new Date();
    var dxy = dx - this.dy;
    console.log(dbTime(), this.personDone, this.contactsDone," @ "+dxy);
  }

  async getPersonList(){
    console.log(dbTime()+" getPersonList @0001: "+pc++);
    if(this.dbDataDone){
      console.log(dbTime()+" getPersonList @0002: "+pc++);
      return this.dbPersonList;
    } else {
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));
      console.log(dbTime()+" getPersonList @3000: "+pc++);
      return this.dbPersonList;
    }
  }

  async getContactsList(){
    await new Promise(resolve => setTimout(resolve, 4000));
    return this.contactsList;
  }

  async getdbData(dx = 0){
    console.log(dbTime()+" getdbData: "+dx+"/"+pc++);
    if(this.dbDataDone){
      dx = 0;
      return this.getPersonList();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1200));
      if(dx < 3){
        return this.getdbData(++dx);
      } else {
        return this.getPersonList();
      }
    }
  }

  async setPersonPage(page){
    var db1 = {};
    var db2 = {};
    var done = false;
    try {
      var pg = dbvalidator.dbpaginator(page);
      if (pg[0] == 0) {
        console.log(dbTime()+" dberror: "+pc2++);
        return {};
      }
      //console.log(dbTime(), "orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]+" "+pc2++);
      db.pool.query(dbsql(pg[0]), [pg[1], pg[2]], (err, resp) => {
        if (err) {
          console.log(dbTime(), err, "dberror: "+pc2++);
          return {};
        } else {
          //console.log(dbTime(), resp["rows"].length, "Person: "+pc2++);
          db1 = JSON.stringify(resp["rows"]);
          //console.log(db1);
          db2 = JSON.parse(db1);
          this.personList = db2;
          //console.log("db2: ", db2, db2.length);
          //resolve(dbData(db2));
          //console.log("db2 Person: ", db2.length);
          //console.log(dbTime(), "dbP1 Person Done: "+pc2++);
          //this.personDone = true;
          //this.dbPersonList = db2;
          this.dbDataList("personDone");
          //console.log(dbTime(), "##  dbP1 Person Done  #: "+pc2++);
          //console.log("# personList: ", db2, db2.length);
          //return db2;
        }
      });
    } catch (e) {
      console.log(dbTime()+" personList db Perror: "+pc2++, e);
    } finally {
      console.log(dbTime()+" dbP2 Person Done: "+pc2++, done);
    }
    //this.personDone = true;
    //return db2;
    //return {"page": page};
  }

  async setContactsPage(page){
    var db1 = {};
    var db2 = {};
    var done = false;
    try {
      var pg = dbvalidator.dbpaginator(page);
      if (pg[0] == 0) {
        console.log(dbTime()+" dberror: "+pc2++);
        return {};
      }
      //console.log(dbTime(), "orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]+" "+pc2++);
      db.pool.query(dbsqlContacts(pg[0]), (err, resp) => {
      if (err) {
        console.log(dbTime()+" dberror: "+pc2++, err);
        this.dbDataList("contactsDone");
        return {};
      } else {
        //console.log(dbTime(), resp["rows"].length, "Person: "+pc2++);
        db1 = JSON.stringify(resp["rows"]);
        //console.log(db1);
        db2 = JSON.parse(db1);
        this.contactsList = db2;
        //console.log("db2: ", db2, db2.length);
        //resolve(dbData(db2));
        //console.log("db2 Contacts: ", db2.length);
        //console.log(dbTime(), "dbP1 ContactsL done: "+pc2++);
        //this.contactsDone = true;
        this.dbDataList("contactsDone");
        //console.log(dbTime(), "## dbP2 ContactsL done @#: "+pc2++);
        //console.log("# contactsList: ", db2);
        //return db2;
        done = true;
        }
      });
    } catch (e) {
      console.log(dbTime()+" dbContactsCerror: "+pc2++, e);
    } finally {
      console.log(dbTime()+"dbP2 ContactsL: "+pc2++, done);
    }
    //if(!done){
      //this.contactsDone = true;
      //this.dbDataList("contactsDone");
      //return db2;
    //}
    //return {"page": page};
  }

  async dbDone(done){
    if(done === "dbDataDone"){
      this.dbDataDone = true;
      this.doneLists += 1;
    }
    console.log(dbTime()+"dbDone: "+done+" "+this.dbDataDone);
    console.log(dbTime()+"doneLists: "+this.doneLists);
  }

  async dbDataList(done){
    console.log(dbTime(), this.personDone, this.contactsDone, this.doneLists);
    if(done === "contactsDone"){
      this.doneLists += 1;
      this.contactsDone = true;
    } else if(done === "personDone"){
      this.doneLists += 1;
      this.personDone = true;
    }
    var dx = new Date();
    var dxy = dx - this.dy;
    console.log(dbTime()+" @ "+dxy, this.personDone, this.contactsDone, this.doneLists, this.setupDone);
    if((this.personDone) && (this.contactsDone)){
      this.setUpdbData();
    }
  }

  async setUpdbData(){
    if(this.setupDone){
      return 0;
    }
    this.setupDone = true;
    var dy2 = new Date();
    var done = false;
    try {
      var dbc = {};
      var db1 = this.personList;
      const db2 = this.contactsList;
      var db3 = {};
      console.log(dbTime(), "setup Data contacts: 00")
      if((db1.length) && (db2.length)){
        var id;
        var list = 0;
        var index = 0;
        var personid;
        var contactsid;
        var contactsname;
        var contactsphone;
        var contactsemail;
        var personemail;
        var listdate;
        var modified;
        var arg;
        var contactsInfo;
        console.log(dbTime()+"Dl: ");
        const personListSize = db1.length;
        const contactsListSize = db2.length;
        //var arg3 = {"id":0,"personid": 1,"contactsid": 2,"contactsname": "Info2","contactsphone": "","contactsemail": "info2e@2e.e","personemail": "1e@1e.e", "listdate": "", "modified": ""};
        for(var v = 0; v < personListSize; v++){
          //db1[v]["contacts"] = [new Contactslist(0,arg3)];
          db1[v]["contacts"] = [{}];
          db1[v]["qsize"] = 0;
          //for(var v2 = 0; v2 < contactsListSize; v2++){
          //  db1[v]["contacts"][v2] = [new Contactslist(0,0,1,"01","02","03","04","05")];
          //}
        }
        for(var i = 0; i < contactsListSize; i++){
          personid = db2[i]["personid"];
          for(var j = 0; j < personListSize; j++){
            id = db1[j]["id"];
            if(id == personid){
              console.log(db2[i]);
              index = db1[j]["qsize"];
              contactsid = db2[i]["contactsid"];
              contactsname = db2[i]["contactsname"];
              contactsphone = db2[i]["contactsphone"];
              contactsemail = db2[i]["contactsemail"];
              personemail = db2[i]["personemail"];
              listdate = db2[i]["listdate"];
              modified = db2[i]["modified"];
              arg = {"id": id,"personid": personid,"contactsid": contactsid,"contactsname": contactsname,"contactsphone": contactsphone,"contactsemail": contactsemail,"personemail": personemail, "listdate": listdate, "modified": modified};
              contactsInfo = new Contactslist(id, arg);
              if(index > 0){
                db1[j]["contacts"][index] = contactsInfo;
              } else {
                db1[j]["contacts"] = [contactsInfo];
              }
              db1[j]["qsize"] = ++index;
              list++;
              break;
            }
            console.log(dbTime(),id+"for ["+i+"] : ["+j+"], "+list+"/"+contactsListSize);
          }
        }
        this.dbPersonList = db1;
        //console.log(this.dbPersonList);
        done = true;
        console.log(dbTime()+" Done1...list: "+list+" / "+personListSize, done);
        //this.dbDataDone = true;
        //return db1;
        this.dbDone("dbDataDone");
      } else {
        console.log(dbTime()+" setupDb Done2..."+done);
        this.dbPersonList = db1;
        this.dbDataDone = true;
      }
      //return db1;
      //return 0;
    } catch (e) {
      this.setupDone = false;
      console.log(dbTime()+"dbData: ", e)
    } finally {
      var dxy = dbDxy(dy2);
      console.log(dbTime(), "# dbSetUpData  Done: "+dxy+"@Size: "+done);
    }
    //return 0;
  }

  //StartUP Done////////////////////////////////////////////////

  async postPerson(person){
    var db1;
    var db2;
    var sqlString = 'INSERT INTO person (name, surname, age, gender, birthday, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    var sqlValues = [person.name, person.surname, person.age, person.gender, person.birthday, person.phone, person.email];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+"db postPerson error: "+pc++, err);
        return {"dbError": err};
      } else {
        console.log(dbTime()+" db postPerson: "+pc++, results["rowCount"]);
        //db1 = JSON.stringify(results["rows"]);
        //db2 = JSON.parse(db1);
        //console.log(db1);
        //console.log(db2);
        db1 = results;
        db2 = db1["rows"];
        console.log(db1)
        return db2;
      }
    });
  }

  async updatePerson(person){
    try {
      var db1 = this.putPerson(person);
      //(id, {personid, contactsid, contactsname, contactsphone, contactsemail, personemail, listdate, modified})
      var input = {personid: person.id, contactsid: person.id, contactsname: person.name, contactsphone: person.phone, contactsemail: person.email, personemail: person.email, listdate: "", modified: ""}
      var db2 = new Contactslist(pid++, input);
      var db3 = db2.putContacts(person, "contactsid");
      var db4 = db2.putContacts(person, "personid");
      console.log(db1, db2);
      console.log(db3, db4);
      return await {"Person": db1, "contactsID": db3, "personID": db4};
    } catch (e) {
      console.log(e);
    } finally {
      console.log(dbTime()+"updatePerson");
    }
  }

  async putPerson(person){
    var db1;
    var db2;
    var sqlString = 'UPDATE person SET name = $1, surname = $2, age = $3, gender = $4, birthday = $5, phone = $6, email = $7, modified = $8 WHERE id = $9';
    var sqlValues = [person.name, person.surname, person.age, person.gender, person.birthday, person.phone, person.email, dbDate(), person.id];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+"db putPerson error: "+pc++, err);
        return {"dbError": err};
      } else {
        console.log(dbTime()+"db putPerson: "+pc++, results["rowCount"]);
        //db1 = JSON.stringify(results["rows"]);
        //db2 = JSON.parse(db1);
        //console.log(db1);
        //console.log(db2);
        db1 = results;
        console.log(db1);
        return db1["rowCount"];
      }
    });
  }

  async deletePerson(person){
    try {
      //(id, {personid, contactsid, contactsname, contactsphone, contactsemail, personemail, listdate, modified})
      var input = {personid: person.id, contactsid: person.id, contactsname: "", contactsphone: "", contactsemail: person.email, personemail: person.email, listdate: "", modified: ""}
      var db1 = new Contactslist(pid++, input);
      var db2 = db1.deleteContacts(person, "contactsid");
      var db3 = db1.deleteContacts(person, "personid");
      var db4 = this.deletePersonP2(person);
      console.log(db1, db2);
      console.log(db3, db4);
      return await {"Person": db4, "contactsID": db2, "personID": db3};
    } catch (e) {
      console.log(e);
    } finally {
      console.log(dbTime()+"deletePerson: "+pid++);
    }
  }

  async getPersonP2(page) {
    var dbErr = "dberror"+pc++;
    console.log(dbTime()+" Get person# "+pc2++);
    return new Promise (() => {
      var pg = dbvalidator.dbpaginator(page);
      if (pg[0] == 0) {
        console.log(dbTime(), "dberror: "+pc2++);
        return 0;
      }
      var db1;
      var db2;
      console.log(dbTime(), "orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]+" "+pc2++);
      db.pool.query(dbsql(pg[0]), [pg[1], pg[2]], (err, resp) => {
        if (err) {
          console.log(dbTime(), err, "dberror: "+pc2++);
          return 0;
        } else {
          //console.log(dbTime(), resp["rows"].length, "Person: "+pc2++);
          db1 = JSON.stringify(resp["rows"]);
          //console.log(db1);
          db2 = JSON.parse(db1);
          this.personList = db2;
          //this.personDone = true;
          //this.dbPersonList = db2;
          this.dbDataList("personDone");
          //this.dbPersonList = db2;
          //this.dbDataDone = true;
          //this.setUpdbData();
          //this.dbDataList();
          //console.log(dbTime()+"# personList db2: ", db2, db2.length);
          return db2;
        }
      });
    });
  }

  async deletePersonP2(person){
    console.log(dbTime()+" Delete person# "+pc2++);
    try {
      const id1 = parseInt(person.id);
      const id2 = person.email;
      db.pool.query('DELETE FROM person WHERE id = $1 AND email = $2', [id1, id2], (err, resp) => {
        if (err) {
          console.log(dbTime()+"error deletePersonP2: "+pc2++, err);
          return {"bdError": err};
        } else {
          console.log(dbTime()+" deletePersonP2: "+pc2++, resp.rows);
          return resp.rows;
        }
      });
    } catch (e) {
      console.log(dbTime()+" dberror: "+pc2++, e);
    } finally {
      console.log(dbTime()+" From deletePersonP2: "+pc2++);
    }
  }
  //Person done:
}

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

function dbsqlContacts(orderby = "personemail"){
  if ( orderby == "id") {
    return 'SELECT * FROM contactslist ORDER BY personid';
  } else if ( orderby == "name") {
    return 'SELECT * FROM contactslist ORDER BY contactsname';
  } else if ( orderby == "surname") {
    return 'SELECT * FROM contactslist ORDER BY contactsid';
  }
  return 'SELECT * FROM contactslist ORDER BY personemail';
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

//Date.
const dbDate = () => {
  var now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate();
};

var refDb = () => {
   return require('crypto').randomBytes(10).toString('hex');
};

const dbDxy = (dy) => {
  var dx = new Date();
  return (dx - dy);
};


module.exports = {
  Person,
  dbTime,
  dbDate,
  dbsql,
}
