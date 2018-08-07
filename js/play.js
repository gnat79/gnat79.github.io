// New tiles are either 2 or 4, with this probability of being 2
let probabilityOfRolling2 = .9;

// The initial game board [row][col]
let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

let score = 0;

// Tile properties
let lightColor = "#E5E1D3";
let darkColor = "#000000";
let tileProperties = {
    2: {"bgColor": "#CAD2C5", "fgColor": darkColor, "fontSize": "48px"},
    4: {"bgColor": "#84A98C", "fgColor": darkColor, "fontSize": "48px"},
    8: {"bgColor": "#52796F", "fgColor": lightColor, "fontSize": "48px"},
    16: {"bgColor": "#354F52", "fgColor": lightColor, "fontSize": "48px"},
    32: {"bgColor": "#2F3E46", "fgColor": lightColor, "fontSize": "48px"},
    64: {"bgColor": "#5171A5", "fgColor": lightColor, "fontSize": "48px"},
    128: {"bgColor": "#36558F", "fgColor": lightColor, "fontSize": "40px"},
    256: {"bgColor": "#4C2C69", "fgColor": lightColor, "fontSize": "40px"},
    512: {"bgColor": "#42253B", "fgColor": lightColor, "fontSize": "40px"},
    1024: {"bgColor": "#832232", "fgColor": lightColor, "fontSize": "32px"},
    2048: {"bgColor": "#963D5A", "fgColor": lightColor, "fontSize": "32px"},
    4096: {"bgColor": "#000000", "fgColor": lightColor, "fontSize": "32px"},
    8192: {"bgColor": "#fff900", "fgColor": darkColor, "fontSize": "32px"},
    16384: {"bgColor": "#006f34", "fgColor": lightColor, "fontSize": "28px"},
};

let Board = {
    'rows': [],
    'cols': [],
};

function Row(rowNumber) {
    Board['rows'][rowNumber] = this;
}


// handle click and add class
button.on("click", function(){
    $('div.tile').animate({
        'marginLeft': '-=100px'
    });
});


function slideTileAnimate($tile, direction) {
    switch(direction) {
        case "down": {
            $tile.animate({
               'marginTop': '+=100px'
            });
        }
        break;
        case "up": {
            $tile.animate({
                'marginTop': '-=100px'
            });
        }
        break;
        case "left": {
            $tile.animate({
                'marginLeft': '-=100px'
            });
        }
        break;
        case "right": {
            $tile.animate({
                'marginLeft': '+=100px'
            });
        }
    }
}


// This function handles key presses and mouse clicks.
$().ready(function () {

    // Start the game with two random tiles.
    startGame();

    // Add a tile where clicked, or else double the value of the clicked tile.
    $("#game_board").on('mousedown', 'div.tile', function () {
        if ($(this).hasClass("active")) {
            let [row, col] = getTilePosition($(this));
            board[row][col] *= 2;
            updateTile($(this));
        } else {
            let [row, col] = getTilePosition($(this));
            addTile(row, col, 2);
        }
        return false;
    });

    // Restart the game.
    $("#restart").mousedown(function (e) {
        e.preventDefault();
        resetBoard();
        score = 0;
        updateScoreDisplay();
        startGame();
        return false;
    });

    // Handle arrow keys
    $(document).keydown(function (event) {
        let key = event.which;
        let key_codes = {37: "left", 38: "up", 39: "right", 40: "down"};

        if (key_codes[key] !== undefined) {
            if (slideTiles(key_codes[key])) {
                addRandomTile();
            } else if (gameOver()) endGame();
            event.preventDefault();
        }
    });
    return false;
});


function newSlide(direction) {
    let movedTiles = false;
    switch (direction) {
        case "down": {
            for (let col = 0; col < 4; col++) {
                slideColumn(getColumn(col));
            }
        }
        break;
        case "up": {
            ;
        }
        break;
        case "left": {
            ;
        }
        break;
        case "right": {
            ;
        }
    }
    return movedTiles;
}


function slideTiles(direction) {
    let movedTiles = false;
    switch (direction) {
        case "down": {
            for (let row = 1; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        }
            break;
        case "up": {
            for (let row = 2; row >= 0; row--) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        }
            break;
        case "left": {
            for (let col = 1; col < 4; col++) {
                for (let row = 0; row < 4; row++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        }
            break;
        case "right": {
            for (let col = 2; col >= 0; col--) {
                for (let row = 0; row < 4; row++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        }
    }
    return movedTiles;
}

function updateTile($tile) {
    let [row, col] = getTilePosition($tile);
    let value = board[row][col];
    if (value < 16385) {
        $tile.text(value);
        $tile.css("background-color", tileProperties[value]['bgColor']);
        $tile.css("color", tileProperties[value]['fgColor']);
        $tile.css("font-size", tileProperties[value]['fontSize']);
    }
}

function addTile(row, col, value) {
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass("row" + row + " col" + col);
    $newTile.toggleClass("active holder");
    board[row][col] = value;
    $newTile.text(board[row][col]);
    $newTile.css("background-color", tileProperties[value]['bgColor']);
    $newTile.css("color", tileProperties[value]['fgColor']);
    $newTile.css("font-size", tileProperties[value]['fontSize']);
    $("#game_board").append($newTile);
}

function getTilePosition($tile) {
    let thisTileClasses = $tile.attr("class");
    let row = (thisTileClasses.match(/row(\d)/))[1];
    let col = (thisTileClasses.match(/col(\d)/))[1];
    return [parseInt(row), parseInt(col)];
}

function getTileAtPosition(row, col) {
    let selector = "div.active.row" + row + ".col" + col;
    return $($(selector)[0]);
}

function removeTileAtPosition(row, col) {
    let $tile = getTileAtPosition(row, col);
    $tile.remove();
}

function updateScoreDisplay() {
    let scoreDiv = $("#score")[0];
    scoreDiv.innerHTML = "Score: " + score;
    setBestScore(score);
    $("#best")[0].innerHTML = "Best: " + Cookies.get('highScore');
}

function slideTile($tile, direction) {
    let movedTile = false;
    let [row, col] = getTilePosition($tile);
    let thisTileValue = board[row][col];
    switch (direction) {
        case "right": {
            let distanceToEdge = 3 - col;
            if (distanceToEdge > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToEdge; shift++) {
                    let foundTileValue = board[row][col + shift];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row, col + distanceToMove);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "left": {
            let distanceToEdge = col;
            if (distanceToEdge > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToEdge; shift++) {
                    let foundTileValue = board[row][col - shift];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row, col - distanceToMove);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "up": {
            let distanceToTop = 3 - row;
            if (distanceToTop > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToTop; shift++) {
                    let foundTileValue = board[row + shift][col];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row + distanceToMove, col);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "down": {
            let distanceToBottom = row;
            if (distanceToBottom > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToBottom; shift++) {
                    let foundTileValue = board[row - shift][col];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row - distanceToMove, col);
                    movedTile = true;
                }
            }
            return movedTile;
        }
    }
}

// Move a tile to the specified cell.
function moveTileToPosition($tile, currentRow, currentCol, newRow, newCol) {
    let playerWon = false;
    if (currentCol !== newCol || currentRow !== newRow) {
        let currentVal = board[currentRow][currentCol];
        let newVal = board[newRow][newCol];
        if (currentVal === newVal) {
            let doubleVal = currentVal * 2;
            if (doubleVal === 2048) playerWon = true;
            board[newRow][newCol] = doubleVal;
            score += doubleVal;
            removeTileAtPosition(newRow, newCol);
            updateScoreDisplay();
            updateTile($tile);
        } else {
            board[newRow][newCol] = currentVal;
        }
        board[currentRow][currentCol] = 0;
        $tile.removeClass("row" + currentRow + " col" + currentCol);
        $tile.addClass("row" + newRow + " col" + newCol);
        updateTile($tile);
    }
    if (playerWon) alert("You won! Keep playing?");
}

// Add a single tile (randomly) to one of the empty cells. Value of new tile is either 2 or 4 with probability of
// being 2 set by the constant probabilityOfRolling2
function addRandomTile() {
    let row;
    let col;
    let emptyCell = false;
    while (!emptyCell) {
        row = getRandomInt(0, 4);
        col = getRandomInt(0, 4);
        emptyCell = (board[row][col] === 0);
    }
    let value = 2;
    let prob = Math.random();
    if (prob > probabilityOfRolling2) value = 4;
    addTile(row, col, value);
}

// The maximum is exclusive and the minimum is inclusive. Stolen (and then edited) from somewhere on the internets.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Play continues as long as there are no empty cells and no two adjacent cells are equal.
function gameOver() {
    // Check for equal tiles in any column or row
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0
                || board[j][i] === 0
                || board[i][j] === board[i][j + 1]
                || board[j][i] === board[j + 1][i]
            ) return false;
        }
        if (board[i][3] === 0 || board[3][i] === 0) return false;
    }
    return true;
}

// Eventually: add an opaque cover to the board with a "Play Again?" button.
function endGame() {
    alert("Game is over");
}

// Set "best" score as a cookie
function setBestScore(score) {
    let currentBest = Cookies.get('highScore');
    if (currentBest === undefined) {
        Cookies.set('highScore', score);
    }
    else if (currentBest < score) {
        Cookies.set('highScore', score);
    }
}

// Adds random tiles to board.
function startGame() {
    updateScoreDisplay();
    addRandomTile();
    addRandomTile();
}

// Get and put for a row in the board.
function getRow(rowNumber) {
    return board[rowNumber];
}

function putRow(rowNumber, array) {
    board[rowNumber] = array;
}

// Get and put for a column in the board.
function getColumn(colNumber) {
    let column = [];
    for (let i = 0; i < 4; i++) {
        column[i] = board[i][colNumber];
    }
    return column;
}

function putColumn(colNumber, array) {
    for (let i = 0; i < 4; i++) {
        board[i][colNumber] = array[i];
    }
}

// Remove all tiles from the board.
function resetBoard() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            removeTileAtPosition(row, col);
            board[row][col] = 0;
        }
    }
}