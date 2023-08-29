let coutdown;
const showTimeLeft = document.querySelector('.display__time-left')
const showEndTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(sec) {
    const now = Date.now();
    const then = now + sec * 1000;
    displayTimeLeft(sec)
    displayEndTime(then);

    clearInterval(coutdown)

    coutdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        if (secLeft < 0) {
            clearInterval(coutdown);
            return;
        }
        displayTimeLeft(secLeft)
    }, 1000)

}

function displayTimeLeft(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    showTimeLeft.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`

}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minute = end.getMinutes();
    showEndTime.textContent = `Be back at ${hours}:${minute < 10 ? "0" : ""}${minute}`
}

function startTimer() {
    const start = parseInt(this.dataset.time);
    timer(start);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const setMin = this.minutes.value;
    timer(setMin * 60);
    this.reset();
})
