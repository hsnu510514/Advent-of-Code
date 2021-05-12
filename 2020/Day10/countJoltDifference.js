const countJoltDifference = (
    adapterArr,
    joltDifferenceArr,
    formula,
    outletJolt = 0,
    deviceJoltDifference = 3
) => {
    const sortArr = adapterArr.sort((a, b) => a - b)
    const differenceCount = {}

    if (joltDifferenceArr.includes(sortArr[0] - outletJolt)) {
        differenceCount[sortArr[0] - outletJolt] = 1
    } else {
        return `Error, no valid first adapter`
    }

    for (let i = 1; i < sortArr.length; i++) {
        const joltDifference = sortArr[i] - sortArr[i - 1]
        if (joltDifferenceArr.includes(joltDifference)) {
            differenceCount[joltDifference] =
                differenceCount[joltDifference] + 1 || 1
        }
    }

    differenceCount[deviceJoltDifference]++

    return differenceCount[formula[0]] * differenceCount[formula[1]]
}

const countArrangement = (
    adapterArr,
    outletJolt = 0,
    deviceJoltDifference = 3
) => {
    const cloneAdapterArr = [...adapterArr].sort((a, b) => a - b)
    const deviceJolt =
        parseInt(adapterArr[adapterArr.length - 1], 10) + deviceJoltDifference
    const adapterMap = { 0: 1 }

    cloneAdapterArr.unshift(outletJolt)
    cloneAdapterArr.push(deviceJolt)

    for (let i = 1; i < cloneAdapterArr.length; i++) {
        let arrangement = 0

        if (adapterMap[cloneAdapterArr[i] - 1]) {
            arrangement += adapterMap[cloneAdapterArr[i] - 1]
        }
        if (adapterMap[cloneAdapterArr[i] - 2]) {
            arrangement += adapterMap[cloneAdapterArr[i] - 2]
        }
        if (adapterMap[cloneAdapterArr[i] - 3]) {
            arrangement += adapterMap[cloneAdapterArr[i] - 3]
        }

        adapterMap[cloneAdapterArr[i]] = arrangement
    }

    return adapterMap[deviceJolt]
}

module.exports = {
    countJoltDifference,
    countArrangement,
}
