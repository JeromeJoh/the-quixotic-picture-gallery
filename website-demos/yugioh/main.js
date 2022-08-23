let displayable = true;

const unfold = () => {

    //展示与折叠内容
    const foldedDiv = document.querySelectorAll('.more-content');
    foldedDiv.forEach(function(box) {
        if(displayable) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    })

    //按钮变化
    const btn = document.querySelector('.btn>button');
    if(displayable) {
        btn.style.transform = 'rotateX(180deg)';
    } else {
        btn.style.transform = '';
    }
    displayable = !displayable;
}