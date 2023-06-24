const kala = document.querySelectorAll('.square');
const X_class = "x";
const o_class = "circle";
const win = document.querySelector('.kalabala');

let circleturn;
const winning_combnation = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const reset = document.querySelector('.reset');
reset.addEventListener('click', resett);
   
function resett(){
    kala.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(o_class);
    })
    win.innerText = '';
    start();
}
const starting = document.querySelector('.startgame');
starting.addEventListener('click', ()=>{start()});

function start(){
    circleturn = true;
    kala.forEach(cell => {
    cell.addEventListener('click', handleclick, {once: true});
})
}

function handleclick(e) {
    const cell = e.target;
    const currentclass = circleturn ? o_class : X_class;
    placemark(currentclass, cell);
    if(checkwin(currentclass)){
        endgame(false);
    }
    else if(isdraw()){
         endgame(true);
    }
    swapTurn();
}

function isdraw(){
    return [...kala].every(classe => {
    return classe.classList.contains(X_class) || classe.classList.contains(o_class)
    })
}

function endgame(draw){
    if(draw){
        win.innerText = "draw";
    }else{
        win.innerText = `${circleturn ? "O's" : "X's" } win's`;
        // resett();
    }
}

function placemark(currentclass, cell) {
    cell.classList.add(currentclass);
}

function swapTurn() {
    circleturn = !circleturn;
}

function checkwin(currentclass){
    return winning_combnation.some(combination => {
        return combination.every(index => {
            return kala[index].classList.contains(currentclass);
        })
    })
}