const container = document.getElementsByClassName("container");
const text = document.getElementsByClassName("text");

function activate() {
    text[0].innerText = "Breathe in"
    container[0].className = 'container grow'
    setTimeout(() => {
        text[0].innerText = "Hold"
        setTimeout(() => {
            container[0].className = 'container shrink'
            text[0].innerText = "Breathe out"
        }, 1500)
    }, 3000)
}


activate();
setInterval(activate, 7500);

