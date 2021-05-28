const getEncryptionKey = (cardKey, doorKey) => {
    const cardLoopSize = getLoopSize(7, cardKey)
    const doorLoopSize = getLoopSize(7, doorKey)

    let encryptionKeyFromDoor = runLoop(cardLoopSize, doorKey)
    encryptionKeyFromDoor = runLoop(cardLoopSize, doorKey)
    console.log(encryptionKeyFromDoor)
}

const getLoopSize = (subjectNumber, key) => {
    let current = 1
    let count = 0

    while (current !== key) {
        current = (subjectNumber * current) % 20201227
        count++
    }

    return count
}

const runLoop = (loopSize, key) => {
    let current = 1
    for (let i = 0; i < loopSize; i++) {
        current = (current * key) % 20201227
    }

    return current
}

module.exports = {
    getEncryptionKey,
}
