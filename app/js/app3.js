/////////////////////////
//
// app3.js
// Author: Brian
//
/////////////////////////

function dbTime() {
    var now = new Date();
    return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
}

function checkAge(age3, bday){
  var age2 = "";
  try {
    console.log(dbTime(), "Age2: "+age2.length);
    age2 = parseInt(age3);
    var d1 = new Date();
    var y1 = d1.getFullYear();
    var m1 = d1.getMonth()+1;
    var d2 = new Date(bday);
    var y2 = d2.getFullYear();
    var m2 = d2.getMonth()+1;
    var age4 = y1 - y2;
    console.log(dbTime(), "Age01: "+age4);
    if (isNaN(age4)){
      console.log(dbTime(), "Done00: "+age2);
      if (isNaN(age2)){
        console.log(dbTime(), "Done000: ");
        return "";
      }
      return age2;
    }
    if(m1 < m2){
      age4--;
      console.log(dbTime(), "Done01: "+age4)
      return age4;
    }
    console.log(dbTime(), "Done02: "+age4)
    return age4;
  } catch (e) {
    console.log(dbTime(), e)
  } finally {
    console.log(dbTime(), "checkAge02: "+age2)
  }
  console.log(dbTime(), "Done03: "+age2)
  return age2;
}

//alert("Done...");
