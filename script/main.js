let wrap = document.querySelector(".wrap")
let bg = document.querySelector(".background")

let setings = {
    'xPath':"./img/X.png",
    'oPath':"./img/O.png",
    "countSquares": 9,
    "flag":false,
    "winComb": [[1,2,3],[1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]],
    "store":[],
    "winX":[],
    "winO":[],
    "once":true
}

const createElement = (tag,classElem,append)=>{
    let element = document.createElement(tag)
    element.classList.add(classElem)
    append.append(element)
}

const startGame = () =>{
    for(let i=0; i < setings.countSquares; i++){
        createElement('div','square',wrap)

    }
    createElement('span','turn-text',bg)
    createElement('span','win-text',bg)
    createElement('button','restart-button',bg)


}

startGame()

const winner = () =>{
    let winText = document.querySelector('.win-text')
    let x = setings.winX
    let o = setings.winO
    if(setings.countSquares === 0){
        winText.innerHTML = "Its tie!!"
        return
    }
    for(let i=0; setings.winComb.length; i++){
        let win  = setings.winComb[i]

        if(x.includes(win[0])&& x.includes(win[1])&& x.includes(win[2])){
            winText.innerHTML = 'Win X'
        }else if (o.includes(win[0])&& o.includes(win[1])&& o.includes(win[2])){
            winText.innerHTML = 'Win O'
        }
    }
}

const playerTurn = (player,flagP,img)=>{
    img.setAttribute('src',player)
    setings.flag = flagP
}

let square = document.querySelectorAll('.square')


square.forEach((elem,index) =>  {
    elem.addEventListener('click', (e)=>{
        let check = elem.classList.contains('square')
        let img = document.createElement('img')

        if(check){
            setings.store[index] = setings.flag
            if(!setings.flag){
                playerTurn(setings.xPath,true,img)
                setings.winX.push(index + 1)
            }else{
                playerTurn(setings.oPath,false,img)
                setings.winO.push(index + 1)
            }
            elem.append(img)
            setings.countSquares -= 1 
            winner()
        }
    },{"once":setings.once})
})


let restart = document.querySelector('.restart-button')

restart.innerHTML = "Restart"

restart.addEventListener('click',()=>{
    window.location.reload()
})
