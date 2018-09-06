let gameBoard = []

//////////////////  GameBoard evaluates to an empty array. The function below declares that array as a series of additional arrays meant to simulate our game board. The function createBoard (which is defined in the following section) is called to build the grid. Further, the variable startGame is called from the reset button as written in the HTML file. This allows us to recreate the board each time the button is clicked. //////////////////


let startGame = () => {
    console.log('====> HEY WE\'VE HIT RESTART GAME!');
    gameBoard = [
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}]
    ]

    gameInPlay = true

    createBoard()
}


/////////////  The createBoard function declares a variable evaluating to the </svg> tag from our HTML. As mentioned there, </svg> is an HTML tag used to create simple graphics on our webpage. Continuing, the gameSlot variable is declared as an empty string, taking us into for loops which iterate through the series of empty arrays as shown above. Finally, we define the fully iterated grid as either displaying the color blue (an empty slot) or the color of a clicked disc.  ///////////////////////


const createBoard = () => {
    const svg = document.getElementById("svg")
    let gameSlot = ''
    for (let i = 0; i < gameBoard.length; i++) {
        let row = gameBoard[i]
        for (let j = 0; j < row.length; j++) {
            const disc = gameBoard[i][j]
            const color = disc && disc.color || 'lightblue'
            gameSlot = gameSlot + `<circle onclick="clickDisc(${j}, ${i})" fill='${color}' r='35px' cx='${j * 90 + 70}px' cy='${i * 90 + 70}px'></circle>`
        }
    }
    svg.innerHTML = gameSlot
} 


//////////////////  

let colorInPlay = 'red'
window.clickDisc = (x,y) => {
    if (!gameInPlay) {
        return
    }
    for (let i = gameBoard.length - 1; i >= 0; i--) {
        let row = gameBoard[i]
        let targetPlace = row[x]
            if (!targetPlace.color) {
                row[x] = {color: colorInPlay}
                if (colorInPlay === 'red') {
                    colorInPlay = 'yellow'
                } else {
                    colorInPlay = 'red'
                }
                createBoard()
                winningMoves()
                return
            }
        
    }
}




function winningMoves() {
    for (let i = 0; i < gameBoard.length; i++) {
        let row = gameBoard[i]
        for (let j = 0; j < row.length; j++) {
            let disc = gameBoard[i][j]
            if (disc && disc.color) {

/////// vertical win scenario //////////
                
                if (i === 0 || i === 1) {
                    if (gameBoard[i + 1][j].color === disc.color &&
                        gameBoard[i + 2][j].color === disc.color &&
                        gameBoard[i + 3][j].color === disc.color) {
                            aColorWins(disc.color) 
                            return
                    }
                }

////// horizontal win scenario /////////

                if (j === 0 || j === 1 || j === 2 || j === 3) {
                    if (gameBoard[i][j + 1].color === disc.color &&
                        gameBoard[i][j + 2].color === disc.color &&
                        gameBoard[i][j + 3].color === disc.color) {
                            aColorWins(disc.color) 
                            return
                    } 
                }

/////// backward diagonal win scenario //////////                 

                if (i === 0 || i === 1) {
                    if (j === 0 || j === 1 || j === 2 || j === 3 ) {
                        if (gameBoard[i + 1][j + 1].color === disc.color &&
                           gameBoard[i + 1][j + 1].color === disc.color &&
                           gameBoard[i + 1][j + 1].color === disc.color) {
                            aColorWins(disc.color) 
                            return
                    } 
                }

/////// forward diagonal win scenario ////////////                

                    if (j === 3 || j === 4 || j === 5 || j === 6 ) {
                        if (gameBoard[i + 1][j - 1].color === disc.color &&
                           gameBoard[i + 1][j - 1].color === disc.color &&
                           gameBoard[i + 1][j - 1].color === disc.color) {
    
                            aColorWins(disc.color) 
                            return 
                    }
                }             
             }  
          }
       }
    }

    function aColorWins(color) {
        gameInPlay = false
        swal({
            title: "Victory!",
            text: "You win this round!",
            icon: "success",
            button: "Obv"
        })
    }
}

swal({
    title: "Can your friendship survive ... Connect Four?!",
    button: "Yep!"
})
.then((value) => {
  swal({
    title: "Then game on, idealistic fools!",
    button: "Bring It!"
})
})

startGame()


