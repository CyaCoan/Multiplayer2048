import { createEventHook } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { isArrayEqual, deepClone, rotateMatrix } from './array';
import { Direction, direction2rotation } from './2048';

let id = 0
const createId = () => id += 1

export type Status = 'normal' | 'frozen' | 'row' | 'col' | 'bomb' | 'heal'
type Tile = [number, number, Status] | null
type Board = Tile[][]

export function use2048Duel() {
    const onMoveHook = createEventHook<Direction>()
    const onWonHook = createEventHook<void>()

    const score = ref(0)
    const rows = ref(4)
    const cols = ref(4)
    const board = ref<Board>(Array.from({ length: rows.value }).map(() => Array.from({ length: cols.value }).map(() => null)))
    const hasWon = ref(false)
    const isGameOver = ref(false)

    watch(hasWon, () => {
        if (hasWon.value === true) {
            onWonHook.trigger()
        }
    })

    const checkIsGameOver = () => {

        return false
    }

    const setRandomTile = (board: Board, status: Status) => {
        const value = Math.random() < 0.9 ? 2 : 4
        const i = Math.floor(Math.random() * rows.value)
        const j = Math.floor(Math.random() * cols.value)

        if (board[i][j] !== null) {
            setRandomTile(board, status)
        } else {
            board[i][j] = [value, createId(), status]
        }

        if (checkIsGameOver()) {
            isGameOver.value = true
        }

        return board
    }

    const initialize = () => {
        score.value = 0
        isGameOver.value = false
        hasWon.value = false

        let brd: Board = Array.from({ length: rows.value }).map(() => Array.from({ length: cols.value }).map(() => null))
        brd = setRandomTile(brd, 'normal')
        brd = setRandomTile(brd, 'normal')

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
                } else {
                    brd[pos][j] = temp[k]
                }
                pos++
            }
        }

        brd = rotateMatrix(brd, 4 - rotation_times)

        if (!isArrayEqual(brd, board.value)) {
            brd = setRandomTile(brd, 'normal')
        }

        board.value = brd

        onMoveHook.trigger(direction)
    }

    const up = () => move('up')
    const down = () => move('down')
    const left = () => move('left')
    const right = () => move('right')

    const biggestTile = computed(() => {
        let max_num = 0
        let tile_i = 0
        let tile_j = 0
        const row_num = board.value.length
        const col_num = board.value[0].length

        for (let i = 0; i < row_num; i++) {
            for (let j = 0; j < col_num; j++) {
                if (board.value[i][j] !== null) {
                    if (board.value[i][j]![0] > max_num) {
                        max_num = board.value[i][j]![0]
                        tile_i = i
                        tile_j = j
                    }
                }
            }
        }

        return [max_num, tile_i, tile_j]
    })

    return {
        board,
        score,
        isGameOver,
        hasWon,
        biggestTile,
        initialize,
        move,
        up,
        down,
        left,
        right,
        onWon: onWonHook.on,
        onMove: onMoveHook.on,
    }
}