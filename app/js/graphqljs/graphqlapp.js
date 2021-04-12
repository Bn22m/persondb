/////////////////////////
//
// graphqlapp.js
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
var template = {name:"name", surname:"surname", age:24, gender:"gender", birthday:"birthday", phone:"phone", email:"em@email.em", created:"created", modified:"modified"};
var dvtemp2 = document.getElementById("dvtemp2");
var dvcode = document.getElementById("dvcode");
var pg = 10;


function init(){
  var sern = dbTime();
  var info = navigator.appName;
  console.log("info: "+info, sern);
  dvlog({"dbT": dbTime()})
}

var checkPersonPage = async (ypage = xpage) => {
  var url1 = window.location.href;
  var url22 = url1+"person";
  //var urlp = "/person?orderby="+orderby.value+"&page="+page+"&limit="+limit.value+"&dbtime="+dbTime();
  var paginator = "paginator=email,"+orderby.value+","+ypage+","+limit.value+",data,orderby,page,limit,person"+dbTime();
  var url2 = "/graphql/";
  console.log("CheckPersonPage: "+ypage, url2);
  var dy = new Date();
  var page = paginator;
  var plimit = parseInt(limit.value);
  console.log(dbTime(), "paginator=email,"+orderby.value+","+ypage+","+limit.value+",data,orderby,page,limit,person"+dbTime());
  var query = `query getPersonPage($page: String, $plimit: Int) {
      getPersonPage(page: $page, plimit: $plimit){
        id, name, surname, age, gender, birthday, phone, email, contacts {id, contactsemail, personemail}, created, modified
      }
  }`;
  var db = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {page, plimit}
    })
  }).then((res) =>{
    const json = res.json();
    console.log({json});
    var data = {json};
    ckodbprogres.value += 5;
    return data;
  }).then((getPersonPage) => {
    console.log({getPersonPage});
    dvlog({getPersonPage});
    return {getPersonPage};
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
    //displayResultsApp("dvdisplay", "db2", header, "data.length");
    //displayResultsApp("dvdisplay", data, header, data.length);
    xpage = ypage;
    btnperson.innerHTML = "Check #["+xpage+"]";
    dvtemp2.innerHTML = "Checking Person: "+d44;
    dvcode.innerHTML = d44;
    xpage++;
    return ({data});
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
    dvlog({"d3": d3});
    dvlog({"dbT": dbTime()})
  });
  console.log(dbTime()+"db: "+db);
}

var getContacts = async (idp = contacts.value) => {
  var ppage = ckpage.value;
  var url1 = window.location.href;
  var url22 = url1+"contacts/"+contacts.value;
  //var url2 = "/contacts/"+contacts.value;
  //var url2 = "/contacts/"+id;
  var url2 = "/graphql";
  console.log(url2);
  var dy = new Date();
  var id = parseInt(idp);
  console.log("getContacts: "+id);
  var page = "paginator=email,"+orderby.value+","+ppage+","+limit.value+",data,orderby,page,limit,person"+dbTime();
  var query = `query getContactsPage($page: String, $id: Int) {
    getContactsPage(page: $page, id: $id){contacts {personid, contactsid, contactsemail, personemail}}
  }`;
  var db = await fetch(url2, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: {page, id}
    }),
    headers: {
      'Content-type':'application/json',
      'Accept': 'application/json'
    }
  }).then((res) =>{
    const json = res.json();
    console.log({json});
    var data = {json};
    ckodbprogres.value += 5;
    return data;
  }).then((getContactsPage) => {
    console.log({getContactsPage});
    dvlog({getContactsPage});
    return {getContactsPage};
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
    //displayResultsApp("dvdisplay", "db2", header, "data.length");
    //displayResultsApp("dvdisplay", data, header, data.length);
    btncontacts.innerHTML = "Check #["+zpage+"]";
    dvtemp2.innerHTML = "Checking Contacts: "+d44;
    dvcode.innerHTML = d44;
    return ({data});
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
    dvlog({"d3": d3});
    dvlog({"dbT": dbTime()})
    zpage = ppage;
    ckpage.value = ++zpage;
  });
  console.log(dbTime()+"db: "+db);
}

var checkContacts = async (xypage = ypage) => {
  var url1 = window.location.href;
  var url22 = url1+"contactslist";
  //var url2 = "/contactslist";
  //var urlc = "/contactslist?paginator="+corderby.value+","+page+","+ckcontantslist.value+","+dbTime();
  var url2 = "/graphql";
  console.log(url2);
  var dy = new Date();
  var offsets = 0;
  var page = "paginator=email,"+orderby.value+","+xypage+","+limit.value+",data,orderby,page,limit,person"+dbTime();
  var plimit = parseInt(limit.value);
  var url3 = '/graphql?query=query+getPersonPg($page:Int, &offset:Int){getPersonPg(page:$page, offset:$offset)}{name,phone,email}&variables={"page":"10","offset":2}';
  var query = `query getContacts($page: String, $plimit: Int) {
    getContacts(page: $page, plimit: $plimit){ contacts {personid, contactsid, contactsemail}}
  }`;
  var db = fetch(url2, {
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {page, plimit},
    })
  }).then((res) =>{
    const json = res.json();
    console.log({json});
    var data = {json};
    ckodbprogres.value += 5;
    return data;
  }).then((getContacts) => {
    console.log({getContacts});
    dvlog({getContacts});
    return {getContacts};
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
    //displayResultsApp("dvdisplay", "db2", header, "data.length");
    //displayResultsApp("dvdisplay", data, header, data.length);
    //xpage = ypage;
    //btnperson.innerHTML = "Check #["+xpage+"]";
    ypage = xypage;
    btncontactslist.innerHTML = "Check #"+ypage++;
    dvtemp2.innerHTML = "Checking Contacts: "+d44;
    dvcode.innerHTML = d44;
    return ({data});
  }).catch((error) => {
    console.log("db3: @", error);
    ckodbprogres.value = 3;
  }).finally(() => {
    var d2 = new Date();
    var d3 = d2 - dy;
    console.log(d2+"# @"+d3);
    ckodbprogres.value += 10;
    pg /= 2;
    dvlog({"d3": d3});
    dvlog({"dbT": dbTime()})
  });
  console.log(dbTime()+"db: "+db);
}

window.onload = function () {
  init();
}
//alert("Done...");
