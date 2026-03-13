let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");

taskInput.addEventListener("keypress", function(e){
if(e.key==="Enter"){
addTask();
}
});

searchInput.addEventListener("input", renderTasks);

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

let text = taskInput.value.trim();
if(text==="") return;

tasks.push({
text:text,
completed:false
});

taskInput.value="";

saveTasks();
renderTasks();

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
renderTasks();

}

function toggleTask(index){

tasks[index].completed = !tasks[index].completed;

saveTasks();
renderTasks();

}

function setFilter(type){

filter = type;
renderTasks();

}

function clearCompleted(){

tasks = tasks.filter(task=>!task.completed);

saveTasks();
renderTasks();

}

function renderTasks(){

let list = document.getElementById("taskList");
list.innerHTML="";

let search = searchInput.value.toLowerCase();

tasks.forEach((task,index)=>{

if(task.text.toLowerCase().includes(search)){

if(
filter==="all" ||
(filter==="active" && !task.completed) ||
(filter==="completed" && task.completed)
){

let li = document.createElement("li");

li.innerHTML=`
<span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
${task.text}
</span>

<button onclick="deleteTask(${index})">X</button>
`;

list.appendChild(li);

}

}

});

}

renderTasks();

