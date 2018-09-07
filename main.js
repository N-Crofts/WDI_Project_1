let gameBoard = []
let gameInPlay = true
let playerOne = 'rgba(240, 128, 128, 0.7)'
let playerTwo = 'rgba(255, 246, 143, 0.7)'


// GameBoard evaluates to an empty array. The function below declares that 
// array as a series of additional arrays meant to simulate our game board. 
// The function createBoard (which is defined in the following section) is 
// called to build the grid. Further, the variable startGame is also called 
// from the reset button as written in the HTML file. This allows us to re-
// create the board each time the button is clicked.   ////////////////////


let startGame = () => {
    console.log('====> HEY WE\'VE HIT RESTART GAME!');
    gameBoard = [
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}]
    ]

    createBoard()
}


// The createBoard function declares a variable evaluating to the </svg> 
// tag from our HTML. As mentioned there, </svg> is an HTML tag used to 
// create simple graphics on our webpage. Continuing, the gameSlot variable 
// is declared as an empty string, taking us into for loops which iterate 
// through the series of empty arrays as shown above. Finally, we define 
// the fully iterated grid as either displaying an empty slot or the color 
// of a clicked disc. The final step in the createBoard function is assigning 
// gameSlot to the dimensions and color of our HTML graphic. The </circle> 
// tag with its click listener is specific to svg styling. The color, radius, 
// dimensions, and spacing are evaluated before being inserted directly into 
// the HTML.    /////////////////////////////////////////////////////////


const createBoard = () => {
    const twoDGraphic = document.getElementById('svg')
    let gameSlot = ''
    for (let i = 0; i < gameBoard.length; i++) {
        let row = gameBoard[i]
        for (let j = 0; j < row.length; j++) {
            const disc = gameBoard[i][j]
            const color = disc && disc.color || 'rgba(245, 245, 245, 0.5)'
            gameSlot = gameSlot + `<circle onclick="clickDisc(${j}, ${i})" fill='${color}' r='35px' cx='${j * 90 + 70}px' cy='${i * 90 + 70}px'></circle>`
        }
    }
    twoDGraphic.innerHTML = gameSlot
} 


// The clickDisc function allows our color discs to stack as well as 
// alternating between Player One and Player Two after each click. The 
// for loop measures the length of the current gameBoard and subtracts 
// 1 through each iteration; this creates the stacking effect. Further, 
// the function calls createBoard and our winningMoves function which 
// will be declared in the next section.   //////////////////////////


let moveSwitch = playerOne
let clickDisc = (x) => {
    if (gameInPlay = false) {
        return false
    }
    for (let i = gameBoard.length - 1; i >= 0; i--) {
        let row = gameBoard[i]
        let targetPlace = row[x]
            if (!targetPlace.color) {
                row[x] = {color: moveSwitch}
                if (moveSwitch === playerOne) {
                    moveSwitch = playerTwo
                } else {
                    moveSwitch = playerOne
                }
                createBoard()
                winningMoves()
                return true
            }
        
    }
}


// The next section determines the specific conditionals required to win a 
// round. In traditional Connect Four, the goal, of course, is to connect 
// four colors in a straight line, in any direction, be it vertical, hori-
// zontal, or diagonal. The function winningMoves loops through the current 
// gameBoard compares the disc color to specific positions along the x and 
// y axes (represented by iterations i and j). To do this, the iterations add 
// 1 - 3 (looking for 4 matches). If the result is truthy to the disc in play, 
// the function calls the playerWins function described below.  /////////////


function winningMoves() {
    for (let i = 0; i < gameBoard.length; i++) {
        let row = gameBoard[i]
        for (let j = 0; j < row.length; j++) {
            disc = gameBoard[i][j]
            if (disc && disc.color) {

////////////////  V E R T I C A L   W I N   S C E N A R I O  ////////////////////
                
                if (i === 0 || i === 1) {
                    if (gameBoard[i + 1][j].color === disc.color &&
                        gameBoard[i + 2][j].color === disc.color &&
                        gameBoard[i + 3][j].color === disc.color) {
                            return playerWins(disc.color) 
                    }
                }

//////////////  H O R I Z O N T A L   W I N   S C E N A R I O  //////////////////

                if (j === 0 || j === 1 || j === 2 || j === 3) {
                    if (gameBoard[i][j + 1].color === disc.color &&
                        gameBoard[i][j + 2].color === disc.color &&
                        gameBoard[i][j + 3].color === disc.color) {
                            return playerWins(disc.color) 
                    } 
                }

///////  B A C K W A R D   D I A G O N A L   W I N   S C E N A R I O  //////////                 

                if (i === 0 || i === 1) {
                    if (j === 0 || j === 1 || j === 2 || j === 3 ) {
                        if (gameBoard[i + 1][j + 1].color === disc.color &&
                            gameBoard[i + 1][j + 1].color === disc.color &&
                            gameBoard[i + 1][j + 1].color === disc.color) {
                                return playerWins(disc.color) 
                    } 
                }

///////  F O R W A R D   D I A G O N A L   W I N   S C E N A R I O  ////////////                

                    if (j === 3 || j === 4 || j === 5 || j === 6 ) {
                        if (gameBoard[i + 1][j - 1].color === disc.color &&
                            gameBoard[i + 1][j - 1].color === disc.color &&
                            gameBoard[i + 1][j - 1].color === disc.color) {
                                return playerWins(disc.color) 
                    }
                }             
             }  
          }
       }
    }


// The playerWins function effectively ends the game once four identical colors are 
// matched. Once the gameInPlay has declared false, the function compares the winning 
// color to either playerOne or playerTwo before running a specific alert. The object 
// swal refers to the -sweet alert- library linked into our HTML. The function ends 
// with calling the startGame function which will reset the board.  ///////////////


    function playerWins(color) {
        gameInPlay = false

        if (color === playerOne) {
            swal({
                title: "WINNER!",
                text: "Player One wins this round!",
                icon: "success",
                button: "cool thx"
            })
            return startGame()
        } else {
            swal({
                title: "BOOM!",
                text: "Player Two wins this round!",
                icon: "success",
                button: "cool thx"
            })
            return startGame()
        }  
    }
}


// Finally, we have our introduction alerts that runs when the page loads. The 
// function refers to the -sweet alert- library described in the last section.

swal({
    title: "Can your friendship survive ... Connect Four?!",
    button: "Yup!"
})
.then(() => {
  swal({
    title: "Then game on, idealistic fools!",
    button: "Bring It!"
})
})

startGame()



