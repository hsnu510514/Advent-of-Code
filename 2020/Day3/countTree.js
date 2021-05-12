const countTree = (data, right, down) => {
    let count = 0

    for (let i = 0; i < data.length; i++) {
        if (i !== 0 && i % down === 0) {
            let calcRight = (right * i) % data[0].length

            if (data[i][calcRight] === '#') count++
        }
    }

    return count
}

const testTreeMap = (data, right, down) => {
    for (let i = 0; i < data.length; i++) {
        if (i !== 0 && i % down === 0) {
            let calcRight = (right * i) % data[0].length

            data[i] =
                data[i].substring(0, calcRight) +
                'O' +
                data[i].substring(calcRight + 1, data[i].length)
        }
    }

    return data
}

module.exports = {
    countTree,
    testTreeMap,
}
