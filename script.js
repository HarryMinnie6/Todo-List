const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")

todoButton.addEventListener('click', addTodo)

// function for creating a todo item
function addTodo(e){
    e.preventDefault();

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)
    // saveLocalTodo(todoInput.value) 
    
    const completedButton = document.createElement('button')
    completedButton.innerHTML = "<i class='fas fa-check fa-2x'></i>" 
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "<i class='fas fa-trash fa-2x'></i>"
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)
    // todoList.appendChild(todoDiv)  //adding the newTodo, completedButton, deleteButton to the "todo-list ul"

    //to stop user from submitting an empty todo item
    if( todoInput.value === '') {
        alert('djdfjdfhvbdf')
    } else {
        todoList.appendChild(todoDiv)
        saveLocalTodo(todoInput.value)
    }

    todoInput.value = ''
}

todoList.addEventListener('click', deleteTodo)
// function for deleting a todo item
function deleteTodo(e){
    const item = e.target

    if( item.classList[0]=== "delete-btn"){
        const todo = item.parentElement
        todo.remove()
        removeLocalTodos(todo)

    } if (item.classList[0]=== 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed') // for the CSS effect when completed button is clicked
    }

}

const filter = document.querySelector(".filter-todo")

filter.addEventListener('click', filterTodo)

// function for filtering todo list
function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incomplete":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}
// saving todos to local storage, gets called under addTodo
function saveLocalTodo(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos= JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}


// function for removing todos to local storage, gets called under deleteTodo
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos= [];
    } else {
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos))
}
// when page is loaded, local stroage todos are loaded
document.addEventListener('DOMContentLoaded',getTodos)

// function for loading the todos stored in local storage when page is loaded
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos= [];
    } else {
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
    
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
    
        const completeButton = document.createElement('button')
        completeButton.innerHTML = "<i class='fas fa-check fa-2x'></i>"
        completeButton.classList.add('complete-btn')
        todoDiv.appendChild(completeButton)
    
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "<i class='fas fa-trash fa-2x'></i>"
        deleteButton.classList.add('delete-btn')
        todoDiv.appendChild(deleteButton)
        
        todoList.appendChild(todoDiv)
        
    })
}



document.addEventListener('DOMContentLoaded',getTodos)