const readPW = (data) => {
    let keyValue = /(\d+\-\d+) (\w): \w+/g

    let PWArr = data.match(keyValue)

    return PWArr
}

const testPW = (PWArr, mode = 'position') => {
    let validPW = []

    if (mode === 'count') {
        PWArr.forEach((PW) => {
            let seperate = PW.split(' ')
            let min = seperate[0].split('-')[0]
            let max = seperate[0].split('-')[1]
            let char = seperate[1][0]
            let pw = seperate[2]

            let charCount = pw.split('').filter((c) => c === char).length

            if (charCount >= min && charCount <= max) validPW.push(PW)
        })
    }

    if (mode === 'position') {
        PWArr.forEach((PW) => {
            let seperate = PW.split(' ')
            let idx1 = seperate[0].split('-')[0]
            let idx2 = seperate[0].split('-')[1]
            let char = seperate[1][0]
            let pw = seperate[2]
            let pass1 = pw[idx1 - 1] === char ? 1 : -1
            let pass2 = pw[idx2 - 1] === char ? 1 : -1

            if (pass1 * pass2 === -1) validPW.push(PW)
        })
    }
    console.log(validPW)

    return validPW.length
}

module.exports = {
    readPW,
    testPW,
}
