const divs = document.getElementsByTagName('div');
const spans = document.getElementsByTagName('span');

//Double 展示内容
spans[0].innerHTML = spans[0].innerHTML + spans[0].innerHTML
spans[1].innerHTML = spans[1].innerHTML + spans[1].innerHTML

//滾動函數
const roll = () => {
    for(var i=0;i<divs.length;i++) {
        if(divs[i].scrollLeft > spans[i].offsetWidth/2) {
            divs[i].scrollLeft = 0;
        } else {
            divs[i].scrollLeft = divs[i].scrollLeft + 1;
        }
    }
}



const timer =setInterval(roll, 10);











