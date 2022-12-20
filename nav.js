function insertHTML(srcHTML, placeHolder, className=''){
fetch(srcHTML)
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector(`#${placeHolder}`);
        let newelem = document.createElement("div");
        if(className.length > 0) newelem.classList.add(className)
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem,oldelem);
        // oldelem.insertAdjacentHTML("beforebegin", newelem)
    })
    .catch(()=>{})
}

console.log("Loading nav-bar.html")
insertHTML('./nav-bar.html', 'nav-bar-html', 'nav-bar')

