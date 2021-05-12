const hasSumInArr = (arr, sum) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr.includes((sum - arr[i]).toString()) && sum !== 2 * arr[i])
            return true
    }
    return false
}

const findXMASWeakness = (dataArr) => {
    const currentRecord = dataArr.slice(0, 25)

    for (let i = 25; i < dataArr.length; i++) {
        if (hasSumInArr(currentRecord, dataArr[i])) {
            const currentIdx = (i - 25) % 25
            currentRecord[currentIdx] = dataArr[i]
        } else {
            return dataArr[i]
        }
    }

    return `No weakness`
}

const findEncryptionWeakness = (dataArr, weaknessNumber) => {
    const store = []
    let sum = 0

    for (const value of dataArr) {
        if (sum < weaknessNumber) {
            store.push(parseInt(value, 10))
            sum += parseInt(value, 10)
        }

        while (sum > weaknessNumber) {
            sum -= store[0]
            store.shift()
        }

        if (sum == weaknessNumber) {
            const max = Math.max(...store)
            const min = Math.min(...store)
            return max + min
        }
    }

    return `Can't find encryption weakness`
}

module.exports = {
    findXMASWeakness,
    findEncryptionWeakness,
}
