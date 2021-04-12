///////////////////////////////
//
// contactslist.js
// @Author: Brian
//
////////////////////////////

const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidator');
var myDB = {};
var myDB2 = {};
var pc = 0;
var pid = 0;
var pid2 = 0;
var pc2 = 0;
var pc3 = 0;

class Contactslist {
  constructor(id, {personid, contactsid, contactsname, contactsphone, contactsemail, personemail, listdate, modified}) {
    this.id = parseInt(id);
    this.personid = parseInt(personid);
    this.contactsid = parseInt(contactsid);
    this.contactsname = dbvalidator.checkData(contactsname);
    this.contactsphone = dbvalidator.checkData(contactsphone);
    this.contactsemail = dbvalidator.checkData(contactsemail);
    this.personemail = dbvalidator.checkData(personemail);
    this.listdate = dbvalidator.checkData(listdate);
    this.modified = dbvalidator.checkData(modified);
    this.ref = require('crypto').randomBytes(10).toString('hex');
    this.page = 1;
    this.offset = 0;
    console.log("Contactslist: "+dbTime(), this.ref+this.contactsemail);
  }

  async postContacts(contacts){
    var sqlString = 'INSERT INTO contactslist (personid, contactsid, contactsname, contactsphone, contactsemail, personemail) VALUES ($1, $2, $3, $4, $5, $6)';
    var sqlValues = [contacts.personid, contacts.contactsid, contacts.contactsname, contacts.contactsphone, contacts.contactsemail, contacts.personemail];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+"postContacts dberror: "+pc++, err);
        return {"DbError": err};
      } else {
        console.log(dbTime()+" postContacts: "+pc++, results["rowCount"]);
        return results["rowCount"];
      }
    });
  }

  async getContactsByPid(page, contacts){
    try {
      console.log(dbTime()+" getContactsByPid # "+pc2++);
      const pid = contacts.personid;
      var pg = dbvalidator.dbpaginator(page);
      if ((pg[0] == 0) | isNaN(pid) ) {
        console.log(dbTime()+" getContactsByPid dberror: "+pc2++);
        return {};
      }
      var db1 = {};
      var db2 = {};
      console.log(dbTime()+" SELECT ... personid: "+pid+" orderby: "+pg[0]+" offset: "+pg[1]+" limit: "+pg[2]);
      db.pool.query(dbsqlContacts(pg[0]), [pid, pg[1], pg[2]], (err, resp) => {
        if (err) {
          console.log(dbTime()+" dberror: "+pc2++, err);
          return [{Person: "dberror"+pc2, Error: err}];
        } else {
          //console.log(pc2, resp["rows"], "Person");
          console.log(dbTime()+"Contacts "+pc2++, resp["rows"].length);
          //console.log(resp["rows"]);
          db1 = JSON.stringify(resp["rows"]);
          //console.log(db1);
          db2 = JSON.parse(db1);
          console.log(db2);
          return db2;
        }
      });
    } catch (e) {
      console.log(dbTime()+" getContactsBypid: "+pc++, e);
    } finally {
      console.log(dbTime()+" getContactsBypid Done: "+pc++);
    }
  }

  async deleteContacts(person, option="contactsid"){
    var sqlString;
    var sqlValues;
    if(option == "contactsid"){
      sqlString = 'DELETE FROM contactslist WHERE contactsid = $1';
      sqlValues = [person.id];
    } else if (option == "personid") {
      sqlString = 'DELETE FROM contactslist WHERE personid = $1';
      sqlValues = [person.id];
    } else {
      return contacts;
    }
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+" dberror: "+pc++, err);
        return [{"dbError": err}];
      } else {
        console.log(dbTime()+" deleteContacts: "+pc++, results["rowCount"]);
        return results["rowCount"];
      }
    });
  }

  async deleteContactsByID(contacts){
    console.log(dbTime()+" Delete contacts# "+pc2++);
    try {
      const id2 = parseInt(contacts.contactsid);
      const id1 = parseInt(contacts.personid);
      db.pool.query('DELETE FROM contactslist WHERE personid = $1 AND contactsid = $2', [id1, id2], (err, resp) => {
        if (err) {
          console.log(dbTime()+" dberror: "+pc2++, err);
          return [{"dbErr": err}];
        } else {
          console.log(dbTime()+" deleteContacts: "+pc2++, resp.rows);
          return resp.rows;
        }
      });
    } catch (e) {
      console.log(dbTime()+" dberror: "+pc2++, e);
    } finally {
      console.log(dbTime()+" From deleteContactsByID: "+pc2++);
    }
  }

  async getContactslist(page) {
    console.log(dbTime()+" Get contacts# "+pc2++);
    var pg = dbvalidator.dbpaginator(page);
    if (pg[0] == 0) {
      console.log(dbTime()+" dberror: "+pc2++);
      return {};
    }
    var db1;
    var db2;
    console.log(dbTime(), "orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]);
    db.pool.query(dbsql(pg[0]), [pg[1], pg[2]], (err, resp) => {
      if (err) {
        console.log(dbTime(), err, "dberror: "+pc2++);
        return {Person: "dberror"+pc2, Error: err}
      } else {
        //console.log(resp["rows"]);
        db1 = JSON.stringify(resp["rows"]);
        //console.log(db1);
        db2 = JSON.parse(db1);
        return db2;
        //return resp["rows"];
      }
    });
  }

  async putContacts(person, option="contactsid"){
    var sqlString;
    var sqlValues;
    if(option == "contactsid"){
      sqlString = 'UPDATE contactslist SET contactsname = $1, contactsphone = $2, contactsemail = $3, modified = $4 WHERE contactsid = $5';
      sqlValues = [person.name, person.phone, person.email, dbDate(), person.id];
    } else if (option == "personid") {
      sqlString = 'UPDATE contactslist SET personemail = $1, modified = $2 WHERE personid = $3';
      sqlValues = [person.email , dbDate(), person.id];
    } else {
      return person;
    }
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+" dberror: "+pc++, err);
        return {"dbError": err};
      } else {
        console.log(dbTime()+" putContacts: "+pc++, results["rowCount"]);
        return results["rowCount"];
      }
    });
  }

  async setContactsPageP(page){
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
        console.log(dbTime()+" dberror: "+pc2++, err);
        //this.dbDataList("contactsDone");
        return {};
      } else {
        //console.log(dbTime(), resp["rows"].length, "Person: "+pc2++);
        db1 = JSON.stringify(resp["rows"]);
        //console.log(db1);
        db2 = JSON.parse(db1);
        //this.contactsList = db2;
        //console.log("db2: ", db2, db2.length);
        //resolve(dbData(db2));
        //console.log("db2 Contacts: ", db2.length);
        //console.log(dbTime(), "dbP1 ContactsL done: "+pc2++);
        //this.contactsDone = true;
        //this.dbDataList("contactsDone");
        //console.log(dbTime(), "## dbP2 ContactsL done @#: "+pc2++);
        //console.log("# contactsList: ", db2);
        return db2;
        //done = true;
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
}

function dbsql(orderby = "personemail"){
  if ( (orderby == "id") | (orderby == "personid")) {
    return 'SELECT * FROM contactslist ORDER BY personid OFFSET $1 LIMIT $2';
  } else if ( (orderby == "name") | (orderby == "contactsname") ) {
    return 'SELECT * FROM contactslist ORDER BY contactsname OFFSET $1 LIMIT $2';
  } else if ( orderby == "contactsid") {
    return 'SELECT * FROM contactslist ORDER BY contactsid OFFSET $1 LIMIT $2';
  } else {
    return 'SELECT * FROM contactslist ORDER BY personemail OFFSET $1 LIMIT $2';
  }
}

function dbsqlContacts(orderby = "personemail"){
  if ( orderby == "id") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY id OFFSET $2 LIMIT $3';
  } else if ( orderby == "contactsid") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY contactsid OFFSET $2 LIMIT $3';
  } else if ( orderby == "personid") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY personid OFFSET $2 LIMIT $3';
  } else if ( orderby == "contactsemail") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY contactsemail OFFSET $2 LIMIT $3';
  } else {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY personemail OFFSET $2 LIMIT $3';
  }
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

async function refDb(){
   return require('crypto').randomBytes(10).toString('hex');
}

module.exports = {
  Contactslist,
  dbsql,
  dbsqlContacts
}
