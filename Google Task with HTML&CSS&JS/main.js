// Model

let todos;
const saved = JSON.parse(localStorage.getItem('todo-list'));

if (Array.isArray(saved)) {
  todos =saved;
} else {
  todos = [{ id: 1, title: 'Task1', date: '2022-06-27' },
  { id: 2, title: 'Task2', date: '2022-07-09' },
  { id: 3, title: 'Task3', date: '2022-10-15' }]
}

const creatTask = (title, date) => {
  const id = new Date().getTime();
  todos.push({
    title: title,
    date: date,
    id: id
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



//Controller

const  addTask = () => {
  const title = document.getElementById('title-input').value;
  const date = document.getElementById('date-input').value;

  document.getElementById('title-input').value = '';
  document.getElementById('date-input').value = '';

  creatTask(title,date);
  saveList();
  render();
}

function deleteTask(event) {
  const idToDelete = parseInt(event.target.id);

  finishTask(idToDelete);
  saveList();
  render();
}