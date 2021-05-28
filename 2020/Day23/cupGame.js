const cupGame = (cupData, moves, crabStyle = false) => {
    let cupMap = {}
    let cupArr = cupData.split('').map((int) => parseInt(int))
    const max = crabStyle ? 1_000_000 : Math.max(...cupArr)
    const min = Math.min(...cupArr)
    let current = cupArr[0]
    let move = 0

    const moveCup = () => {
        // console.log('current: ', current)

        let first = cupMap[current]
        let second = cupMap[first]
        let third = cupMap[second]

        cupMap[current] = cupMap[third]

        let pickup = [first, second, third]
        // console.log('pickup: ', pickup)

        destination = current - 1
        while (pickup.includes(destination) || destination < min) {
            destination--
            if (destination < min) {
                destination = max
            }
        }

        cupMap[third] = cupMap[destination]
        cupMap[destination] = first
        // console.log('destination: ', destination)
        current = cupMap[current]
    }

    const getCupsAfterLabel = (label) => {
        let idx = cupMap[label]
        let ans = `${label}, `
        let count = 10
        let i = 0

        // while (idx !== label) {
        while (i < count) {
            ans += `${idx}, `
            idx = cupMap[idx]
            i++
        }

        return ans
    }

    if (crabStyle) {
        let bigCupArr = Array(1_000_000)
            .fill(0)
            .map((_, idx) => idx + 1)

        cupArr.forEach((label, idx) => (bigCupArr[idx] = label))
        cupArr = bigCupArr
    }

    cupArr.forEach((int, i) => {
        if (i !== cupArr.length - 1) {
            cupMap[int] = cupArr[i + 1]
        } else {
            cupMap[int] = cupArr[0]
        }
    })
    // console.log(cupArr)
    // console.log(cupMap)
    while (move < moves) {
        moveCup()
        move++
    }

    // console.log(cupMap[1_000_000])
    // Object.keys(cupMap).forEach((key) => {
    //     if (
    //         cupMap[key] === 934001 ||
    //         cupMap[key] === 159792 ||
    //         cupMap[key] === 1
    //     ) {
    //         console.log(key, cupMap[key])
    //     }
    // })
    console.log(cupMap[1] * cupMap[cupMap[1]])
    return getCupsAfterLabel(1)
}

module.exports = {
    cupGame,
}
