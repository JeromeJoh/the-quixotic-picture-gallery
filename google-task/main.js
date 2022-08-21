// Model


let todos;
const saved = JSON.parse(localStorage.getItem('todo-list'));

if (Array.isArray(saved)) {
  todos =saved;
} else {
  todos = [{ id: 1, title: 'Task1', date: '2022-06-27',detail: 'comment1' },
  { id: 2, title: 'Task2', date: '2022-07-09' ,detail: 'comment2' },
  { id: 3, title: 'Task3', date: '2022-10-15' ,detail: 'comment3' }]
}

let lists =['Project','Waiting']

const creatList = (title) => {
  todos.push(title);
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

const saveTask = () => {
  localStorage.setItem('todo-list',JSON.stringify(todos));
}

const saveList = () => {
  localStorage.setItem('todo-list',JSON.stringify(todos));
}




// View

const render = () => {

  //reset all lists
  document.getElementById('list-display').innerHTML =  `
  <button id="list-displaying">
    <img src="images/move.svg">
    Inbox
  </button>
  `;

  lists.forEach(function (list) {
    const element = document.createElement('button');
    element.id = 'list-display';
    let htmlstr = `
    <img src="images/move.svg" class="item-move" style="height:20px">
    ${list}
    `
    element.innerHTML = htmlstr;
    document.getElementById('list-display').appendChild(element);
  })


  //reset one single list
  document.getElementById('todo-list').innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.className = 'task-item';
    let htmlstr = `
    <img src="images/move.svg" class="item-move" style="height:20px">
    <input id=${todo.id} class="todo-item" type="search" value="${todo.title}">
    `
    element.innerHTML = htmlstr;

    const deleteButton = document.createElement('button');
    deleteButton.onclick = deleteTask;
    deleteButton.innerHTML = `
    <img src='images/pairsign.svg' id='${todo.id}'>
    `
    deleteButton.id = todo.id;
    deleteButton.className = 'delete-task'
    element.appendChild(deleteButton);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element);
  })
}

render()


//Controller

const  addTask = () => {
  if (document.getElementById('title-input').value === '') {
    document.getElementById('title-input').focus();
  } else {
    const title = document.getElementById('title-input').value;
    console.log(title);
    const date = document.getElementById('date-input').value;
    const detail = document.getElementById('task-detail').value

    document.getElementById('title-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('task-detail').value = '';

    creatTask(title, date, detail);
    saveTask();
    render();
  }
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

function deleteTask(event) {
  const idToDelete = parseInt(event.target.id);
  console.log(event.target);
  finishTask(idToDelete);
  saveTask();
  render();
}


//新增任务列表操作

let createList = document.getElementById('list-create')
let cnt = 0;

createList.addEventListener('click', function() {
  if (cnt%2 === 0) {
    cnt = cnt + 1;
    const element = document.createElement('input');
    element.id = 'list-name';
    const element2 = document.createElement('button');
    const element3 = document.createElement('button');
    element2.innerText = 'Save';
    element2.id = 'save-button';
    element3.innerText = 'Cancel';
    element3.id = 'cancel-button';
    const popButton = document.getElementById('pop-button');
    popButton.appendChild(element);
    popButton.appendChild(element2);
    popButton.appendChild(element3);

    const saveButton = document.getElementById('save-button');
    const list = document.getElementById('list-name');
    saveButton.onclick = function() {
      const newList = document.getElementById(element.id);
      popButton.innerHTML = '';
      lists.push(newList.value);
      render();
    }

    const cancelButton = document.getElementById('cancel-button');
    cancelButton.onclick = function() {
      popButton.innerHTML = '';
    }
  } else {
    cnt = cnt + 1;
    const popButton = document.getElementById('pop-button');
    popButton.innerHTML = '';
  }
})






