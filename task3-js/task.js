let input=document.getElementById('input');
let create=document.getElementById('create');
let Delete=document.getElementById('Delete');
let edit=document.getElementById('edit');
let outputSection=document.getElementById('outputSection');
let count;

let arr=[];
if(localStorage.tasks!=null){
    arr=JSON.parse(localStorage.tasks);
    read();
}
let mood='create';
let temp;
create.onclick=function(){
    if(input.value==''){
        return;
    }
    else{
        let obj={
            input:input.value,
            checked:false
        }
        if(mood=='create') {
        arr.push(obj);}
        else{
        arr[temp]=obj;
        mood='create';
        }
        localStorage.setItem('tasks',JSON.stringify(arr));
      
    }
    input.value='';
   read();
}

function read(){
    
    part='';

    for(let i=0 ; arr.length>i ; i++){
       part+=`
       <div class='part'>
    <input type="checkbox" id="task" onclick='change(${i})'><label id="label-${i}" style="font-size:27px ; color:rgb(54, 50, 45)" >${arr[i].input}</label></input>
   <div class="buttons">
   <button id="Delete" onclick='deleteTask(${i})'>Delete</button>
   <button id="edit" onclick='editTask(${i})'>Edit</button>
   </div>
   </div>`
   outputSection.innerHTML = '';
   
    }
    document.getElementById('outputSection').innerHTML=part;
 for(let i=0 ; arr.length>i ; i++){
    let label = document.getElementById(`label-${i}`);
    if(arr[i].checked){
        label.style.textDecoration = "line-through"; 
        label.style.color = "gray"; 
        
    }
    else{
        label.style.textDecoration = "none";  
        label.style.color = "rgb(54, 50, 45)";  
    }
}

   
}
function editTask(i){
    mood='update';
 input.value=arr[i].input;
 temp=i;
}
function deleteTask(i){
    arr.splice(i,1);
    localStorage.setItem('tasks' , JSON.stringify(arr));
    read();
}
function change(i) {
    let checkbox = document.querySelectorAll('input[type="checkbox"]')[i];
    let label = document.querySelectorAll('label')[i];
    arr[i].checked = checkbox.checked; 
    if (checkbox.checked) {
        label.style.textDecoration = "line-through"; 
        label.style.color = "gray"; 
       
       
    } else {
        label.style.textDecoration = "none";  
        label.style.color = "rgb(54, 50, 45)";  
        
    }
    localStorage.setItem('tasks', JSON.stringify(arr));

     
}




