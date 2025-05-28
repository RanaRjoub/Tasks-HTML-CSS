let title=document.getElementById('title');
let total=document.getElementById('total');
let price=document.getElementById('price');
let tax=document.getElementById('tax');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let temp;

function getTotal(){
  if(price.value !=''){
    let result=( + price.value+ +tax.value+ +ads.value)- +discount.value;
   
    total.innerHTML=result;
    total.style.background='green'
  }
  else{
    total.style.background='red'
    total.innerHTML='';
  }
}
let arrPro=[];
 if(localStorage.product !=null){
     arrPro= JSON.parse(localStorage.product);
 }
 else{arrPro=[];} 
submit.onclick=function(){
    let objPro={
        title:title.value.toLowerCase(),
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML ,
        category:category.value.toLowerCase() 
        
      
    };
    if(title.value!='' && price.value!='' && objPro.count<100){
    if(mood=='create'){
    if(objPro.count >1){
      for(let i=0 ; objPro.count>i ;i++){
        arrPro.push(objPro);
      }
  
    
    }
    else{
      arrPro.push(objPro);
    }

  }
  else{
  arrPro[temp]=objPro;
  mood='create'
  submit.innerHTML='create';
  count.style.display='block';
  }
  clear();
  title.style.border='none';
  price.style.border='none';
  
}
else{
  if(title.value==''){
  title.style.border='1px solid red';
 
  }
  if(price.value==''){
    price.style.border='1px solid red';
  }
}
    
    localStorage.setItem('product' , JSON.stringify(arrPro));
        
    
    readData();
   
}

function clear(){
title.value='';
price.value='';
tax.value='';
ads.value='';
discount.value='';
count.value='';
category.value='';
total.innerHTML='';
}

function readData(){
    let table='';
for(let i=0 ; arrPro.length> i ;i++){
    table +=`
     <tr>
        <td>${[i+1]}</td>
        <td>${arrPro[i].title}</td>
        <td>${arrPro[i].price}</td>
        <td>${arrPro[i].tax}</td>
        <td>${arrPro[i].ads}</td>
        <td>${arrPro[i].discount}</td>
        <td>${arrPro[i].total}</td>
        <td>${arrPro[i].category}</td>
       
        <td><button id="update" onclick='updateData(${i})'>update</button></td>
        <td><button id="delete" onclick='deleteItem(${i})'>delete</button></td>
        </tr>
    `
}
total.style.background='red'
document.getElementById('tbody').innerHTML=table;
let deleteAll=document.getElementById('deleteAll');
if(arrPro.length>0){
  deleteAll.innerHTML= `
  <button id="delete" onclick='deleteAll()'>Delete All(${arrPro.length})</button>
  `
}
else{
    deleteAll.innerHTML='';
}

}
readData();

function deleteItem(i){
arrPro.splice(i,1);
localStorage.product=JSON.stringify(arrPro);
readData();
}
function deleteAll(){
    localStorage.clear();
    arrPro.splice(0);
    readData();
}
function updateData(i){
title.value=arrPro[i].title;
price.value=arrPro[i].price;
tax.value=arrPro[i].tax;
ads.value=arrPro[i].ads;
discount.value=arrPro[i].discount;
category.value=arrPro[i].category;
count.style.display='none';
submit.innerHTML='Update';
getTotal();
mood='update';
temp=i;
scroll({
  top:0,
  behavior:"smooth"
 
})

}
let searchMood='Title';
function search(id){
  let search=document.getElementById('search')
if(id=='searchTitle'){
  searchMood='Title';

}
else{
  searchMood='Category';
 
}
search.placeholder='Search By ' + searchMood;
search.focus();
search.value='';
readData();

}
function searchData(value){
  let table='';
  for(let i=0 ;arrPro.length>i ;i++){
if(searchMood=='Title'){
  
    if(arrPro[i].title.includes(value.toLowerCase())){
      table +=`
      <tr>
         <td>${[i]}</td>
         <td>${arrPro[i].title}</td>
         <td>${arrPro[i].price}</td>
         <td>${arrPro[i].tax}</td>
         <td>${arrPro[i].ads}</td>
         <td>${arrPro[i].discount}</td>
         <td>${arrPro[i].total}</td>
         <td>${arrPro[i].category}</td>
        
         <td><button id="update" onclick='updateData(${i})'>update</button></td>
         <td><button id="delete" onclick='deleteItem(${i})'>delete</button></td>
         </tr>
     `
    }
  
}
  else{
   
      if(arrPro[i].category.includes(value.toLowerCase())){
        table +=`
        <tr>
           <td>${[i]}</td>
           <td>${arrPro[i].title}</td>
           <td>${arrPro[i].price}</td>
           <td>${arrPro[i].tax}</td>
           <td>${arrPro[i].ads}</td>
           <td>${arrPro[i].discount}</td>
           <td>${arrPro[i].total}</td>
           <td>${arrPro[i].category}</td>
          
           <td><button id="update" onclick='updateData(${i})'>update</button></td>
           <td><button id="delete" onclick='deleteItem(${i})'>delete</button></td>
           </tr>
       `
      
    }
  }
}

document.getElementById('tbody').innerHTML=table;
}
