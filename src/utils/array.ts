import { assert } from "@vueuse/core"

export function isArrayEqual(array1: any[], array2: any[]) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return array1 === array2
    }
  
    if (array1.length !== array2.length) {
        return false
    }
  
    for (let i = 0, len = array1.length; i < len; i++) {
        if (!isArrayEqual(array1[i], array2[i])) {
            return false
        }
    }
  
    return true
}

export function deepClone(array: any[]) {
    const len = array.length
    const new_array = new Array(len)

    for (let i = 0; i < len; i++) {
        if (Array.isArray(array[i])) {
            new_array[i] = deepClone(array[i])
        } else {
            new_array[i] = array[i]
        }
    }

    return new_array
}

export function rotateMatrix(matrix: any[][], times: number) {
    const rotateOnce = () => {
        const row_num = matrix.length
        const col_num = matrix[0].length
        let new_matrix: any[][] = []
        for (let i = 0; i < col_num; i++) {
            new_matrix[i] = []
            for (let j = 0; j < row_num; j++) {
                new_matrix[i][j] = matrix[row_num - j - 1][i]
            }
        }
        matrix = new_matrix
    }

    for (let i = 0; i < times; i++) {
        rotateOnce()
    }

    return matrix
}

export function rotateCoordinate(pos: number[], size: number, times: number) {
    assert(pos.length === 2)

    const rotateOnce = () => {
        let x = pos[1]
        let y = size - pos[0] - 1
        pos = [x, y]
    }

    for (let i = 0; i < times; i++) {
        rotateOnce()
    }

    return pos
}