//////////////////
//log.js
//BM
///////////////////
var consolelog2;
var dt = 0;
var dbt = {"dbTime": dbTime()};
console.log(dt++, dbt);
(() => {
  var log1 = console.log;
  var logs = document.getElementById("logs");
  var log = document.getElementById("log");
  consolelog2 = (logger) => {
    if(typeof logger == 'object'){
      logs.innerHTML += (JSON && JSON.stringify ? JSON.stringify(logger):logger)+'<br>';
    }else{
      logs.innerHTML += logger+'<br>';
    }
    log.innerHTML += logger+'<br>';
  };
})();
console.log(dt++," db cURL project: ");
console.log(dbt);
