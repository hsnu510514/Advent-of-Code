const cupGame = (cupData, moves, crabStyle = false) => {
    let cupArr = cupData.split('').map((int) => parseInt(int))
    const max = Math.max(...cupArr)
    const min = Math.min(...cupArr)
    let idx = 0
    let move = 0

    const moveCup = () => {
        let current = cupArr[idx]
        // console.log('current: ', current)

        let pickup = cupArr.splice(idx + 1, 3)
        let offset = 3 - pickup.length
        if (offset > 0) {
            pickup = pickup.concat(cupArr.splice(0, offset))
        }
        // console.log('pickup: ', pickup)

        destination = current - 1
        while (pickup.includes(destination) || destination < min) {
            destination--
            if (destination < min) {
                destination = max
            }
        }
        let destIdx = cupArr.indexOf(destination)
        // console.log('destination: ', destination)

        cupArr.splice(destIdx + 1, 0, ...pickup)

        idx = (cupArr.indexOf(current) + 1) % cupArr.length
    }

    const getCupsAfterLabel = (label) => {
        let idx = cupArr.indexOf(label)
        return [...cupArr.slice(idx), ...cupArr.slice(0, idx)]
    }

    if (crabStyle) {
        bigCupArr = Array(1000000)
            .fill(0)
            .map((_, idx) => idx + 1)

        cupArr.forEach((label, idx) => (bigCupArr[idx] = label))
        cupArr = bigCupArr
    }

    while (move < moves) {
        if (move % 10000 === 0) {
            console.log(`Move ${move + 1}: `)
        }
        // console.log(cupArr)
        moveCup()
        move++
    }

    console.log(cupArr)

    return getCupsAfterLabel(1)
}

module.exports = {
    cupGame,
}
