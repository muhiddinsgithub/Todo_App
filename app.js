const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoItem");
const todoList = document.querySelector("#todoList");

// get todos from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
let count = 0;
for (let todo of savedTodos) {
  let newTodo = document.createElement("li");
  newTodo.setAttribute("id", count);
  count++;
  newTodo.innerHTML = todo.task;
  newTodo.isCompleted = todo.isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.classList.toggle("crossed");
  }
  todoList.appendChild(newTodo);
}

todoList.addEventListener("click", function (e) {
  e.preventDefault();
  let clickedListItem = e.target;
  if (clickedListItem.tagName === "BUTTON") {
    clickedListItem.parentElement.remove();
    let id = clickedListItem.parentElement.id;
    console.log(id);
    savedTodos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  } else if (clickedListItem.tagName === "LI") {
    if (!clickedListItem.isCompleted) {
      clickedListItem.classList.toggle("crossed");
      clickedListItem.isCompleted = true;
    } else {
      clickedListItem.classList.toggle("crossed");
      clickedListItem.isCompleted = false;
    }
    for (let todo of savedTodos) {
      if (todo.task === clickedListItem.innerHTML) {
        todo.isCompleted = clickedListItem.isCompleted;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    }
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodoItem = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "x";

  newTodoItem.innerText = input.value;
  newTodoItem.appendChild(deleteButton);
  todoList.appendChild(newTodoItem);
  input.value = "";

  // store todo item to localStorage
  savedTodos.push({ task: newTodoItem.innerHTML, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});
