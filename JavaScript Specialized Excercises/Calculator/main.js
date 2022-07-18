const monitor = document.getElementById('monitor');
const backBtn = document.getElementById('back-button');
const clearBtn = document.getElementById('clear-button');
const result = document.getElementById('result');
let strCal = '';

//清除键
clearBtn.onclick = function() {
    monitor.value = '';
    strCal = '';
}

//后退键
backBtn.onclick = function() {
    monitor.value = monitor.value.slice(0, -1);
    strCal = strCal.slice(0, -1);
}

//等于键
result.onclick = () => {
    monitor.value = eval(strCal);
    strCal = eval(strCal) + '';
}

//常规键
const activate = btn => {
    str = btn.innerText
    if(str=='×') {
        strCal = strCal + '*';
    } else if(str=='÷') {
        strCal = strCal + '/';
    } else {
        strCal = strCal + str;
    }
    monitor.value = monitor.value + str;
}