/////////////////////////
//
// app.js
// Author: Brian
//
/////////////////////////
var xpage = 1;
var ypage = 1;
var zpage = 1;
var ckodbprogres = document.getElementById("ckodbprogres");
var dvresults = document.getElementById("dvresults");
var contacts = document.getElementById("ckcontacts");
var ckpage = document.getElementById("ckpage");
var limit = document.getElementById("xlimit");
var contactslist = document.getElementById("ckcontantslist");
var personinfo = document.getElementById("ckpersoninfo");
var btnperson = document.getElementById("btnperson");
var orderby = document.getElementById("orderby");
var corderby = document.getElementById("corderby");
var btncontactslist = document.getElementById("btncontactslist");
var dvsize = document.getElementById("dvsize");
var pg = 10;

function init(){
  var sern = dbTime();
  var info = navigator.appName;
  console.log("info: "+info, sern);
  dvlog(sern);
}

//function dbTime2() {
//  var now = new Date();
//  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
//}

var checkPerson = async (page = xpage) => {
  var url1 = window.location.href;
  var url22 = url1+"person";
  var urlp = "/person?orderby="+orderby.value+"&page="+page+"&limit="+limit.value+"&dbtime="+dbTime();
  var paginator = "/person?paginator=email,"+orderby.value+","+page+","+limit.value+",data,orderby,page,limit,person"+dbTime();
  console.log(dbTime(), url22, urlp);
  var dy = new Date();
  var db = await fetch(paginator, {
      method: 'GET',
      headers: {'Content-type':'application/json; charset=UTF-8'}
    }).then((response) => {
    console.log("response: ", response);
    ckodbprogres.value += 5;
    dvlog(response);
    return response.text();
  }).then((dblist) => {
    var d1 = JSON.stringify(dblist);
    var db2 = JSON.parse(dblist);
    console.log("db2: ", db2, dblist.length);
    ckodbprogres.value += 5;
    dvresults.innerHTML = dblist.length;
    displayResultsApp("dvdisplay", db2, "header", db2.length);
    xpage = page;
    btnperson.innerHTML = "Check #"+xpage++;
    dvlog(d1);
    dvlog(db2);
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db4: ", db,", @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
    dvlog({"d3": d3});
  });
}

var checkContactsPage = async (id = contacts.value) => {
  var page = ckpage.value;
  var url1 = window.location.href;
  var url22 = url1+"contacts/"+contacts.value;
  //var url2 = "/contacts/"+contacts.value;
  //var url2 = "/contacts/"+id;
  var url2 = "/getcontacts/"+id+"?paginator=email,"+corderby.value+","+page+","+ckcontantslist.value+","+dbTime();;
  console.log(url2, url22);
  var dy = new Date();
  var db = await fetch(url2).then((response) => {
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
    btncontacts.innerHTML = "Check #"+zpage++;
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
    zpage = page;
    ckpage.value = ++zpage;
  });
}

var checkContactsT = async (page = ypage) => {
  var url1 = window.location.href;
  var url22 = url1+"contactslist";
  var url2 = "/contactslist";
  var pid = contacts.value;
  var urlc = "/getcontacts/"+pid+"?paginator=email,"+corderby.value+","+page+","+ckcontantslist.value+","+dbTime();
  console.log(url2, url22);
  var dy = new Date();
  var db = await fetch(urlc).then((response) => {
    console.log("db1: "+response);
    ckodbprogres.value += 5;
    return response.text();
  }).then((dblist) => {
    var d1 = JSON.stringify(dblist);
    var db2 = JSON.parse(dblist);
    console.log("db2: ", db2);
    ckodbprogres.value += 5;
    dvresults.innerHTML = d1;
    ypage = page;
    btncontactslist.innerHTML = "Check #"+ypage++;
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db4: ", db,", @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
  });
}

var checkContacts = async (page = ypage) =>{
  var url1 = window.location.href;
  var url22 = url1+"contactslist";
  var url2 = "/contactslist";
  var urlc = "/contacts?paginator=email,"+corderby.value+","+page+","+ckcontantslist.value+","+dbTime();
  console.log(url2, url22);
  var dy = new Date();
  var db = fetch(urlc).then((response) => {
    console.log("db1: "+db, response);
    ckodbprogres.value += 5;
    return response.text();
  }).then((dblist) => {
    var d1 = JSON.stringify(dblist);
    var db2 = JSON.parse(dblist);
    console.log("db2: ", db2);
    ckodbprogres.value += 5;
    dvresults.innerHTML = d1;
    ypage = page;
    btncontactslist.innerHTML = "Check #"+ypage++;
    return db2;
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# db4: ", db,", @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
  });
}

window.onload = function () {
  init();
}
//alert("Done...");
