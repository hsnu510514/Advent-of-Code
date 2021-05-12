const countSeat = (row) => {
    let count = 0

    for (const char of row) {
        if (char === '#') count++
    }

    return count
}

const updateSeatArr = (seatArr, tolerance, strict = false) => {
    let change = false

    const newSeatArr = []

    const getAdjacent = (rowIdx, columnIdx) => {
        let count = 0
        const longSide = Math.max(seatArr.length, seatArr[0].length)

        if (strict) {
            for (let row = -1; row < 2; row++) {
                for (let column = -1; column < 2; column++) {
                    if (row === 0 && column === 0) continue
                    if (rowIdx + row < 0 || rowIdx + row >= seatArr.length)
                        continue
                    if (
                        columnIdx + column < 0 ||
                        columnIdx + column >= seatArr[0].length
                    )
                        continue
                    if (seatArr[rowIdx + row][columnIdx + column] === '#')
                        count++
                }
            }
        } else {
            // Top
            for (let distance = 1; distance < rowIdx + 1; distance++) {
                if (seatArr[rowIdx - distance][columnIdx] === 'L') {
                    break
                } else if (seatArr[rowIdx - distance][columnIdx] === '#') {
                    count++
                    break
                }
            }
            // Down
            for (
                let distance = 1;
                rowIdx + distance < seatArr.length;
                distance++
            ) {
                if (seatArr[rowIdx + distance][columnIdx] === 'L') {
                    break
                } else if (seatArr[rowIdx + distance][columnIdx] === '#') {
                    count++
                    break
                }
            }
            // Left
            for (let distance = 1; distance < columnIdx + 1; distance++) {
                if (seatArr[rowIdx][columnIdx - distance] === 'L') {
                    break
                } else if (seatArr[rowIdx][columnIdx - distance] === '#') {
                    count++
                    break
                }
            }
            // Right
            for (
                let distance = 1;
                columnIdx + distance < seatArr[0].length;
                distance++
            ) {
                if (seatArr[rowIdx][columnIdx + distance] === 'L') {
                    break
                } else if (seatArr[rowIdx][columnIdx + distance] === '#') {
                    count++
                    break
                }
            }
            // Top-Right
            for (let distance = 1; distance < longSide; distance++) {
                if (
                    rowIdx - distance < 0 ||
                    columnIdx + distance >= seatArr[0].length
                )
                    break
                if (seatArr[rowIdx - distance][columnIdx + distance] === 'L') {
                    break
                } else if (
                    seatArr[rowIdx - distance][columnIdx + distance] === '#'
                ) {
                    count++
                    break
                }
            }
            // Bottom-Right
            for (let distance = 1; distance < longSide; distance++) {
                if (
                    rowIdx + distance >= seatArr.length ||
                    columnIdx + distance >= seatArr[0].length
                )
                    break
                if (seatArr[rowIdx + distance][columnIdx + distance] === 'L') {
                    break
                } else if (
                    seatArr[rowIdx + distance][columnIdx + distance] === '#'
                ) {
                    count++
                    break
                }
            }
            // Bottom-Left
            for (let distance = 1; distance < longSide; distance++) {
                if (
                    rowIdx + distance >= seatArr.length ||
                    columnIdx - distance < 0
                )
                    break
                if (seatArr[rowIdx + distance][columnIdx - distance] === 'L') {
                    break
                } else if (
                    seatArr[rowIdx + distance][columnIdx - distance] === '#'
                ) {
                    count++
                    break
                }
            }
            // Top-Left
            for (let distance = 1; distance < longSide; distance++) {
                if (rowIdx - distance < 0 || columnIdx - distance < 0) break
                if (seatArr[rowIdx - distance][columnIdx - distance] === 'L') {
                    break
                } else if (
                    seatArr[rowIdx - distance][columnIdx - distance] === '#'
                ) {
                    count++
                    break
                }
            }
        }

        return count
    }
    const adjacentArr = []

    for (let rowIdx = 0; rowIdx < seatArr.length; rowIdx++) {
        let newRow = ''
        const adjacentRow = []

        for (let columnIdx = 0; columnIdx < seatArr[0].length; columnIdx++) {
            const adjacent = getAdjacent(rowIdx, columnIdx)
            adjacentRow.push(adjacent)

            if (adjacent === 0 && seatArr[rowIdx][columnIdx] === 'L') {
                newRow += '#'
                change = true
                continue
            }

            if (adjacent >= tolerance && seatArr[rowIdx][columnIdx] === '#') {
                newRow += 'L'
                change = true
                continue
            }

            newRow += seatArr[rowIdx][columnIdx]
        }

        newSeatArr.push(newRow)
        adjacentArr.push(adjacentRow)
    }
    // console.log(adjacentArr, adjacentArr.length === seatArr.length, adjacentArr[0].length === seatArr[0].length);
    // let isSame = newSeatArr.every((row, rowIdx) => row.split('').every((char, colIdx) => char === seatArr[rowIdx][colIdx]))
    // console.log(isSame);
    if (!change) return newSeatArr.reduce((acc, row) => countSeat(row) + acc, 0)

    return newSeatArr
}

const CalculateSeat = (seatArr, tolerance) => {
    let dataArr = seatArr

    while (typeof dataArr === 'object') {
        dataArr = updateSeatArr(dataArr, tolerance, false)
    }

    return seatArr
}

module.exports = {
    CalculateSeat,
}
