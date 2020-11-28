const container = document.getElementsByClassName("container");
const text = document.getElementsByClassName("text");
const totalTime = 7500;
const breathInTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function activate() {
    text[0].innerText = "Breathe in"
    container[0].className = 'container grow'
    setTimeout(() => {
        text[0].innerText = "Hold"
        setTimeout(() => {
            container[0].className = 'container shrink'
            text[0].innerText = "Breathe out"
        }, holdTime)
    }, breathInTime)
}

activate();
setInterval(activate, totalTime);

