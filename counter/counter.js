var interval
let drawnRects = []
let offset = 84
let center = {x:0, y:94}
function drawDots(mode){
    let [x, y] = [Math.random()*window.innerWidth, Math.random()*window.innerHeight]
    console.log(center)
    if(mode === 1){
        context.fillStyle = "green"
        context.fillRect(x, y,30,30)
    }
    else if (mode === -1){
        context.fillStyle = "red"
        context.fillRect(x, y,30,30)
    }
    else if(mode === 0){
        context.fillStyle = 'tomato';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    center.x += 35
    console.log(canvas.width)
    if(center.x > canvas.width){
        center.y += 35
        center.x = 0
    }
    
    
}



function actionHandler(action){
    
    const actionType = action.innerText
    let currentCount = parseInt(currentCountNode.innerText)
    switch(actionType){
        case 'INCREASE':
            
            currentCount += 1; 
            break;
        case 'DECREASE':
            
            currentCount -= 1; break;
        case 'RESET':
            
            currentCount = 0;  break;
    }

    if(currentCount > 0){
        drawDots(1)
        currentCountNode.classList.add('positive')
        currentCountNode.classList.remove('negative', 'reset')
    }
    else if(currentCount < 0){
        drawDots(-1)
        currentCountNode.classList.add('negative')
        currentCountNode.classList.remove('positive', 'reset')
    }
    else{
        drawDots(0)
        currentCountNode.classList.add('reset')
        currentCountNode.classList.remove('positive', 'negative')
    }

    currentCountNode.innerText = currentCount
    
}

function update(action){
    interval = setInterval(() => {
        actionHandler(action)
    }, 100);
}

function windowResize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    context.redraw()
}

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', windowResize)
let currentCountNode = document.querySelector('#counter-value')
const actions = document.querySelectorAll('.controls button')

console.log(actions)
actions.forEach((action)=>{
    action.addEventListener('mousedown',()=>{update(action)})
    action.addEventListener('click', ()=>{actionHandler(action)})
    action.addEventListener('mouseup',()=>{clearInterval(interval)})
})

console.log(document.querySelectorAll('.nav-items'))