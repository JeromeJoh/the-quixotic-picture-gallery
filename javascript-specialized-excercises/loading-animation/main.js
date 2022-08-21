const preloader = document.getElementById('preloader')
const petal=preloader.firstElementChild.children
for(let i=0, cnt=petal.length; i<cnt; i++){
    petal[i].style.transform='translate(10px,10px) rotate('+(i*360/cnt)+'deg)'
}

let angle = -45, index= 5
timer = setInterval(function(){

    //背景跳跃动画
    angle+=45
    preloader.style.backgroundImage = `linear-gradient(${angle}deg, #098, #999)`

    //加载图案动画
    for(i=0; i<8; i++){
        if(i==index){
            petal[i].id = 'flag' 
        } else {
            petal[i].id = ''
        }
    }
    if(index == 7){index=0} else(index++)

},100)


window.addEventListener('load', function(){
    // preloader.style.display = 'none'
    // preloader.nextElementSibling.style.display = 'block'
    // console.log(preloader.nextElementSibling)
    preloader.parentElement.removeChild(preloader)
})

