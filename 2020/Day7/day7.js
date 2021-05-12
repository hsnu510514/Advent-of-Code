const readBagData = (data) => {
    let bagMap = {}

    data.forEach((bag) => {
        let keyValue = bag.split('contain')
        let bagType = keyValue[0].match(/[a-z ]+(bag)/)[0]
        let content = keyValue[1].match(/(\d+)[a-z ]+/g) || []
        bagMap[bagType] = content
    })

    return bagMap
}

const findBag = (bagType, bagMap) => {
    let ans = []

    for (let bag in bagMap) {
        let queue = bagMap[bag]

        for (let innerBag of queue) {
            if (innerBag.includes(bagType)) {
                ans.push(bag)
                break
            } else {
                let innerBagType =
                    innerBag.split(' ').slice(1, 3).join(' ') + ' bag'
                queue.push(...bagMap[innerBagType])
            }
        }
    }

    return ans
}

const countBags = (bagType, bagMap) => {
    if (bagMap[bagType].length === 0) return 1

    let bagCount =
        1 +
        bagMap[bagType].reduce((sum, innerBag) => {
            let number = innerBag.split(' ', 1)[0]
            let innerBagType =
                innerBag.split(' ').slice(1, 3).join(' ') + ' bag'
            return sum + number * countBags(innerBagType, bagMap)
        }, 0)
    // console.log(bagType, bagCount);

    return bagCount
}

module.exports = {
    readBagData,
    findBag,
    countBags,
}
