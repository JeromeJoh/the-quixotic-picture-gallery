const ele = document.getElementById('ele');

//添加键盘控制事件
document.onkeydown = (e) => {
    e = e || window.event;
    const sty = getStyle(ele);

    switch(e.key) {
        case 'ArrowUp':
            ele.style.top = parseInt(sty.top) - 10 +'px';
            break;
        case 'ArrowDown' :
            ele.style.top = parseInt(sty.top) + 10 +'px';
            break;
        case 'ArrowLeft' :
            ele.style.left = parseInt(sty.left) - 10 +'px';
            break;
        case 'ArrowRight' :
            ele.style.left = parseInt(sty.left) + 10 +'px';
            break;
        case 'w':
            ele.style.top = parseInt(sty.top) - 10 +'px';
            break;
        case 's' :
            ele.style.top = parseInt(sty.top) + 10 +'px';
            break;
        case 'a' :
            ele.style.left = parseInt(sty.left) - 10 +'px';
            break;
        case 'd' :
            ele.style.left = parseInt(sty.left) + 10 +'px';
            break;
    }
}

//获取样式表对象
const getStyle = (ele) => {
    if(window.getComputedStyle == undefined) {
        return ele.currentStyle;
    } else {
        return window.getComputedStyle(ele, null);
    }
}
