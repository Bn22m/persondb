//
//displayapp.js
//@ Author: Brian
//

var dvinfo = document.getElementById("dvinfo");
var dvdisplay = document.getElementById("dvinfo2");
var header = ["id", "name", "surname", "age", "gender", "birthday", "phone", "email", "contacts", "created", "modified", "new contacts"];
var personid = "Enter person id.";
var personemail = "Enter person email.";

function displayResultsApp(dvdisplay2, dvlist, header2, info){
  dvdisplay.innerHTML = "<hr><br><h1>"+info+"</h1>";
  var table = document.createElement("table");
  var tr = table.insertRow(-1);
  var v1;
  var v2;
  var v3;
  var v4;
  var v5;
  var hname;
  var contacts;
  var templist;
  var temp;
  for(var i = 0; i < header.length; i++){
    var th = document.createElement("th");
    th.innerHTML = '<h1>'+header[i]+'</h1>';
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
        temp = ""+dvlist[i][hname]
        td.innerHTML = '<b>'+temp[0]+'</b>';
        if(hname == "id"){
          td.innerHTML += '<input type="text" id="'+hname+v1+'" value="'+dvlist[i][hname]+'" readonly />';
        } else if(hname == "contacts"){
          templist = dvlist[i][hname];
          if(typeof templist == "object"){
            contacts = (JSON && JSON.stringify ? JSON.stringify(templist):templist);
          } else {
            contacts = templist;
          }
          td.innerHTML += '<textarea id="'+hname+v1+'" placeholder="Contacts." rows="1" readonly>'+contacts+'</textarea>';
          td.innerHTML += '<button onclick="checkContactsPage('+v1+');">getLists'+v1+'</button>';
        } else if (hname == "birthday") {
          td.innerHTML += '<input type="text" id="'+hname+v1+'" value="'+dvlist[i][hname]+'"/>';
          td.innerHTML += '<input type="date" id="'+"upbirthday"+v1+'" value="'+dvlist[i][hname]+'"/>';
        } else {
          td.innerHTML += '<input type="text" id="'+hname+v1+'" value="'+dvlist[i][hname]+'"/>';
        }
        //if (hname == "birthday"){
        //  td.innerHTML += '<input type="date" id="'+"upbirthday"+v1+'" value="'+dvlist[i][hname]+'"/>';
        //} else if (hname == "contacts") {
        //  td.innerHTML += '<button onclick="checkContacts('+v1+');">getLists'+v1+'</button>';
        //}
      } else {
        td.innerHTML = '<input type="number" id="personid'+v1+'" placeholder="'+personid+'" min="'+1+'"required />';
        td.innerHTML += '<input type="email" id="emailp'+v1+'" placeholder="'+personemail+'" maxlength="'+60+'"required />';
        td.innerHTML += '<input type="text" id="id'+v1+'" value="'+v1+'" readonly hidden />';
        td.innerHTML += '<input type="text" id="email'+v1+'" value="'+v2+'" readonly hidden />';
        td.innerHTML += '<input type="text" id="name'+v1+'" value="'+v3+'" hidden />';
        td.innerHTML += '<button onclick="newContacts('+v1+');">Connect'+v1+'</button>';
        td.innerHTML += '<button onclick="personUpdate('+v1+');">Update'+v1+'</button>';
        td.innerHTML += '<button onclick="personDelete('+v1+');">Delete'+v1+'</button>';
        var td2 = tr.insertCell(-1);
        td2.innerHTML = '<div class="dvcpic1"><img src="../public/assets/pro'+v1+'.jpg" alt="'+v3+'"></div>';
      }
    }
  }
  dvdisplay.appendChild(table);
  dvdisplay.innerHTML = dvdisplay.innerHTML + "<br><hr><br>";
}

function newContacts(x){
  ckodbprogres.value = 4;
  var personid = document.getElementById("personid"+x).value;
  var contactsid = document.getElementById("id"+x).value;
  var contactsname = document.getElementById("name"+x).value;
  var contactsphone = document.getElementById("phone"+x).value;
  var contactsemail = document.getElementById("email"+x).value;
  var personemail = document.getElementById("emailp"+x).value;
  var pid1 = parseInt(personid);
  var pid2 = parseInt(contactsid);
  if (isNaN(pid1) | isNaN(pid2) ){
    dvinfo.innerHTML = "Connection Error: "+pid1+", @"+pid2;
    alert("Connect personid: "+pid+" with: "+contactsemail);
    return 0;
  }
  var url2 = "/postcontacts";
  console.log(url2);
  var dy = new Date();
  var db = fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        personid: pid1,
        contactsid: pid2,
        contactsname: contactsname,
        contactsphone: contactsphone,
        contactsemail: contactsemail,
        personemail: personemail
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
  });
}

function personUpdate(x){
  //var header2 = ["id", "name", "surname", "age", "gender", "birthday", "phone", "email", "contacts", "created", "modified", "new contacts"];
  var birthday2 = document.getElementById("upbirthday"+x).value;
  var birthday1 = document.getElementById("birthday"+x).value;
  var age1 = document.getElementById("age"+x).value;
  var name = document.getElementById("name"+x).value;
  var surname = document.getElementById("surname"+x).value;
  var gender = document.getElementById("gender"+x).value;
  var phone = document.getElementById("phone"+x).value;
  var email = document.getElementById("email"+x).value;
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
  var url2 = "/updateperson/"+x;
  console.log(url2);
  var dy = new Date();
  var db = fetch(url2, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        surname: surname,
        age: age,
        gender: gender,
        birthday: birthday,
        phone: phone,
        email: email
      }),
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("response: ", response);
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

function personDelete(x){
  //alert("delete: "+x);
  var email = document.getElementById("email"+x).value;
  var id = document.getElementById("id"+x).value;
  var url1 = window.location.href;
  var url2 = "/deleteperson/"+x;
  console.log(url2, url1);
  var dy = new Date();
  var db = fetch(url2, {
      method: 'DELETE',
      body: JSON.stringify({
        personid: id,
        email: email
      }),
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("response: ", response);
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
