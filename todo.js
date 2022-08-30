let tarea = (title,description,dueDate,priority) =>{
    return {title,description,dueDate,priority}
};

class proyecto {
    constructor(project){
        this.project = project
        this.tasks = [];
    }
    
    addNewTask(title,description,dueDate,priority){
        let newTask = tarea(title,description,dueDate,priority);
        this.tasks.push(newTask);
    }
}
//por defecto el proyecto es definido como "Home"
let currentProject = new proyecto("Home");
let proyectos= []
display();
displayListas();

//agrega un nuevo proyecto y lo establece como currentProject
document.getElementById("addProject").addEventListener("click",function(){
    modal.close();
    let input = document.getElementById("newPro");
    if(input.value !="" && localStorage["Proyectos"]){
        proyectos = localStorage.getItem("Proyectos").split(",")
        currentProject = new proyecto(input.value);
        proyectos.push(input.value)
        localStorage.setItem("Proyectos",proyectos);
        localStorage.setItem(currentProject.project,JSON.stringify(currentProject.tasks));
        document.getElementById("list").innerHTML +=`<li>${input.value}</li>`
        input.value= "";
        selectListas();
        display()
    }else{
        currentProject = new proyecto(input.value);
        proyectos.push(input.value)
        localStorage.setItem("Proyectos",proyectos);
        localStorage.setItem(currentProject.project,JSON.stringify(currentProject.tasks));
        document.getElementById("list").innerHTML +=`<li>${input.value}</li>`
        input.value= "";
        selectListas();
        display()
    }
})

//agrega la tarea al CurrentProject
document.getElementById("boton").addEventListener("click",function(){
    //(+codigo para que se seleccione el projecto correcto)
    if(localStorage[currentProject.project]){
        let titulo = document.getElementById("titulo");
        let descripcion = document.getElementById("descripcion");
        let fecha = document.getElementById("date");
        let prioridad = document.getElementById("prioridad");
        currentProject.tasks = JSON.parse(localStorage.getItem(currentProject.project))
        currentProject.addNewTask(titulo.value,descripcion.value,fecha.value,prioridad.value);
        localStorage.setItem(currentProject.project,JSON.stringify(currentProject.tasks));
        display()
        //reset values
        titulo.value = "";
        descripcion.value = "";
        fecha.value = "";

}else{
    console.log(currentProject)
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let fecha = document.getElementById("date");
    let prioridad = document.getElementById("prioridad");
    currentProject.addNewTask(titulo.value,descripcion.value,fecha.value,prioridad.value);
    localStorage.setItem(currentProject.project,JSON.stringify(currentProject.tasks));
    display()
    //reset values
    titulo.value = "";
    descripcion.value = "";
    fecha.value = "";
}})

function display(){
    if(localStorage[currentProject.project]){
    let container = document.querySelector(".container");
    container.innerHTML= ""
    let almacenar = JSON.parse(localStorage.getItem(currentProject.project));
    for(let i=0;i<almacenar.length;i++){
    let todo = almacenar[i]
    let task = document.createElement("div");
    container.appendChild(task);
    task.innerHTML += `<p>${todo.title.charAt(0).toUpperCase() + todo.title.slice(1)} <br>Descripción: ${todo.description} <br>Fecha: ${todo.dueDate.split("-").reverse().join("-")} <br> Status:<span class=${todo.priority}> ${todo.priority}</span></p>`;
    task.setAttribute("class","task");
    let botonCompletado = document.createElement("button");
    let divTask = document.querySelectorAll(".task");
    divTask[i].appendChild(botonCompletado);
    botonCompletado.innerHTML="Completado"
    botonCompletado.setAttribute("data-boton",`${i}`);
    botonCompletado.addEventListener("click",function(){
            let tareaAEliminar= document.querySelector(`button[data-boton="${[i]}"]`)
            almacenar.splice(tareaAEliminar.dataset.boton,1);
            localStorage.setItem(currentProject.project,JSON.stringify(almacenar));
            display();
        })
    //boton para cambiar status
    let botonStatus = document.createElement("button");
    divTask[i].appendChild(botonStatus);
    botonStatus.innerHTML = "Cambiar Status";
    botonStatus.setAttribute("class","status");
    botonStatus.addEventListener("click",()=>{
        if(todo.priority=="importante"){
            todo.priority="No importante"
            localStorage.setItem(currentProject.project,JSON.stringify(almacenar));
            display();
        }else {
            todo.priority="importante"
            localStorage.setItem(currentProject.project,JSON.stringify(almacenar));
            display();
        }
    })
    }
}
}

//evento para cambiar de proyecto en la lista
function selectListas(){
let listas = document.querySelectorAll("li");
console.log(listas);
listas.forEach(function(lista){
    console.log(lista);
    lista.addEventListener("click",function(){
        currentProject.project = lista.innerHTML
        currentProject.tasks = JSON.parse(localStorage.getItem(lista.innerHTML));
        console.log(currentProject);
        display();
    })
})}

function displayListas(){
    if(localStorage[proyectos])
   {let proyectosLista = document.getElementById("list")
   let list = localStorage.getItem("Proyectos").split(",");
   for (let i=0; i<list.length; i++){
    proyectosLista.innerHTML +=`<li>${list[i]}</li>`
   }
   selectListas()}
}

//modal para agregar proyecto
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});