// Model
class Task {
  constructor(id, name, deadline, remark) {
    this.id = id
    this.name = name
    this.deadline = deadline
    this.remark = remark
  }
}

let lists;
let saved = JSON.parse(localStorage.getItem('todo-lists'));


//读取先前数据或加载默认数据
if (saved) {
  lists = saved
  console.log('已读取本地存储数据')
} else {
  lists = {
    Inbox: [new Task(1, '打扫卫生', '2022-06-27', 'remark1'),
    new Task(2, '取快递', '', 'remark2'),
    new Task(3, '检索电子书', '2022-06-12', 'remark3')],
    Project: [new Task(11, '前端学习路线规划', '2022-06-27', 'remark11'),
    new Task(22, 'Web Design 入门', '2022-06-28', 'remark22'),
    new Task(33, 'Vue / React', '2022-06-12', 'remark33')]
  }
  console.log('首次使用加载默认数据')
}

let currentList = 'Inbox', currentTask = new Task()

//创建新的任务列表
const createList = (listName) => {
  lists[listName] = []
  currentList = listName
  saveList()
}

//创建新的任务
const creatTask = (name, deadline, remark) => {
  const id = new Date().getTime()
  todos.push(new Task(id, name, deadline, remark))
  console.log('新的任务已创建')
}

//保存当前任务项数据
const saveTask = () => {
  lists[currentList].forEach(task => {
    task = task.id == currentTask.id ? currentTask : task
  })
  saveList()
}

//保存所有数据至内存
const saveList = () => {
  localStorage.setItem('todo-lists', JSON.stringify(lists));
}




// View

//列表项渲染
const listRender = () => {
  //清空所有任务列表
  document.getElementById('list-display').innerHTML = ''

  //加载现有任务列表
  for (k in lists) {
    const element = document.createElement('button')
    if (k === currentList) {
      element.className = 'current-list'
    } else {
      element.className = ''
    }

    element.draggable = 'true'
    element.innerHTML = `
    <img src="images/move.svg" class="item-move" style="height:20px">
    ${k}
    `
    document.getElementById('list-display').appendChild(element)
  }

  //列表项聚焦事件
  let taskLists = document.querySelectorAll('#list-display>button')
  taskLists.forEach(list => {
    list.addEventListener('click', function () {
      currentList = this.innerText
      listRender()
      taskRender()
    })
  })
}

//任务项渲染
const taskRender = () => {
  //获取当前任务列表名称
  const listInfo = document.querySelector('.list-info>p')
  listInfo.innerText = currentList

  //清空所有任务项
  document.getElementById('todo-list').innerHTML = '';

  //加载当前列表中的所有任务项
  todos = lists[currentList]
  todos.forEach(todo => {
    const element = document.createElement('div');
    element.className = 'task-item';
    let htmlstr = `
    <img src="images/move.svg" class="item-move" style="height:20px">
    <input id=${todo.id} class="todo-item" type="search" value="${todo.name}">
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

    element.children[1].onkeyup = function (e) {
      document.getElementById('title-input').value = e.target.value
    }

    element.children[1].onchange = function (e) {
      currentTask.name = e.target.value
      saveTask()
    }

    //判断是否为新添加的任务项
    if (todo.id && todo.name == '') {
      element.children[1].focus()
    }
  })

  //任务项聚焦事件
  let tasks = document.querySelectorAll('.task-item')
  tasks.forEach(todo => {
    todo.firstElementChild.nextElementSibling.addEventListener('focus', function () {
      _self = this
      currentTask = lists[currentList].find(
        function (obj) {
          return obj.id == _self.id
        }
      )
      detailRender()
    })

  })
}


//任务详细信息渲染
const detailRender = () => {
  //加载右侧详细任务信息
  document.getElementById('title-input').value = currentTask.name
  document.getElementById('date-input').value = currentTask.deadline
  document.getElementById('task-detail').value = currentTask.remark
  dateRender()
}

//时间标签渲染
const dateRender = () => {
  if (currentTask.deadline === '') {
    timeStamp = document.querySelector('.timestamp')
    timeStamp.style.display = 'none'
  } else {
    timeStamp = document.querySelector('.timestamp')
    timeStamp.firstElementChild.innerText = currentTask.deadline
    timeStamp.style.display = 'block'

    //清除任务时间设置
    timeStamp.addEventListener('click', function () {
      currentTask.deadline = ''
      timeStamp.style.display = 'none'
    })

  }
}


const initialRender = () => {
  listRender()
  taskRender()
}

initialRender()


//Controller

const addTask = () => {
  const id = new Date().getTime();
  currentTask = new Task(id, '', '', '')
  lists[currentList].push(currentTask)
  initialRender()
  detailCleaner()
}

function finishTask(id) {
  lists[currentList] = todos.filter(function (todo) {
    if (todo.id === id) {
      return false;
    } else {
      return true;
    }
  });
}

function deleteTask(event) {
  const idToDelete = parseInt(event.target.id);
  finishTask(idToDelete)
  saveList()
  taskRender()
  detailCleaner()
}


//新增任务列表操作

const newList = document.getElementById('new-list')
let isVisibale = false;

newList.addEventListener('click', function () {
  isVisibale = !isVisibale
  if (isVisibale) {
    const elementInput = document.createElement('input');
    elementInput.id = 'list-name';
    const elementSave = document.createElement('button');
    const elementCancel = document.createElement('button');
    elementSave.innerText = 'Save';
    elementSave.id = 'save-button';
    elementCancel.innerText = 'Cancel';
    elementCancel.id = 'cancel-button';
    const popButton = document.getElementById('pop-button');
    popButton.append(elementInput, elementSave, elementCancel);

    const saveButton = document.getElementById('save-button');
    saveButton.onclick = function () {
      const newList = document.getElementById('list-name');
      if (newList.value) { createList(newList.value) }
      popButton.innerHTML = '';
      initialRender()
      console.log('新的任务列表已创建')
    }

    const cancelButton = document.getElementById('cancel-button');
    cancelButton.onclick = function () {
      popButton.innerHTML = '';
    }
  } else {
    const popButton = document.getElementById('pop-button');
    popButton.innerHTML = '';
  }
})


//自适应高度文本框
const autoInput = document.getElementById("task-detail");

autoInput.addEventListener("input", function () {
  let inputScrollTop = autoInput.scrollTop;
  let inputHeight = autoInput.offsetHeight;
  if (autoInput.scrollHeight >= 75) {
    autoInput.style.height = inputScrollTop + inputHeight + "px";
  }
});



//绑定任务信息改变事件
const dateInput = document.getElementById('date-input')
dateInput.addEventListener('change', function (e) {
  currentTask.deadline = e.target.value
  saveTask()
  dateRender()
})


const titleInput = document.getElementById('title-input')
titleInput.addEventListener('change', function (e) {
  currentTask.name = e.target.value
  saveTask()
})

titleInput.addEventListener('keyup', function (e) {

})

const taskDetail = document.getElementById('task-detail')
taskDetail.addEventListener('change', function (e) {
  currentTask.remark = e.target.value
  saveTask()
})

//清空任务详细信息
const detailCleaner = () => {
  document.getElementById('title-input').value = ''
  document.getElementById('date-input').value = ''
  document.getElementById('task-detail').value = ''
  document.querySelector('.timestamp').style.display = 'none'
}
