const ele = document.getElementById('ele');

ele.onmousedown = (e) => {
    e = e || window.event;
    const dotX = e.offsetX;
    const dotY = e.offsetY;
    document.onmousemove = (e) => {
        e = e || window.event;
        const divX = e.clientX;
        const divY = e.clientY;
        ele.style.top = (divY - dotY) + 'px';
        ele.style.left = (divX - dotX) + 'px';
    }
}

ele.onmouseup = () => {
    document.onmousemove = null;
}