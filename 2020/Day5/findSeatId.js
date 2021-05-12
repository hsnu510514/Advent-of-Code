const findSeatId = (seatArr) => {
    let idMap = {}

    for (let seat of seatArr) {
        let row = seat.substring(0, 7)
        let column = seat.substring(7)

        let rowStart = 0
        let rowEnd = 2 ** row.length - 1
        let colStart = 0
        let colEnd = 2 ** column.length - 1

        for (let rowChar of row) {
            if (rowChar === 'F') {
                rowEnd = Math.floor((rowStart + rowEnd) / 2)
            } else if (rowChar === 'B') {
                rowStart = Math.ceil((rowStart + rowEnd) / 2)
            }
        }

        for (let colChar of column) {
            if (colChar === 'L') {
                colEnd = Math.floor((colStart + colEnd) / 2)
            } else if (colChar === 'R') {
                colStart = Math.ceil((colStart + colEnd) / 2)
            }
        }

        idMap[seat] = rowEnd * 8 + colEnd
    }

    return idMap
}

const findLastSeat = (idMap) => {
    let idArr = Object.values(idMap)
    let sortIdArr = idArr.sort((a, b) => a - b)

    for (let i = 0; i < sortIdArr.length - 1; i++) {
        if (sortIdArr[i + 1] - sortIdArr[i] !== 1) return sortIdArr[i] + 1
    }

    return "Can't find the seat"
}

module.exports = {
    findSeatId,
    findLastSeat,
}
