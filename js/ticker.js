const ticker = document.getElementById("ticker-track");

const symbols = ["TMX","BULL","BEAR","LOGIC","RISK","ALPHA","BETA","DELTA","NOVA"];

function generateStock(){

const symbol = symbols[Math.floor(Math.random()*symbols.length)];
const change = (Math.random()*4 - 2).toFixed(1);

const span = document.createElement("span");
span.classList.add("stock");

if(change >= 0){
span.classList.add("up");
span.textContent = `${symbol} +${change}%`;
}else{
span.classList.add("down");
span.textContent = `${symbol} ${change}%`;
}

ticker.appendChild(span);
}

let position = 0;
const speed = 0.2;

function animateTicker(){

position -= speed;

ticker.style.transform = `translateX(${position}px)`;

const first = ticker.firstElementChild;

if(first && first.getBoundingClientRect().right < 0){

position += first.offsetWidth + 50; 
ticker.removeChild(first);

generateStock();

}

requestAnimationFrame(animateTicker);
}

for(let i=0;i<15;i++){
generateStock();
}

animateTicker();