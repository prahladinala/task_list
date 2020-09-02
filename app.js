// Defiine UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput =  document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Load event Listeners function
function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task events
    form.addEventListener('submit', addTask);

    //Remove Task Event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

//Get task from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    })
}

//Add task function
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear Input
    taskInput.value = '';
    e.preventDefault();
}
//Store Task in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //Remove Task from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    task.forEach(function(task, index){
        if(taskItem.textContent == task){
            task.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
    //taskList.innerHTML = '';

    //Faster way => Comparison => https://jsperf.com/innerhtml-vs-removechild

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from Local Storage
    clearTaskFromLocalStorage();

}

// Clear Task from Local storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}