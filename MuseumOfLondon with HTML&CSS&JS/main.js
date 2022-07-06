const switchImage = filename => {
    const imgInDisplay = document.getElementById('displaying');
    imgInDisplay.setAttribute('src',filename);
}

const switchPage = num => {
    for(var i=0; i<5; i++) {
        str = '.page'+ (i+1);
        let page = document.querySelector(str);
        let button = document.querySelectorAll('.switch-pages>button');
        if(i == num){
            page.style.display = 'block';
            button[i].id = 'active';
        } else {
            page.style.display = 'none';
            button[i].id = '';
        }
    }
}