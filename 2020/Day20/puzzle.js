const readPuzzle = (puzzleData) => {
    const puzzleArr = puzzleData.split('\n\n').slice(0, -1)
    const monster = puzzleData.split('\n\n').slice(-1)[0].split('\n')
    const puzzleMap = {}
    const sideCountMap = {}
    const borderArr = []
    const cornerArr = []

    const getSide = (picture) => {
        const top = picture[0]
        const bottom = picture[picture.length - 1].split('').reverse().join('')
        const right = picture.map((row) => row[row.length - 1]).join('')
        const left = picture
            .map((row, i) => picture[picture.length - 1 - i][0])
            .join('')

        return [top, right, bottom, left]
    }

    puzzleArr.forEach((puzzle) => {
        const [title, ...picture] = puzzle.split('\n')
        const id = title.match(/\d+/)[0]
        const info = {
            picture,
            side: getSide(picture),
        }

        puzzleMap[id] = info
    })

    Object.keys(puzzleMap).forEach((key) => {
        puzzleMap[key].side.forEach((side) => {
            const reverseSide = side.split('').reverse().join('')
            if (sideCountMap[side]) {
                sideCountMap[side].push(key)
            } else if (sideCountMap[reverseSide]) {
                sideCountMap[reverseSide].push(key)
            } else {
                sideCountMap[side] = [key]
            }
        })
    })

    Object.keys(sideCountMap).forEach((side) => {
        if (!sideCountMap[side]) {
            side = side.split('').reverse().join('')
        }
        const idArr = sideCountMap[side]

        if (idArr.length === 1) {
            if (puzzleMap[idArr[0]].border) {
                puzzleMap[idArr[0]].corner = true
                cornerArr.push(idArr[0])
            }

            puzzleMap[idArr[0]].border = true
            puzzleMap[idArr[0]].side = puzzleMap[idArr[0]].side.map(
                (originSide) =>
                    originSide === side
                        ? '-'.repeat(originSide.length)
                        : originSide
            )
            borderArr.push(idArr[0])
        }
    })

    return [puzzleMap, monster, borderArr, cornerArr]
}

const combinePuzzle = (puzzleMap) => {
    let completePicture
    let completePuzzle = []
    let puzzleArr = Object.keys(puzzleMap)

    const combineRow = () => {
        const row = []
        const border = '-'.repeat(puzzleMap[puzzleArr[0]].side[0].length)
        let previousRow = completePuzzle[completePuzzle.length - 1] || []
        let top = border
        let idx = 0
        let previousRight = border

        if (previousRow.length === 0) {
            while (previousRight !== border || row.length === 0) {
                let [nextId, nextRight] = findFitPuzzle(top, previousRight)
                if (nextId === `C`) break

                row.push(nextId)
                previousRight = nextRight
            }
        } else {
            while (idx < previousRow.length) {
                top = puzzleMap[previousRow[idx]].side[2]
                let [nextId, nextRight] = findFitPuzzle(top, previousRight)
                if (nextId === `C`) break

                row.push(nextId)

                idx++
                previousRight = nextRight
            }
        }

        completePuzzle.push(row)
        return row
    }

    const findFitPuzzle = (top, previousRight) => {
        let fitPuzzle = `Can't find`

        outer: for (let i = 0; i < puzzleArr.length; i++) {
            const id = puzzleArr[i]
            let sideArr = puzzleMap[id].side
            let picture = puzzleMap[id].picture

            for (let j = 0; j < 4; j++) {
                if (
                    sideArr[0] === top.split('').reverse().join('') &&
                    sideArr[3] === previousRight.split('').reverse().join('')
                ) {
                    puzzleArr = puzzleArr.filter((puzzle) => puzzle !== id)
                    puzzleMap[id].side = sideArr
                    puzzleMap[id].picture = picture
                    fitPuzzle = [id, sideArr[1]]
                    break outer
                }
                sideArr = turnPuzzleRight(sideArr)
                picture = turnPictureRight(picture)
            }

            sideArr = flipPuzzle(sideArr)
            picture = flipPicture(picture)

            for (let k = 0; k < 4; k++) {
                if (
                    sideArr[0] === top.split('').reverse().join('') &&
                    sideArr[3] === previousRight.split('').reverse().join('')
                ) {
                    puzzleArr = puzzleArr.filter((puzzle) => puzzle !== id)
                    puzzleMap[id].side = sideArr
                    puzzleMap[id].picture = picture
                    fitPuzzle = [id, sideArr[1]]
                    break outer
                }
                sideArr = turnPuzzleRight(sideArr)
                picture = turnPictureRight(picture)
            }
        }

        return fitPuzzle
    }

    const cutPuzzle = () => {
        Object.keys(puzzleMap).forEach((key) => {
            let cutPicture = puzzleMap[key].picture
                .slice(1, -1)
                .map((puzzleRow) => puzzleRow.slice(1, -1))

            puzzleMap[key].cutPicture = cutPicture
        })
    }

    const combineCutPuzzle = () => {
        let combineCutPuzzle = []
        for (let i = 0; i < completePuzzle.length; i++) {
            let combineCutRow = Array(
                puzzleMap[completePuzzle[0][0]].cutPicture.length
            ).fill('')
            for (let j = 0; j < completePuzzle[0].length; j++) {
                for (
                    let k = 0;
                    k < puzzleMap[completePuzzle[0][0]].cutPicture.length;
                    k++
                ) {
                    combineCutRow[k] =
                        combineCutRow[k] +
                        puzzleMap[completePuzzle[i][j]].cutPicture[k]
                }
            }
            combineCutPuzzle.push(combineCutRow)
        }

        return combineCutPuzzle.reduce((acc, cur) => [...acc, ...cur], [])
    }

    while (puzzleArr.length > 0) {
        combineRow()
    }

    cutPuzzle()

    completePicture = combineCutPuzzle()

    return completePicture
}

const turnPuzzleRight = (sideArr) => {
    const [top, right, bottom, left] = sideArr

    return [left, top, right, bottom]
}

const flipPuzzle = (sideArr) => {
    const [top, right, bottom, left] = sideArr
    const flipTop =
        top === 'border' ? 'border' : top.split('').reverse().join('')
    const flipBottom =
        bottom === 'border' ? 'border' : bottom.split('').reverse().join('')
    const flipRight =
        right === 'border' ? 'border' : right.split('').reverse().join('')
    const flipLeft =
        left === 'border' ? 'border' : left.split('').reverse().join('')

    return [flipTop, flipLeft, flipBottom, flipRight]
}

const turnPictureRight = (picture) => {
    let turnPicture = []
    for (let i = 0; i < picture[0].length; i++) {
        let row = []
        for (let j = picture.length - 1; j >= 0; j--) {
            row.push(picture[j][i])
        }
        turnPicture.push(row.join(''))
    }

    return turnPicture
}

const flipPicture = (picture) => {
    return picture.map((row) => row.split('').reverse().join(''))
}

const countHash = (picture, monster) => {
    let hashClone = []

    for (let i = 0; i < picture.length; i++) {
        let row = []
        for (let j = 0; j < picture[0].length; j++) {
            row.push('.')
        }
        hashClone.push(row)
    }

    const scanMonster = () => {
        let height = picture.length - monster.length
        let width = picture[0].length - monster[0].length

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let isMatch = hasMonster(j, i)

                if (isMatch) {
                    for (let k = 0; k < monster.length; k++) {
                        for (let l = 0; l < monster[0].length; l++) {
                            hashClone[i + k][j + l] = monster[k][l]
                        }
                    }
                }
            }
        }
    }

    const hasMonster = (x, y) => {
        let hasMonster = true

        outer: for (let i = 0; i < monster.length; i++) {
            for (let j = 0; j < monster[0].length; j++) {
                const scanPicture = picture[i + y][j + x]
                const scanMonster = monster[i][j]

                if (scanPicture !== '#' && scanMonster === '#') {
                    hasMonster = false
                    break outer
                }
            }
        }

        return hasMonster
    }

    for (let i = 0; i < 4; i++) {
        scanMonster()
        monster = turnPictureRight(monster)
    }

    monster = flipPicture(monster)

    for (let j = 0; j < 4; j++) {
        scanMonster()
        monster = turnPictureRight(monster)
    }

    let hashCount = 0

    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[0].length; j++) {
            if (picture[i][j] === '#' && hashClone[i][j] !== '#') {
                hashCount++
            }
        }
    }

    return hashCount
}

module.exports = {
    readPuzzle,
    combinePuzzle,
    countHash,
}
