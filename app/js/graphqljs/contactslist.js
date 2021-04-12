/////////////////////////
//
// contactslist.js
// Author: Brian
//
/////////////////////////


class Contactslist {
  constructor(id, {personid, contactsid, contactsname, contactsurname, contactsphone, contactsemail}) {
    this.id = id;
    this.personid = personid;
    this.contactsid = contactsid;
    this.contactsname = contactsname;
    this.contactsphone = contactsphone;
    this.contactsemail = contactsemail;
    this.ref = require('crypto').randomBytes(10).toString('hex');
    this.page = 1;
    this.offset = 0;
    console.log("Contactslist: "+dbTime(), this.ref+this.contactsemail);
  }
}
