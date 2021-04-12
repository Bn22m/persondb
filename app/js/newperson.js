/////////////////////////
//
// newperson.js
// Author: Brian
//
/////////////////////////

var ckodbprogres = document.getElementById("ckodbprogres");
var dvresults = document.getElementById("dvresults");
var txtname = document.getElementById("txtname");
var txtsurname = document.getElementById("txtsurname");
var txtage = document.getElementById("txtage");
var rdgender1 = document.getElementById("rdgender1");
var rdgender2 = document.getElementById("rdgender2");
var txtbirthday = document.getElementById("txtbirthday");
var txtphone = document.getElementById("txtphone");
var txtemail = document.getElementById("txtemail");
var dvsize = document.getElementById("dvsize");

function newPerson(){
  ckodbprogres.value += 5;
  var pgender = "";
  if(rdgender1.checked){
    pgender = rdgender1.value;
  } else if(rdgender2.checked) {
    pgender = rdgender2.value;
  }
  dvresults.innerHTML = pgender;
  var url1 = window.location.href;
  var url22 = url1+"postperson";
  var url2 = "/postperson";
  console.log(url2, url22);
  var dy = new Date();
  var db = fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        name: txtname.value,
        surname: txtsurname.value,
        age: txtage.value,
        gender: pgender,
        birthday: txtbirthday.value,
        phone: txtphone.value,
        email: txtemail.value
      }),
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("db1: "+db, response);
    ckodbprogres.value += 5;
    return response.text();
  }).then((dblist) => {
    var d1 = JSON.stringify(dblist);
    var db2 = JSON.parse(dblist);
    console.log("db2: ", db2);
    ckodbprogres.value += 5;
    dvresults.innerHTML = d1;
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db4: ", db,", @"+d3);
    ckodbprogres.value = 70;
    dvlog({"d3": d3});
    dvlog({"dbT": dbTime()})
  });
}

function postPersonGQL(){
  ckodbprogres.value += 5;
  var pgender = "";
  if(rdgender1.checked){
    pgender = rdgender1.value;
  } else if(rdgender2.checked) {
    pgender = rdgender2.value;
  }
  var name = txtname.value;
  var surname = txtsurname.value;
  var age = parseInt(txtage.value);
  var gender = pgender;
  var birthday = txtbirthday.value;
  var phone = txtphone.value;
  var email = txtemail.value;
  dvresults.innerHTML = pgender;
  var url1 = window.location.href;
  var url22 = url1+"postperson";
  var url2 = "/graphql";
  console.log(url2, url22);
  var dy = new Date();
  var created = dy;
  var modified = dy;
  var contacts = {};
  var query = `mutation postPerson($input: PersonInput) {
    postPerson(input: $input) {
     name, surname, age, email, ref
    }
  }`;
  var db = fetch(url2, {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
           name,
           surname,
           age,
           gender,
           birthday,
           phone,
           email,
           contacts,
           created,
           modified,
          }
        }
      })
    }).then((response) => {
    var json = response.json();
    var data = {json};
    console.log("json: ", json);
    console.log("data: ", data);
    console.log("response: ", response);
    ckodbprogres.value += 5;
    return data;
  }).then((postPerson) => {
    console.log({postPerson});
    dvlog({postPerson});
    return {postPerson};
  }).then((data) => {
    console.log(data);
    console.log("/////////////////////");
    ckodbprogres.value += 5;
    console.log({data});
    var d44 = JSON.stringify(data);
    console.log(d44);
    dvlog(data);
    dvlog({data});
    dvlog(d44);
    return {data};
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
    dvlog(error);
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db: ", db,", @"+d3);
    ckodbprogres.value = 70;
    dvlog({"d3": d3});
    dvlog({"dbT": dbTime()})
  });
}

function init(){
  var sern = dbTime();
  //txtorderid.value = sern;
  var info = navigator.appName;
  console.log("info: "+info, sern);
  dvlog({"#": sern});
  dvlog({"dbT": dbTime()})
}

function dbTime() {
  var now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
}

window.onload = function () {
  init();
}
//alert("Done...");
