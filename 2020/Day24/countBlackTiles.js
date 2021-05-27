const countBlackTiles = (tileData, days = 0) => {
    let tileMap = {}
    const tileArr = tileData
        .split('\n')
        .map((direction) => direction.match(/e|w|(se)|(sw)|(ne)|(nw)/g))
    let XBoundary = [0, 0]
    let YBoundary = [0, 0]
    let day = 0

    tileArr
        .map((directionArr) => getLocation(directionArr))
        .forEach((location) => {
            // let locationStr = location.toString()
            const [coordX, coordY] = location.match(/[-\d.]+/g)
            XBoundary = [
                Math.min(XBoundary[0], coordX),
                Math.max(XBoundary[1], coordX),
            ]
            YBoundary = [
                Math.min(YBoundary[0], coordY),
                Math.max(YBoundary[1], coordY),
            ]

            tileMap[location]
                ? (tileMap[location] += 1)
                : (tileMap[location] = 1)
        })

    while (day < days) {
        tileMap = switchTile(tileMap, XBoundary, YBoundary, days)
        day++
    }

    let countOfBlackTile = Object.keys(tileMap).reduce((acc, cur) => {
        return tileMap[cur] % 2 === 1 ? acc + 1 : acc
    }, 0)

    return countOfBlackTile
}

const switchTile = (tileMap, XBoundary, YBoundary, days) => {
    let updateTileMap = {}

    const flipTile = (location) => {
        const [coordX, coordY] = location
            .match(/[-\d.]+/g)
            .map((coord) => parseFloat(coord))
        let count = 0

        if (tileMap[`x${coordX}y${coordY}`] % 2 === 1) {
            if (tileMap[`x${coordX + 0.5}y${coordY + 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX + 1}y${coordY}`] % 2 === 1) count++
            if (tileMap[`x${coordX + 0.5}y${coordY - 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 0.5}y${coordY + 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 1}y${coordY}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 0.5}y${coordY - 1}`] % 2 === 1) count++

            if (count > 2 || count === 0) {
                updateTileMap[location] = 0
            } else {
                updateTileMap[location] = tileMap[location]
            }
        } else {
            if (tileMap[`x${coordX + 0.5}y${coordY + 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX + 1}y${coordY}`] % 2 === 1) count++
            if (tileMap[`x${coordX + 0.5}y${coordY - 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 0.5}y${coordY + 1}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 1}y${coordY}`] % 2 === 1) count++
            if (tileMap[`x${coordX - 0.5}y${coordY - 1}`] % 2 === 1) count++

            if (count === 2) {
                updateTileMap[location] = 1
            } else {
                updateTileMap[location] = tileMap[location]
            }
        }
    }

    // Object.keys(tileMap).forEach((key) => flipTile(key))
    for (let i = -1 * days + XBoundary[1]; i <= days + XBoundary[0]; i++) {
        for (let j = -1 * days + YBoundary[1]; j <= days + YBoundary[0]; j++) {
            let offset = Math.abs(j) % 2 === 1 ? 0.5 : 0
            let location = `x${i + offset}y${j}`
            flipTile(location)
        }
    }

    return updateTileMap
}

const getLocation = (directionArr) => {
    let x = 0
    let y = 0
    let heightUnit = 1

    const move = (direction) => {
        switch (direction) {
            case 'ne':
                x += 0.5
                y += heightUnit
                break
            case 'e':
                x++
                break
            case 'se':
                x += 0.5
                y -= heightUnit
                break
            case 'nw':
                x -= 0.5
                y += heightUnit
                break
            case 'w':
                x--
                break
            case 'sw':
                x -= 0.5
                y -= heightUnit
                break
            default:
                console.log('False')
        }
    }

    directionArr.forEach((direction) => move(direction))

    return `x${x}y${y}`
}

module.exports = {
    countBlackTiles,
}
