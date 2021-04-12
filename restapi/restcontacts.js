////////////////////////////////////////////
//
// restcontacts.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalidator = require('../services/dbvalidator');

var pc = 0;
var pc2 = 0;
var pc3 = 0;
var pc10 = 0;

const postContacts = async (req, res) => {
  try {
    console.log(dbTime()+"#1 Post contacts# "+pc2++);
    const {personid, contactsid, contactsname, contactsphone, contactsemail, personemail} = req.body;
    var id1 = parseInt(personid);
    var id2 = parseInt(contactsid);
    var name2 = dbvalidator.checkData(contactsname, 0);
    var phone2 = dbvalidator.checkData(contactsphone, 0);
    var email2 = dbvalidator.checkData(contactsemail, 1);
    var email3 = dbvalidator.checkData(personemail, 1);
    if((email3 == "") | (email2 == "") | isNaN(id1) | isNaN(id2)){
      res.json({ContactsList: "dataError"+pc2++});
      console.log(dbTime()+" Done 0000..."+pc2++);
      return 0;
    }
    console.log(dbTime()+"#2 ContactsList: "+pc2++, id1, id2);
    var contacts = 0;
    var sqlString = 'INSERT INTO contactslist (personid, contactsid, contactsname, contactsphone, contactsemail, personemail) VALUES ($1, $2, $3, $4, $5, $6)';
    var sqlValues = [id1, id2, name2, phone2, email2, email3];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(dbTime()+" Contacts dberror: "+pc2++, err);
        res.json({ContactsList: "dberror"+pc2++, Error: err});
      } else {
        console.log(dbTime()+"#3 ContactsList: "+pc2++, results);
        res.json({ContactsList: results});
      }
    });
  } catch (e) {
    console.log(dbTime()+" postContacts: "+pc2++, e);
  } finally {
    console.log(dbTime()+"#4 postContacts Done: "+pc2++);
  }
};

const getContactsByPid = async (req, res) => {
  try {
    console.log(dbTime()+"#1 Get contacts# "+pc2++);
    const pid = parseInt(req.params.pid)
    console.log(dbTime(), req.query);
    var page = req.query.paginator;
    var pg = dbvalidator.dbpaginator(page);
    if ((pg[0] == 0) | isNaN(pid) ) {
      console.log(dbTime()+" Contacts dberror: "+pc2++);
      res.json({ContactsList: "Contacts dberror"+pc2++});
      return {};
    }
    console.log(dbTime()+"#2 SELECT ... personid: "+pid+", orderby: "+pg[0]+",offset: "+pg[1]+", limit: "+pg[2]+", "+pc2++);
    db.pool.query(dbsql(pg[0]), [pid, pg[1], pg[2]], (err, resp) => {
      if (err) {
        console.log(dbTime()+" Contacts dberror: "+pc2++, err);
        res.json({ContactsList: "Contacts dberror"+pc2++, Error: err});
        //return {Person: "dberror"+pc2, Error: err}
      } else {
        //console.log(pc2, resp["rows"], "Person");
        console.log(dbTime()+"#3 Person: "+pc2++, resp["rows"]);
        res.json(resp["rows"]);
        //return resp["rows"];
      }
    });
  } catch (e) {
    console.log(dbTime()+" getContactsBypid: "+pc2++, e);
  } finally {
    console.log(dbTime()+"#4 getContactsBypid Done: "+pc2++);
  }
};

const deleteContacts = async (req, res) => {
  try {
    console.log(dbTime()+"#1 deleteContacts #"+pc2++);
    const {personid, contactsid, contactsemail} = req.body;
    var id1 = parseInt(personid);
    var id2 = parseInt(contactsid);
    var email2 = dbvalidator.checkData(contactsemail, 1);
    if(isNaN(id1) | isNaN(id2) | (email2 == "")){
      res.json({ContactsList: "dataError"+pc2++, Error: "dterror"});
      console.log(dbTime()+" Done 0000..."+pc2++);
      return 0;
    }
    db.pool.query('DELETE FROM contactslist WHERE personid = $1 AND contactsid = $2 AND contactsemail = $3', [id1, id2, email2], (err, resp) => {
      if (err) {
        console.log(dbTime()+" deleteContacts dberror: "+pc2++);
        res.json({deleteContacts: "dberror"+pc2++, Error: err});
      } else {
        console.log(dbTime()+"#2 deletePerson: "+pc2++, resp.rows);
        res.json({deleteContacts: resp.rows, info: pc2++});
      }
    });
  } catch (e) {
    console.log(dbTime()+" deleteContacts: "+pc2++, e);
  } finally {
    console.log(dbTime()+"#3 deleteContacts Done: "+pc2++);
  }
};

var countContacts = async (id, pidName = "personid") => {
  console.log(dbTime()+pc3++, "countList: "+id+", "+pidName);
  var pid = parseInt(id);
  var countp = 0;
  var sqlString;
  if(pidName == "personid"){
    sqlString = 'SELECT count(personid) FROM contactslist WHERE personid = $1';
  } else {
    sqlString = 'SELECT count(contactsid) FROM contactslist WHERE contactsid = $1';
  }
  db.pool.query(sqlString, [pid], (err, resp) => {
    if (err) {
      console.log(dbTime()+"dberror: "+pc3++, err);
      return -1;
    } else {
      console.log(dbTime(), "countContacts: "+pc3++, resp.rows, "pid: "+pid);
      countp = resp.rows[0].count;
      console.log(pidName, countp);
      return countp;
    }
  });
}

/*
const getContactsBypidT = (req, res) => {
  console.log(dbTime()+" Get contacts# "+pc3++);
  const pid = parseInt(req.params.pid)
  db.pool.query('SELECT * FROM contactslist WHERE personid = $1', [pid], (err, resp) => {
    if (err) {
      console.log(dbTime(), err, "dberror: "+pc3++);
      res.json({Contacts: "dberror"+pc3, Error: err});
    } else {
      console.log(dbTime(), "Contacts: "+pc3++, resp.rows, "pid: "+pid);
      res.json({Contacts: resp.rows, info: pc3, pid: pid});
    }
  });
};
*/

const getContacts = (req, res) => {
  console.log(dbTime()+" Get contacts# "+pc2++);
  console.log(dbTime(), req.query);
  var paginator = req.query.paginator;
  var pg = dbvalidator.dbpaginator(paginator);
  if (pg[0] == 0) {
    console.log(dbTime(), "dberror: "+pc2++);
    res.json({ContactsList: "dberror"+pc2++});
    return 0;
  }
  console.log(dbTime()+" orderby: "+pg[0], "offset: "+pg[1], "limit: "+pg[2]);
  db.pool.query(dbsqlContacts(pg[0]), [pg[1], pg[2]], (err, resp) => {
    if (err) {
      console.log(dbTime()+" dberror: "+pc2++, err);
      res.json({ContactsList: "dberror"+pc2++, Error: err});
    } else {
      //console.log(pc2, resp["rows"], "Person");
      console.log(dbTime(), resp["rows"].length, "ContactsList: "+pc2++);
      res.json(resp["rows"]);
    }
  });
};

function dbsql(orderby = "personemail"){
  if ( orderby == "id") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY id OFFSET $2 LIMIT $3';
  } else if ( orderby == "contactsid") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY contactsid OFFSET $2 LIMIT $3';
  } else if ( orderby == "personid") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY personid OFFSET $2 LIMIT $3';
  } else if ( orderby == "contactsemail") {
    return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY contactsemail OFFSET $2 LIMIT $3';
  }
  return 'SELECT * FROM contactslist WHERE personid = $1 ORDER BY personemail OFFSET $2 LIMIT $3';
}

function dbsqlContacts(orderby = "personemail"){
  if ( orderby == "id") {
    return 'SELECT * FROM contactslist ORDER BY id OFFSET $1 LIMIT $2';
  } else if ( orderby == "contactsid") {
    return 'SELECT * FROM contactslist ORDER BY contactsid OFFSET $1 LIMIT $2';
  } else if ( orderby == "personid") {
    return 'SELECT * FROM contactslist ORDER BY personid OFFSET $1 LIMIT $2';
  } else if ( orderby == "contactsemail") {
    return 'SELECT * FROM contactslist ORDER BY contactsemail OFFSET $1 LIMIT $2';
  } else if ( orderby == "contactsname") {
    return 'SELECT * FROM contactslist ORDER BY contactsname OFFSET $1 LIMIT $2';
  } else {
    return 'SELECT * FROM contactslist ORDER BY personemail OFFSET $1 LIMIT $2';
  }
}


//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

module.exports = {
  postContacts,
  getContactsByPid,
  getContacts,
  deleteContacts,
  countContacts
}
