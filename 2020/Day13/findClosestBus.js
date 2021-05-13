const findClosestBus = (busData) => {
    let arriveTime = parseInt(busData[0])
    let busIdArr = busData[1].split(',').filter((id) => id !== 'x')
    let gapTimeArr = busIdArr.map((busId) => {
        let busTime = parseInt(busId)
        let gapTime = busTime - (arriveTime % busTime)

        return gapTime
    })
    let minGapTime = Math.min(...gapTimeArr)
    let closestBusIdx = gapTimeArr.indexOf(minGapTime)

    let closestBus = busIdArr[closestBusIdx]

    return closestBus * minGapTime
}

const findMatchingTimeStamp = (busData) => {
    let busDataArr = busData[1].split(',')

    let busOffsetArr = []
    let timestampOfTwoBusArr = []
    let timestampOfTwoTimestampArr = []

    busDataArr.forEach((busId, offset) => {
        if (busId !== 'x') {
            busOffsetArr.push([busId, offset])
        }
    })
    console.log(busOffsetArr)

    for (let i = 1; i < busOffsetArr.length; i++) {
        timestampOfTwoBusArr.push(
            minTimestampOfTwoBus(
                busOffsetArr[0][0],
                busOffsetArr[i][0],
                busOffsetArr[i][1] - busOffsetArr[0][1]
            )
        )
    }
    console.log(timestampOfTwoBusArr)

    for (let i = 1; i < timestampOfTwoBusArr.length; i++) {
        timestampOfTwoTimestampArr.push(
            minTimestampOfTwoTimestamp(
                timestampOfTwoBusArr[0][0],
                timestampOfTwoBusArr[0][1],
                timestampOfTwoBusArr[i][0],
                timestampOfTwoBusArr[i][1]
            )
        )
    }
    console.log(timestampOfTwoTimestampArr)

    while (timestampOfTwoTimestampArr.length > 1) {
        let newArr = []
        for (let i = 1; i < timestampOfTwoTimestampArr.length; i++) {
            newArr.push(
                minTimestampOfTwoTimestamp(
                    timestampOfTwoTimestampArr[0][0],
                    timestampOfTwoTimestampArr[0][1],
                    timestampOfTwoTimestampArr[i][0],
                    timestampOfTwoTimestampArr[i][1]
                )
            )
        }
        timestampOfTwoTimestampArr = newArr
    }

    return timestampOfTwoTimestampArr
}

const minTimestampOfTwoBus = (firstBusId, secondBusId, difference) => {
    let timestamp = parseInt(firstBusId)
    while ((timestamp + difference) % secondBusId !== 0) {
        timestamp += parseInt(firstBusId)
    }

    return [timestamp, firstBusId * secondBusId]
}

const minTimestampOfTwoTimestamp = (
    firstLocation,
    firstTimeGap,
    secondLocation,
    secondTimeGap
) => {
    let target = secondTimeGap
    while ((target + secondLocation - firstLocation) % firstTimeGap !== 0) {
        target += secondTimeGap
    }

    return [secondLocation + target, findGCD(firstTimeGap, secondTimeGap)]
}

const findGCD = (firstTimeGap, secondTimeGap) => {
    let first = firstTimeGap
    let second = secondTimeGap

    while (first % second !== 0) {
        temp = first
        first = second
        second = temp % second
    }

    return (firstTimeGap * secondTimeGap) / second
}

module.exports = {
    findClosestBus,
    findMatchingTimeStamp,
    minTimestampOfTwoBus,
    minTimestampOfTwoTimestamp,
    findGCD,
}
