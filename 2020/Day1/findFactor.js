const fs = require('fs')

// let data = fs.readFile('data.txt', 'utf8');
// let sortedDataArr = data.split('\n').sort((a,b)=> a-b);

const findTwoFactor = (arr, total) => {
    let head = 0
    let tail = arr.length - 1
    let sum = +arr[head] + +arr[tail]

    while (sum !== total) {
        if (sum > total) {
            tail--
        } else if (sum < total) {
            head++
        }
        sum = +arr[head] + +arr[tail]
    }

    return sum === total ? [arr[head], arr[tail]] : false
}

// let factors = findTwoFactor(sortedDataArr, 2020)
// let ans = factors[0] * factors[1];

// console.log(ans);

// Part 2

const findThreeFactor = (arr, total) => {
    for (let i = 0; i < arr.length; i++) {
        let arrClone = [...arr]
        arrClone.splice(i, 1)

        let hasThreeFactor = findTwoFactor(arrClone, total - arr[i])

        if (hasThreeFactor) {
            return [arr[i], ...hasThreeFactor]
        }
    }

    return null
}

// let factors = findThreeFactor(sortedDataArr, 2020);
// let ans = factors.reduce((acc, cur)=> acc * cur, 1);

// console.log(ans)

module.exports = {
    findTwoFactor,
    findThreeFactor,
}
