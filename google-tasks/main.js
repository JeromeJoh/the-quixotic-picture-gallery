// ---------------------------------------------------Model
let lists

class Task {
  constructor(id, name, deadline, remark) {
    this.id = id
    this.name = name
    this.deadline = deadline
    this.remark = remark
  }
}

// 清空保存的数据
// localStorage.setItem('todo-lists', null)

//读取保存的数据或加载默认数据
const saved = JSON.parse(localStorage.getItem('todo-lists'))
if (saved) {
  lists = saved
} else {
  lists = {
    Inbox: [new Task(1, '打扫卫生', '2022-06-27', 'remark1'),
    new Task(2, '取快递', '', 'remark2'),
    new Task(3, '检索电子书', '2022-06-12', 'remark3')],
    Project: [new Task(11, '前端学习路线规划', '2022-06-27', 'remark11'),
    new Task(22, 'Web Design 入门', '2022-06-28', 'remark22'),
    new Task(33, 'Vue / React', '2022-06-12', 'remark33')]
  }
}

//初始化当前列表与任务项
let currentList = Object.keys(lists)[0], currentTask = new Task()


//创建新的任务列表
const createList = (listName) => {
  lists[listName] = []
  currentList = listName
  saveList()
}

//创建新的任务项
const createTask = (name, deadline, remark) => {
  const id = new Date().getTime()
  lists[currentList].push(new Task(id, name, deadline, remark))
  saveTask()
}

//保存当前任务项数据
const saveTask = () => {
  lists[currentList].forEach(task => {
    task = task.id == currentTask.id ? currentTask : task
  })
  saveList()
}

//保存任务列表至内存
const saveList = () => {
  localStorage.setItem('todo-lists', JSON.stringify(lists));
}




// ---------------------------------------------------View

//任务列表渲染
const listRender = () => {
  //清空所有任务列表
  document.getElementById('listDisplay').innerHTML = ''

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
    document.getElementById('listDisplay').appendChild(element)
  }

  //列表项添加点击事件
  let taskLists = document.querySelectorAll('#listDisplay>button')
  taskLists.forEach(list => {
    list.addEventListener('click', function () {
      currentList = this.innerText
      render()
    })
  })
}

//任务项渲染
const taskRender = () => {
  //修改当前任务列表名称
  document.querySelector('.list-info>p').innerText = currentList

  //清空所有任务项
  document.getElementById('todoList').innerHTML = ''

  //加载当前列表中的所有任务项
  todos = lists[currentList]
  todos.forEach(todo => {
    const element = document.createElement('div');
    element.className = 'task-item'
    element.innerHTML = `
    <img src="images/move.svg" class="item-sign">
    <input id=${todo.id} type="text" value="${todo.name}">
    `

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = `
    <img src='images/pairsign.svg' id='${todo.id}'>
    `
    deleteButton.id = todo.id
    deleteButton.className = 'delete-task'
    deleteButton.onclick = deleteTask
    element.appendChild(deleteButton)

    const todoList = document.getElementById('todoList');
    todoList.appendChild(element);

    element.children[1].onkeyup = function (e) {
      document.getElementById('titleInput').value = e.target.value
    }

    //新添加的任务项自动聚焦
    if (todo.id && todo.name == '') {
      element.children[1].focus()
    }
  })

  //任务项添加聚焦事件
  const tasks = document.querySelectorAll('.task-item')
  tasks.forEach(todo => {
    todo.children[1].addEventListener('focus', function () {
      _self = this
      currentTask = lists[currentList].find(
        function (obj) {
          return obj.id == _self.id
        }
      )
      detailRender()
    })
    todo.children[1].addEventListener('change', function (e) {
      currentTask.name = e.target.value
      saveTask()
    })
  })
  detailCleaner()
}


//任务信息渲染
const detailRender = () => {
  //加载右侧详细任务信息
  document.getElementById('titleInput').value = currentTask.name
  document.getElementById('dateInput').value = currentTask.deadline
  document.getElementById('taskDetail').value = currentTask.remark
  dateRender()
}

//清空任务信息
const detailCleaner = () => {
  document.getElementById('titleInput').value = ''
  document.getElementById('dateInput').value = ''
  document.getElementById('taskDetail').value = ''
  document.querySelector('.timestamp').style.display = 'none'
}

//时间标签渲染
const dateRender = () => {
  //判断当前任务项是否设置时间
  if (currentTask.deadline === '') {
    timeStamp = document.querySelector('.timestamp')
    timeStamp.style.display = 'none'
  } else {
    timeStamp = document.querySelector('.timestamp')
    timeStamp.firstElementChild.innerText = currentTask.deadline
    timeStamp.style.display = 'block'

    //任务时间添加点击删除事件
    timeStamp.addEventListener('click', function () {
      currentTask.deadline = ''
      timeStamp.style.display = 'none'
    })
  }
}

const render = () => {
  listRender()
  taskRender()
}

//初始化界面
render()


//新增任务列表弹出操作
const newList = document.getElementById('newList')
let isVisibale = false

newList.addEventListener('click', function () {
  isVisibale = !isVisibale
  if (isVisibale) {
    const elementInput = document.createElement('input');
    elementInput.id = 'listName'
    const elementSave = document.createElement('button');
    elementSave.innerText = 'Save';
    elementSave.id = 'save-button';
    const elementCancel = document.createElement('button');
    elementCancel.innerText = 'Cancel';
    elementCancel.id = 'cancel-button';
    const popUp = document.getElementById('popUp');
    popUp.append(elementInput, elementSave, elementCancel);
    elementInput.focus()

    const saveButton = document.getElementById('save-button');
    saveButton.onclick = () => {
      const newList = document.getElementById('listName');
      if (newList.value) { createList(newList.value) }
      popUp.innerHTML = '';
      render()
    }

    const cancelButton = document.getElementById('cancel-button');
    cancelButton.onclick = function () {
      popUp.innerHTML = '';
    }
  } else {
    popUp.innerHTML = '';
  }
})


//自适应高度文本框
const autoInput = document.getElementById("taskDetail");
autoInput.addEventListener("input", function () {
  let inputScrollTop = autoInput.scrollTop;
  let inputHeight = autoInput.offsetHeight;
  if (autoInput.scrollHeight >= 75) {
    autoInput.style.height = inputScrollTop + inputHeight + "px";
  }
});



// ---------------------------------------------------Controller
const addTask = () => {
  const id = new Date().getTime();
  currentTask = new Task(id, '', '', '')
  lists[currentList].push(currentTask)
  saveList()
  render()
}

function finishTask(id) {
  lists[currentList] = todos.filter(function (todo) {
    return !(todo.id === id)
  });
  saveList()
}

function deleteTask(event) {
  finishTask(parseInt(event.target.id))
  taskRender()
  detailCleaner()
}



//---------------------------------------------------Others
const titleInput = document.getElementById('titleInput')
titleInput.addEventListener('change', function (e) {
  console.log(e.target.value)
  currentTask.name = e.target.value
  saveTask()
})

const dateInput = document.getElementById('dateInput')
dateInput.addEventListener('change', function (e) {
  currentTask.deadline = e.target.value
  saveTask()
  dateRender()
})

const taskDetail = document.getElementById('taskDetail')
taskDetail.addEventListener('change', function (e) {
  currentTask.remark = e.target.value
  saveTask()
})