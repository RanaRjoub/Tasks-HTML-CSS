let dollar=document.getElementById('dollar');
let dinar=document.getElementById('dinar');
dollar.onkeyup = function(){
  dinar.value=dollar.value*0.71;
}
dinar.onkeyup = function(){
    dollar.value=(dinar.value/0.71).toFixed(2);
  }





