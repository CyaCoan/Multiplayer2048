// import { createEventHook } from '@vueuse/core';
import { ref, computed } from 'vue';
import { isArrayEqual, deepClone, rotateMatrix } from './array';

let id = 0
const createId = () => id += 1
const WINNING_TILE_NUMBER = 2048
const TILE_NUMBER_LIMIT = 65536

type Tile = [number, number] | null
type Board = Tile[][]
export type Direction = 'up' | 'down' | 'left' | 'right'

export const direction2rotation = (direction: Direction) => {
    switch (direction) {
        case "up":
            return 0
        case "down":
            return 2
        case "left":
            return 1
        case "right":
            return 3
    }
}

export function use2048() {
    // const onMoveHook = createEventHook<Direction>()
    // const onWonHook = createEventHook<void>()

    const score = ref(0)
    const highScore = ref(0)
    const rows = ref(4)
    const cols = ref(4)
    const board = ref<Board>(Array.from({ length: rows.value }).map(() => Array.from({ length: cols.value }).map(() => null)))
    const hasWon = ref(false)
    const firstWon = ref(true)
    const isGameOver = ref(false)
    const reachedLimit = ref(false)

    // watch(hasWon, () => {
    //     if (hasWon.value === true) {
    //         onWonHook.trigger()
    //     }
    // })

    const checkIsGameOver = (board: Board) => {
        const row_num = board.length
        const col_num = board[0].length

        for (let i = 0; i < row_num; i++) {
            for (let j = 0; j < col_num; j++) {
                if (board[i][j] === null) {
                    return false
                }
                if (i < row_num - 1 && board[i][j] && board[i + 1][j] && board[i][j]![0] === board[i + 1][j]![0]) {
                    return false
                }
                if (j < col_num - 1 && board[i][j] && board[i][j + 1] && board[i][j]![0] === board[i][j + 1]![0]) {
                    return false
                }
            }
        }

        return true
    }

    const setRandomTile = (board: Board) => {
        const value = Math.random() < 0.9 ? 2 : 4
        const i = Math.floor(Math.random() * rows.value)
        const j = Math.floor(Math.random() * cols.value)

        if (board[i][j] !== null) {
            setRandomTile(board)
        } else {
            board[i][j] = [value, createId()]
        }

        if (checkIsGameOver(board)) {
            isGameOver.value = true
        }

        return board
    }

    const initialize = () => {
        score.value = 0
        isGameOver.value = false
        hasWon.value = false
        firstWon.value = true

        let brd: Board = Array.from({ length: rows.value }).map(() => Array.from({ length: cols.value }).map(() => null))
        brd = setRandomTile(brd)
        brd = setRandomTile(brd)

        board.value = brd
    }

    const move = (direction: Direction) => {
        let brd = deepClone(board.value)
        const rotation_times = direction2rotation(direction)

        brd = rotateMatrix(brd, rotation_times)
        const row_num = brd.length
        const col_num = brd[0].length

        for (let j = 0; j < col_num; j++) {
            const temp: Tile[] = []

            for (let i = 0; i < row_num; i++) {
                if (brd[i][j] !== null) {
                    temp.push(brd[i][j])
                    brd[i][j] = null
                }
            }

            let pos = 0
            const n = temp.length
            for (let k = 0; k < n; k++) {
                if (k < n - 1 && temp[k]![0] === temp[k + 1]![0]) {
                    const new_value = temp[k]![0] * 2
                    const new_id = temp[k + 1]![1]
                    brd[pos][j] = [new_value, new_id]
                    k++

                    score.value += new_value
                    highScore.value = score.value > highScore.value ? score.value : highScore.value

                    if (new_value === WINNING_TILE_NUMBER && !hasWon.value) {
                        hasWon.value = true
                    }

                    if (new_value === TILE_NUMBER_LIMIT && !reachedLimit.value) {
                        reachedLimit.value = true
                    }
                } else {
                    brd[pos][j] = temp[k]
                }
                pos++
            }
        }

        brd = rotateMatrix(brd, 4 - rotation_times)

        if (!isArrayEqual(brd, board.value)) {
            brd = setRandomTile(brd)
        }

        board.value = brd

        // onMoveHook.trigger(direction)
    }

    const up = () => move('up')
    const down = () => move('down')
    const left = () => move('left')
    const right = () => move('right')

    const biggestTileNumber = computed(() => {
        let max_num = 0
        const row_num = board.value.length
        const col_num = board.value[0].length

        for (let i = 0; i < row_num; i++) {
            for (let j = 0; j < col_num; j++) {
                if (board.value[i][j] !== null) {
                    max_num = board.value[i][j]![0] > max_num ? board.value[i][j]![0] : max_num
                }
            }
        }

        return max_num
    })

    const test = () => {
        board.value = [
            [[2, 1], [4, 2], [8, 3], [16, 4]],
            [[32, 5], [64, 6], [128, 7], [256, 8]],
            [[512, 9], [1024, 10], [2048, 11], [4096, 12]],
            [[8192, 13], [16384, 14], [32768, 15], [65536, 16]]
        ]
    }

    return {
        board,
        score,
        highScore,
        isGameOver,
        hasWon,
        firstWon,
        reachedLimit,
        biggestTileNumber,
        initialize,
        test,
        move,
        up,
        down,
        left,
        right,
        // onWon: onWonHook.on,
        // onMove: onMoveHook.on,
    }
}