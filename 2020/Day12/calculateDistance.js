const calculateDistance = (instructionArr) => {
    let coordinate = [0, 0]
    let direction = 'E'
    let directionArr = ['N', 'E', 'W', 'S']

    for (let i = 0; i < instructionArr.length; i++) {
        let action = instructionArr[i][0]
        let value = parseInt(instructionArr[i].slice(1))

        switch (action) {
            case 'N':
                coordinate[1] += value
                break
            case 'S':
                coordinate[1] -= value
                break
            case 'E':
                coordinate[0] += value
                break
            case 'W':
                coordinate[0] -= value
                break
            case 'L':
                direction =
                    directionArr[
                        (directionArr.indexOf(direction) + 4 - value / 90) % 4
                    ]
                break
            case 'R':
                direction =
                    directionArr[
                        (directionArr.indexOf(direction) + value / 90) % 4
                    ]
                break
            case 'F':
                instructionArr.push(`${direction}${value}`)
                break
            default:
                console.log(`Error action`)
                break
        }
    }

    return Math.abs(coordinate[0]) + Math.abs(coordinate[1])
}

const moveByWaypoint = (instructionArr) => {
    let coordinate = [0, 0]
    let waypoint = [10, 1]
    let record = []
    // let direction = 'E'
    let dimensionArr = [
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
    ]

    const getDimension = (waypoint) => {
        if (waypoint[0] >= 0 && waypoint[1] >= 0) {
            return 0
        }
        if (waypoint[0] < 0 && waypoint[1] > 0) {
            return 1
        }
        if (waypoint[0] <= 0 && waypoint[1] <= 0) {
            return 2
        }
        if (waypoint[0] > 0 && waypoint[1] < 0) {
            return 3
        }
    }

    for (let i = 0; i < instructionArr.length; i++) {
        let action = instructionArr[i][0]
        let value = parseInt(instructionArr[i].slice(1))

        switch (action) {
            case 'N':
                waypoint[1] += value
                break
            case 'S':
                waypoint[1] -= value
                break
            case 'E':
                waypoint[0] += value
                break
            case 'W':
                waypoint[0] -= value
                break
            case 'L':
                currentDimension = getDimension(waypoint)
                newDimension = dimensionArr[(currentDimension + value / 90) % 4]
                waypoint =
                    (value / 90) % 2 === 0
                        ? [-1 * waypoint[0], -1 * waypoint[1]]
                        : [
                              Math.abs(waypoint[1]) * newDimension[0],
                              Math.abs(waypoint[0]) * newDimension[1],
                          ]
                break
            case 'R':
                currentDimension = getDimension(waypoint)
                newDimension =
                    dimensionArr[(currentDimension + 4 - value / 90) % 4]
                waypoint =
                    (value / 90) % 2 === 0
                        ? [-1 * waypoint[0], -1 * waypoint[1]]
                        : [
                              Math.abs(waypoint[1]) * newDimension[0],
                              Math.abs(waypoint[0]) * newDimension[1],
                          ]
                break
            case 'F':
                coordinate = [
                    coordinate[0] + waypoint[0] * value,
                    coordinate[1] + waypoint[1] * value,
                ]
                break
            default:
                console.log(`Error action`)
                break
        }
    }
    console.log(coordinate)
    return Math.abs(coordinate[0]) + Math.abs(coordinate[1])
}

module.exports = {
    calculateDistance,
    moveByWaypoint,
}
