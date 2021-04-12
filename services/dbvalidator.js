//////////////////////////
//
// dbvalidator.js
// @ Author: Brian
//
//////////////////////////
const config = require('../config');
var dv = 0;

function checkAge(age3, bday){
  var age2 = "";
  try {
    //console.log(dbTime(), "Age2: "+age2.length);
    age2 = parseInt(age3);
    var d1 = new Date();
    var y1 = d1.getFullYear();
    var m1 = d1.getMonth()+1;
    var d2 = new Date(bday);
    var y2 = d2.getFullYear();
    var m2 = d2.getMonth()+1;
    var age4 = y1 - y2;
    //console.log(dbTime(), "Age01: "+age4);
    if (isNaN(age4)){
      //console.log(dbTime(), "Done00: "+age2);
      if (isNaN(age2)){
        //console.log(dbTime(), "Done000: ");
        return null;
      }
      return age2;
    }
    if(m1 < m2){
      age4--;
      //console.log(dbTime(), "Done01: "+age4)
      return age4;
    }
    //console.log(dbTime(), "Done02: "+age4)
    return age4;
  } catch (e) {
    console.log(dbTime()+" @: "+dv++, e)
  } finally {
    dv++;
    //console.log(dbTime(), "checkAge02: "+age2)
  }
  //console.log(dbTime(), "Done03: "+age2)
  return null;
}

function checkGender(gender){
  try {
    var gd1 = gender.trim();
    var gd = gd1.toLowerCase();
    if((gd == "male") | (gd == "female")){
      //console.log(dbTime(), "checkGender"+gd);
      return gd;
    }
  } catch (e) {
    console.log(dbTime(), "checkGender"+e+" @: "+dv++);
  }
  return null;
}

function checkData(data, option = 0){
  try {
    var dl1 = data.length;
    var data2 = data.trim();
    var dl = data2.length;
    //console.log(dbTime(), "checkData01: "+data2+" "+dl+": "+dl1+" option: "+option);
    if((data2.length) && (dl < 350)){
      return data2;
    }
  } catch (e) {
    console.log(dbTime(), "checkData02: "+e+" ////: "+dv++);
  }
  //console.log(dbTime(), "checkData03: "+option);
  if (option == 1){
    return null;
  }
  return null;
}

function offset(xpage = 1, xlimit = config.dblist){
  x = parseInt(xpage - 1);
  y = parseInt(xlimit);
  return x*y;
}

function limit(xlimit = config.dblist){
  y = parseInt(xlimit);
  return y;
}

function dbpaginator(paginator, xpage = "List"){
  try {
    //console.log(dbTime(), "Pagination: "+xpage);
    var pg = paginator.split(',');
    var orderby = pg[1];
    var page = pg[2];
    var xlimit = pg[3];
    var offset2 = offset(page, xlimit);
    var limit2 = limit(xlimit);
    var orderby2 = checkData(orderby, 1);
    return [orderby2, offset2, limit2, 1];
  } catch (e) {
    console.log(dbTime(), "PaginationError: "+e+" ///@: "+dv++);
  }
  return [0, 0, 0, 0];
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

module.exports = {
  checkAge,
  checkGender,
  checkData,
  offset,
  limit,
  dbpaginator
}
