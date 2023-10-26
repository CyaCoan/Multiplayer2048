import { Board } from './2048duel'

export const triggerRow = (i: number, j: number, board: Board) => {
    const col_num = board[0].length

    for (let k = 0; k < col_num; k++) {
        if (k !== j && board[i][k] !== null) {
            if (board[i][k]![2] !== 'frozen') {
                board[i][k] = null
            } else {
                board[i][k]![2] = 'normal'
            }
        }
    }

    return board
}

export const triggerColumn = (i: number, j: number, board: Board) => {
    const row_num = board.length

    for (let k = 0; k < row_num; k++) {
        if (k !== i && board[k][j] !== null) {
            if (board[k][j]![2] !== 'frozen') {
                board[k][j] = null
            } else {
                board[k][j]![2] = 'normal'
            }
        }
    }

    return board
}

export const triggerBomb = (i: number, j: number, board: Board) => {
    const row_num = board.length
    const col_num = board[0].length

    for (let k = 0; k < row_num; k++) {
        for (let l = 0; l < col_num; l++) {
            let dist_x = Math.abs(i - k)
            let dist_y =  + Math.abs(j - l)

            if (dist_x <= 1 && dist_y <= 1 && !(dist_x === 0 && dist_y === 0) && board[k][l] !== null) {
                if (board[k][l]![2] !== 'frozen') {
                    board[k][l] = null
                } else {
                    board[k][l]![2] = 'normal'
                }
            }
        }
    }

    return board
}

export const triggerHeal = (i: number, j: number, board: Board, hp: number) => {
    hp += board[i][j]![0]

    return hp
}