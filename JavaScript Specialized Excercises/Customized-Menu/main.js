//！！！浏览器插件可能会影响菜单显示！！！

const menu = document.getElementById('menu');

document.oncontextmenu = (e) => {
    e = e || window.event;
    e.preventDefault==undefined ? e.returnValue=false : e.preventDefault();
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    return false;
}

document.onclick = function() {
    menu.style.display = 'none'
}