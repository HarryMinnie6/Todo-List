const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")



todoButton.addEventListener('click', addTodo)

function addTodo(e){
    e.preventDefault();

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button')
    completedButton.innerHTML = "<i class='fas fa-check fa-2x'></i>" 
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "<i class='fas fa-trash fa-2x'></i>"
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)
    todoList.appendChild(todoDiv)  //adding the newTodo, completedButton, deleteButton to the "todo-list ul"

    todoInput.value = ''
}

todoList.addEventListener('click', deleteTodo)

function deleteTodo(e){
    const item = e.target

    if( item.classList[0]=== "delete-btn"){
        const todo = item.parentElement
        todo.remove()
    } if (item.classList[0]=== 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed') // for the CSS effect when completed button is clicked
    }

}

const filterOption = document.querySelector(".filter-todo")

filterOption.addEventListener('click', filterTodo)

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