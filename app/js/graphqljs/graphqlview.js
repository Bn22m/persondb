///////////////////////
// graphqlview.js
// @ Author: Brian
////////////////////////
/**/
var dvinfo = document.getElementById("dvinfo");
var dvdisplay = document.getElementById("dvinfo2");
var header = ["id", "name", "surname", "age", "gender", "birthday", "phone", "email", "contacts", "created", "modified", "new contacts"];
var personid = "Enter person id.";
var personemail = "Enter person email.";

function displayResultsApp(dvdisplay2, dvlist, header2, info){
  dvdisplay.innerHTML = "<hr><br><h1>"+info+"</h1>";
  //displayResultsApp3(dvdisplay2, dvlist, header2, info);
}

/*
function displayResultsApp3(dvdisplay2, dvlist, header2, info){
  dvdisplay.innerHTML = "<hr><br><h1>"+info+"</h1>";
  var table = document.createElement("table");
  var tr = table.insertRow(-1);
  var v1;
  var v2;
  var v3;
  var v4;
  var v5;
  var hname;
  for(var i = 0; i < header.length; i++){
    var th = document.createElement("th");
    th.innerHTML = header[i];
    tr.appendChild(th);
  }
  for(var i = 0; i < dvlist.length; i++){
    tr = table.insertRow(-1);
    v1 = dvlist[i].id;
    v2 = dvlist[i].email;
    v3 = dvlist[i].name;
    v4 = dvlist[i].surname;
    for(var j = 0; j < header.length; j++){
      var td = tr.insertCell(-1);
      if (j < header.length - 1){
        hname = header[j];
        td.innerHTML = dvlist[i][hname];
        if((hname == "id") | (hname == "email") | (hname == "contacts") ){
          td.innerHTML += '<input type="text" id="'+hname+v1+'" value="'+dvlist[i][hname]+'" readonly />';
        } else {
          td.innerHTML += '<input type="text" id="'+hname+v1+'" value="'+dvlist[i][hname]+'"/>';
        }
        if (hname == "birthday"){
          td.innerHTML += '<input type="date" id="'+"upbirthday"+v1+'" value="'+dvlist[i][hname]+'"/>';
        } else if (hname == "contacts") {
          td.innerHTML += '<button onclick="checkContacts('+v1+');">getLists'+v1+'</button>';
        }
      }
      else {
        td.innerHTML = '<input type="number" id="personid'+v1+'" placeholder="'+personid+'" min="'+1+'" />';
        td.innerHTML += '<input type="email" id="emailp'+v1+'" placeholder="'+personemail+'" maxlength="'+60+'"required />';
        td.innerHTML += '<input type="text" id="id'+v1+'" value="'+v1+'" readonly hidden />';
        td.innerHTML += '<input type="text" id="email'+v1+'" value="'+v2+'" readonly hidden />';
        td.innerHTML += '<input type="text" id="name'+v1+'" value="'+v3+'" hidden />';
        td.innerHTML += '<button onclick="newContactsGQL('+v1+');">Connect'+v1+'</button>';
        td.innerHTML += '<button onclick="personUpdateGQL('+v1+');">Update'+v1+'</button>';
        td.innerHTML += '<button onclick="personDeleteGQ('+v1+');">Delete'+v1+'</button>';
        var td2 = tr.insertCell(-1);
        td2.innerHTML = '<div class="dvcpic1"><img src="../public/assets/pro'+v1+'.jpg" alt="'+v3+'"></div>';
      }
    }
  }
  dvdisplay.appendChild(table);
  dvdisplay.innerHTML = dvdisplay.innerHTML + "<br><hr><br>";
}

function newContactsGQL(x){
  ckodbprogres.value = 4;
  var personid2 = document.getElementById("personid"+x).value;
  var contactsid2 = document.getElementById("id"+x).value;
  var contactsname = document.getElementById("name"+x).value;
  var contactsphone = document.getElementById("phone"+x).value;
  var contactsemail = document.getElementById("email"+x).value;
  var personemail = document.getElementById("emailp"+x).value;
  var personid = parseInt(personid2);
  var contactsid = parseInt(contactsid2);
  if (isNaN(personid) | isNaN(contactsid) ){
    dvinfo.innerHTML = "Connection Error: "+personid+", @"+contactsid;
    alert("Connect personid: "+personid+" with: "+contactsemail);
    return 0;
  }
  var url2 = "/graphql";
  console.log(url2);
  var dy = new Date();
  var query = `mutation postContacts($input: ContactsInput) {
    postContacts(input: $input) {
      ref
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
            personid,
            contactsid,
            contactsname,
            contactsphone,
            contactsemail,
            personemail,
          }
        }
      })
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
  });
}

function getContactsGQLx(x){
  ckodbprogres.value = 4;
  var personid2 = document.getElementById("personid"+x).value;
  var contactsid2 = document.getElementById("id"+x).value;
  var email = document.getElementById("email"+x).value;
  var personid = parseInt(personid2);
  var contactsid = parseInt(contactsid2);
  if (isNaN(personid) | isNaN(contactsid) ){
    dvinfo.innerHTML = "Connection Error: "+personid+", @"+contactsid;
    alert("Connect personid: "+personid+" with: "+contactsemail);
    return 0;
  }
  var url2 = "/graphql";
  console.log(url2);
  var dy = new Date();
  var id = x;
  var query = `getContacts($input: Int) {
    getContacts(input: $input)
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
          id
        }
      })
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
  });
}

function personUpdateGQL(x){
  //var header2 = ["id", "name", "surname", "age", "gender", "birthday", "phone", "email", "contacts", "created", "modified", "new contacts"];
  var birthday2 = document.getElementById("upbirthday"+x).value;
  var birthday1 = document.getElementById("birthday"+x).value;
  var age1 = document.getElementById("age"+x).value;
  var name = document.getElementById("name"+x).value;
  var surname = document.getElementById("surname"+x).value;
  var gender = document.getElementById("gender"+x).value;
  var phone = document.getElementById("phone"+x).value;
  var age2 = checkAge("age", birthday2);
  var age3 = checkAge(age1, birthday1);
  var age;
  var birthday;
  var d2 = new Date(birthday2);
  var y2 = d2.getFullYear();
  if(isNaN(y2)){
    //alert("Age:"+age+", A2: "+age2+", A3: "+age3+", y2: "+y2);
    age = age3;
    birthday = birthday1;
  } else {
    age = age2;
    birthday = birthday2;
  }
  var url22 = "/updateperson/"+x;
  var url2 = "/graphql";
  console.log(url2, url22);
  var dy = new Date();
  var created = dy;
  var modified = dy;
  var contacts = {};
  var query = `mutation updatePerson($input: PersonInput) {
    updatePerson(input: $input) {
     ref
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
  });
}

function personDeleteGQL(x){
  //alert("delete: "+x);
  var url1 = window.location.href;
  var url2 = "/deleteperson/"+x;
  console.log(url2, url1);
  var dy = new Date();
  var db = fetch(url2, {
      method: 'DELETE',
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("db1: "+db, response);
    ckodbprogres.value += 5;
    return response.text();
  }).then((dblist) => {
    var d1 = JSON.stringify(dblist);
    var db2 = JSON.parse(dblist);
    console.log("db2: ", db2);
    var cpg = ckodbprogres.value;
    ckodbprogres.value = cpg/2;
    dvresults.innerHTML = d1;
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 4;
    pg--;
    pg /= 2;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db4: ", db,", @"+d3);
    ckodbprogres.value += pg;
    pg++;
  });
}
*/
