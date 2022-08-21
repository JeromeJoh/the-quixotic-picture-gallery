const opts = document.getElementsByTagName('td');
const startBtn = document.getElementsByName('start');
const stopBtn = document.getElementsByName('stop');
let timer;
//开始键
startBtn[0].onclick = function() {
    clearInterval(timer);
    timer = setInterval(selector, 100);
}

//停止键
stopBtn[0].onclick = function() {
    clearInterval(timer);
}

//选择器
const selector = () => {
    let index = parseInt(Math.random() * 16);
    for(var i=0;i<16;i++){
        if(i==index) {
            opts[i].id = 'the-one';
        } else {
            opts[i].id = '';
        }
    }
}