var interval = 10; // ms
var expected = Date.now() + interval;
let currentTime = document.querySelector('.time-container')
const timerFlags = {
    startFlag : false
}

setTimeout(step, interval);
var time = 0

function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var millis = ~~(duration%100)
    var secs = ~~(duration/60)
    var mins = ~~(secs/60)
    var hrs = ~~(mins/60)
    var ret = ''

    ret += "" + (hrs < 10 ? "00" : "") + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs + "." + (millis < 10 ? "0" : "");
    ret += "" + millis
    return ret;
}

function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if(timerFlags.startFlag){
        // do what is to be done
        // currentTime.innerText = fancyTimeFormat(time)
        currentTime.innerText = fancyTimeFormat(time)
        time += 1
    }
    expected += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}

function timerStartHandler(){
    timerFlags.startFlag = !timerFlags.startFlag
    timerFlags.startFlag ? timerStart.innerText = 'PAUSE' : timerStart.innerText = 'START';
    toggleFlag()
}

function toggleFlag(){
    let timerFlag = document.getElementById('timer-flag')
    if(timerFlags.startFlag){
        timerFlag.disabled = false
    }else{
        timerFlag.disabled = true
    }
}


function addTimeStamp(){
    const timeStampContainer = document.getElementById('timestamp-container')
    const timeStamp = document.createElement("p")
    timeStamp.innerHTML = fancyTimeFormat(time)
    timeStamp.classList.add("time-stamp")
    timeStampContainer.appendChild(timeStamp)
}

let timerStart = document.getElementById('timer-start')
timerStart.addEventListener('click', timerStartHandler)

let timerFlag = document.getElementById('timer-flag')
timerFlag.addEventListener('click', addTimeStamp)


let timerReset = document.getElementById('timer-reset')
timerReset.addEventListener('click', ()=>{
    
    console.log("reset")
    timerStart.innerHTML = 'start'
    timerFlags.startFlag = false  
    toggleFlag()
    currentTime.innerText = fancyTimeFormat(0)
    let timeStampContainer = document.querySelectorAll('#timestamp-container p')
    console.log(timeStampContainer)
    timeStampContainer.forEach((timeStamp)=>{
        console.log(timeStamp)
        timeStamp.remove()
    })
})


toggleFlag()