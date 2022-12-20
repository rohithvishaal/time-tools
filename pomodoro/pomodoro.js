var interval = 1000; // ms
var expected = Date.now() + interval;


const modes = {
    "pomodoro" : 'active',
    "short break" : 'inactive',
    "long break" : 'inactive'
}

const timerFlags = {
    startFlag : false
}

const timerDurationInSeconds = {
    "pomodoro":1500,
    "short break":300,
    "long break":900
}

function showToast(text) {
    // Get the snackbar DIV
  let x = document.getElementById("snackbar");
  x.innerText = text
    // Add the "show" class to DIV
    x.className = "show";
  
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function setActiveMode(mode){
    const modesNode = document.querySelectorAll('.pomo-actions li')
    
    modesNode.forEach((modeNode)=>{
        if(modeNode.innerText.toLowerCase() === mode.toLowerCase()){
            console.log(mode, modeNode.innerText.toLowerCase())
            modeNode.style.color = 'white'
            modeNode.style.backgroundColor = 'black'
            const body = document.getElementsByTagName('body')[0]
            if(modeNode.innerText.toLowerCase() === 'short break')
            body.style.backgroundColor = 'rgb(56, 133, 138)'
            if(modeNode.innerText.toLowerCase() === 'long break')
            body.style.backgroundColor = 'rgb(57, 112, 151)'
            if(modeNode.innerText.toLowerCase() === 'pomodoro')
            body.style.backgroundColor = 'tomato'

        }
        else{
            modeNode.style.color = 'black'
            modeNode.style.backgroundColor = 'white'
        }
    })
}

function getContext(){
    const ctx = []
    for( const mode in modes){
        if(modes[mode] === 'active'){
            ctx.push(mode)
            ctx.push(timerDurationInSeconds[mode])
        }
    }
    time = ctx[1]
    return ctx
}

setTimeout(step, interval);
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function handleTimeEnd(){
    const [mode, timeDuration] = getContext()
    showToast(`${mode} is Completed!`)
    pomoResetHandler()

}

function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
        alert("error")
    }
    if(timerFlags.startFlag){
        if(time <= 0){
            timerFlags.startFlag = false
            handleTimeEnd()
        }
        let currentTime = document.querySelector('.time-container')// do what is to be done
        currentTime.innerText = fancyTimeFormat(time)
        time -= 1
    }
    expected += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}

function pomoButtonClickHandler(){
   timerFlags.startFlag = !timerFlags.startFlag
   if(timerFlags.startFlag){
    pomoButton.innerText = 'PAUSE';
    }
    else{
        pomoButton.innerText = 'START';
    }
}

function pomoResetHandler(){
    let currentTime = document.querySelector('.time-container')// do what is to be done
    const [mode, timeDuration] = getContext()
    currentTime.innerText = fancyTimeFormat(timeDuration)
    time = timeDuration
    timerFlags.startFlag =false
    pomoButton.innerText = 'START';
}

function pomoActionHandler(pomoAction){
    pomoResetHandler()
    const activeMode = pomoAction.innerText
    setActiveMode(activeMode)
    for(const mode in modes){
        if(mode === activeMode.toLowerCase()){
            modes[mode] = 'active'
        }else{
            modes[mode] = 'inactive'
        }
    }
    const [mode, timeDuration] = getContext()
    let currentTime = document.querySelector('.time-container')// do what is to be done
    currentTime.innerText = fancyTimeFormat(timeDuration)

}


const pomoButton = document.getElementById('pomo-button')
pomoButton.addEventListener('click', pomoButtonClickHandler)

const pomoReset = document.getElementById('pomo-reset')
pomoReset.addEventListener('click', pomoResetHandler)

const pomoActions = document.querySelectorAll('.pomo-actions li')
console.log(pomoActions)
pomoActions.forEach((pomoAction)=>{
    pomoAction.addEventListener('click', ()=>{pomoActionHandler(pomoAction)})
})
let init = document.querySelector('.time-container')
init.innerText = fancyTimeFormat(getContext()[1])
setActiveMode(getContext()[0])