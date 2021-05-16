const answerOfMemoryGame = (startDataArr, round) => {
    let lastIdxMap = {}
    let lastAns = startDataArr[startDataArr.length - 1]

    startDataArr.forEach((int, idx) => {
        lastIdxMap[int] = idx
    })

    for (let i = startDataArr.length; i < round; i++) {
        if (lastIdxMap[lastAns] === undefined) {
            lastIdxMap[lastAns] = i - 1
            lastAns = 0
        } else if (lastIdxMap[lastAns] === i - 1) {
            lastAns = 0
        } else {
            idxDistance = i - 1 - parseInt(lastIdxMap[lastAns])
            lastIdxMap[lastAns] = i - 1
            lastAns = idxDistance
        }
    }

    return lastAns
}

module.exports = {
    answerOfMemoryGame,
}
