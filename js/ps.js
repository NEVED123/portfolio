window.addEventListener("scroll", () => {
    const text = document.getElementById('for-you');
    var y = window.scrollY;
    if (y >= 100){
        text.classList.add('disappear');
        return;
    }
    else{
        text.classList.remove('disappear');
    }
})