let board = document.getElementById('board')
let selectedPiece = ''
let selectedPieceIndex = -1
let activePiece = null
let nextPlayerWhite = true

let tileSize = 100
let blackColor = 'rgb(125,135,150)'
let whiteColor = 'rgb(232,232,232)'
let activeColor = 'rgb(0,0,0)'

let map = [
    'r', 'n', 'b', 'k', 'q', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'
]

const getMousePositionRelativeToBoard = (x, y) => {

    const boardClientRect = board.getBoundingClientRect()

    let relX = x - boardClientRect.x
    let relY = y - boardClientRect.y

    return {relX, relY}
}

const positionToTileIndexes = (x, y) => {

    x /= tileSize
    y /= tileSize

    x = Math.floor(x)
    y = Math.floor(y)

    return {x, y}
}

const getTileByIndex = (index) => {

    return Array.from(board.children)[index]
}

const getTileIndexByRowAndCol = (row, col) => {

    return row * 8 + col
}

const downTileLogic = (event) => {

    const relClickPosition = getMousePositionRelativeToBoard(event.clientX, event.clientY)
    const {x, y} = positionToTileIndexes(relClickPosition.relX, relClickPosition.relY)
    const tileIndex = getTileIndexByRowAndCol(y, x)
    const piece = map[tileIndex]

    if(isPieceWhite(piece) == nextPlayerWhite){

        getTileByIndex(tileIndex).innerHTML = ''
        selectedPiece = map[tileIndex]
        selectedPieceIndex = tileIndex

        activePiece = document.createElement("div")
        activePiece.style.width = `${tileSize}px`
        activePiece.style.height = `${tileSize}px`
        activePiece.style.lineHeight = `${tileSize}px`
        activePiece.className = 'noselect tile'
        activePiece.style.left = `${event.clientX - tileSize / 2}px`;
        activePiece.style.top = `${event.clientY - tileSize / 2}px`;
        activePiece.style.position = 'absolute';
        activePiece.innerHTML = getPieceUnicode(piece);
        activePiece.addEventListener('mouseup', upTileLogic)
        board.appendChild(activePiece)
    }
}

const upTileLogic = (event) => {

    if(selectedPiece == '')
        return;

    const relClickPosition = getMousePositionRelativeToBoard(event.clientX, event.clientY)
    const {x, y} = positionToTileIndexes(relClickPosition.relX, relClickPosition.relY)
    const tileIndex = getTileIndexByRowAndCol(y, x)
    const piece = map[tileIndex]

    if(isPieceWhite(piece) !== nextPlayerWhite || isTileEmpty(tileIndex)){ //isMoveValid(selectedPieceIndex, selectedPiece, tileIndex)

        map[tileIndex] = selectedPiece
        map[selectedPieceIndex] = ' ' 
        updateTile(tileIndex)
        
        nextPlayerWhite = !nextPlayerWhite
        map.reverse()
        console.log(map)
        setTimeout(drawPieces, 200)
    }
    else{

        updateTile(selectedPieceIndex)
    }

    selectedPiece = ''
    selectedPieceIndex = -1
    board.removeChild(activePiece)
    activePiece = null
}

const activePieceMoveLogic = (event) => {

    if(!activePiece)
        return

    const boardClientRect = board.getBoundingClientRect()

    const nextPosX = event.clientX - tileSize / 2
    const nextPosY = event.clientY - tileSize / 2

    if(nextPosX >= boardClientRect.x && nextPosX + tileSize <= boardClientRect.x + boardClientRect.width){

        activePiece.style.left = `${event.clientX - tileSize / 2}px`;
    }

    if(nextPosY >= boardClientRect.y && nextPosY + tileSize <= boardClientRect.y + boardClientRect.height){

        activePiece.style.top = `${event.clientY - tileSize / 2}px`;
    }
}

const isPieceWhite = (piece) => {

    const pieceCode = piece.charCodeAt(0)

    return pieceCode - 97 < 0
}

const isTileEmpty = (index) => {

    return map[index] === ' '
}

const isMoveValid = (pieceIndex, piece, toIndex) => {

    const pieceOnDest = map[toIndex]

    const basicCheck = isPieceWhite(pieceOnDest) != nextPlayerWhite || isTileEmpty(pieceIndex)

    if(!basicCheck)
        return false

    switch(piece){

        case 'P', 'p':

            if(pieceIndex >= 48){

                return pieceIndex - 16 == toIndex || pieceIndex - 8 == toIndex
            }

            break

        case 'r', 'R':
        
            for (let i=0; i < 64; i++){


            }

            break

        default:
            break
    }
}

const getValidMoves = (pieceIndex) => {

    const piece = map[pieceIndex]
    const moves = []

    switch(piece){

        case 'P', 'p':

            if(selectedPieceIndex >= 48){

                pieceIndex
            }

            break

        case 'r', 'R':
        
            for (let i=0; i < 64; i++){


            }

            break

        default:
            break
    }

    return moves
}

const showCorrectMoves = () => {


}

const getPieceUnicode = (piece) => {

    switch(piece){
    
        case 'R': return "&#9814"
        case 'N': return "&#9816"
        case 'B': return "&#9815"
        case 'K': return "&#9812"
        case 'Q': return "&#9813"
        case 'P': return "&#9817"
        case 'r': return "&#9820"
        case 'n': return "&#9822"
        case 'b': return "&#9821"
        case 'k': return "&#9818"
        case 'q': return "&#9819"
        case 'p': return "&#9823"
        default: return ' '
    }
}

const updateTile = (index) => {

    getTileByIndex(index).innerHTML = getPieceUnicode(map[index])
}

const loadBoard = () => {

    let nextColorBlack = false

    let col = 0

    for (let i=0; i < 8; i++){

        let row = 0

        for (let j=0; j < 8; j++){

            const tile = document.createElement("div")
            tile.style.width = `${tileSize}px`
            tile.style.height = `${tileSize}px`
            tile.style.lineHeight = `${tileSize}px`
            tile.className = 'noselect tile'
            tile.style.left = `${row}px`;
            tile.style.top = `${col}px`;

            if(nextColorBlack){
                tile.style.background = blackColor
            }
            else{
                tile.style.background = whiteColor
            }

            tile.addEventListener('mousedown', downTileLogic)
            tile.addEventListener('mouseup', upTileLogic)

            board.appendChild(tile)

            nextColorBlack = !nextColorBlack
            row += tileSize
        }

        nextColorBlack = !nextColorBlack
        col += tileSize
    }

    board.addEventListener('mousemove', activePieceMoveLogic)
}

const drawPieces = () => {

    let tiles = Array.from(board.children)

    tiles.forEach((tile, index) => {

        let pieceSign = map[index]
        let unicode = getPieceUnicode(pieceSign)
        tile.innerHTML = unicode;
    })
}

document.body.onload = loadBoard()
drawPieces()