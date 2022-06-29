// Model

// class todos {
//   constructor(id, title, date, time) {
//     this.id = id
//     this.title = title
//     this.date =date
//   }
// }

let todos;
const saved = JSON.parse(localStorage.getItem('todo-list'));

if (Array.isArray(saved)) {
  todos =saved;
} else {
  todos = [{ id: 1, title: 'Task1', date: '2022-06-27',detail: 'comment1' },
  { id: 2, title: 'Task2', date: '2022-07-09' ,detail: 'comment2' },
  { id: 3, title: 'Task3', date: '2022-10-15' ,detail: 'comment3' }]
}

const creatTask = (title, date, detail) => {
  const id = new Date().getTime();
  todos.unshift({
    title: title,
    date: date,
    id: id,
    detail: detail
  });
}

const finishTask = id => {
  todos = todos.filter(function (todo) {
    if (todo.id === id) {
      return false;
    } else {
      return true;
    }
  });
}

const saveList = () => {
  localStorage.setItem('todo-list',JSON.stringify(todos));
}


// View

const render = () => {
  //reset our list
  document.getElementById('todo-list').innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.innerText = todo.title + ' ' + todo.date;
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.style = "margin-left: 20px";
    deleteButton.onclick = deleteTask;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton)

    const finishButton = document.createElement('input');
    finishButton.type = 'checkbox';
    finishButton.onclick = deleteTask;
    finishButton.id = todo.id;
    element.appendChild(finishButton)
  })
}

render()

function KeyP(v) {
  document.getElementById('title-input-2').value = v.value;
}

function KeyN(v) {
  document.getElementById('title-input-1').value = v.value;
}



//Controller

const  addTask = () => {
  const title = document.getElementById('title-input-1').value;
  const date = document.getElementById('date-input').value;
  const detail = document.getElementById('task-detail').value

  document.getElementById('title-input-1').value = '';
  document.getElementById('date-input').value = '';

  creatTask(title, date, detail);
  console.log(todos);
  saveList();
  render();
}

function deleteTask(event) {
  const idToDelete = parseInt(event.target.id);

  finishTask(idToDelete);
  saveList();
  render();
}



//附加功能實現

let lists = {todos, };

const createList = document.getElementById('list-create');

createList.addEventListener('click', function() {
  if (0) {
    const element = document.createElement('button');
    const listDisplay = document.getElementById('list-display');
  listDisplay.appendChild(element);
  } else {

  }
})