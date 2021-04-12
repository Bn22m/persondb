/////////////////////////
//
// person.js
// Author: Brian
//
/////////////////////////

class Person {
  constructor(id=refDb,name=refDb(),surname=refDb(),age="",gender="",birthday="",phone="",email=refDb()+"e@em.m",contacts="",created="",modified="",ref=refDb(),page="",offset="",qsize="") {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
    this.birthday = birthday;
    this.phone = phone;
    this.email = email;
    this.contacts = [Contactslist];
    this.created = created;
    this.modified = modified;
    this.ref = ref;
    this.page = page;
    this.offset = offset;
    this.qsize = qsize;
    this.setupDone = false;
    this.personDone = false;
    this.contactsDone = false;
    this.dbDataDone = false;
    this.count = 0;
  }
}

async function refDb(){
   return require('crypto').randomBytes(10).toString('hex');
}
