const findValidMessage = (messageData, updateRule = {}) => {
    const [rules, messages] = messageData.split('\n\n')
    const ruleArr = rules.split('\n')
    const ruleMap = {}
    const decodeMap = {}
    const messageArr = messages.split('\n')
    const loopLengthArr = new Set()

    ruleArr.forEach((rule) => {
        const [ruleName, subRule] = rule.split(':')
        const subRuleArr = subRule.match(/(\d+ )+\d+|\d+|\w/g)
        ruleMap[ruleName] = subRuleArr
    })

    const decodeRule = (ruleName) => {
        let ans

        if (decodeMap[ruleName]) {
            return decodeMap[ruleName]
        }

        if (
            ruleMap[ruleName].length === 1 &&
            ruleMap[ruleName][0].length === 1
        ) {
            ans = ruleMap[ruleName]
        } else {
            ans = ruleMap[ruleName].reduce((combineRule, subRule) => {
                let rule = subRule.split(' ')
                let front = decodeRule(rule.shift())

                while (rule.length > 0) {
                    let back = decodeRule(rule.shift())

                    updateFront = front.reduce(
                        (combine, first) => [
                            ...combine,
                            ...back.map((second) => first + second),
                        ],
                        []
                    )

                    front = updateFront
                }

                return [...combineRule, ...front]
            }, [])
        }

        decodeMap[ruleName] = ans

        return ans
    }

    const testLoopRule = (message) => {
        const rule42Length = decodeMap['42'][0].length
        const rule31Length = decodeMap['31'][0].length
        let rule42Count = 0
        let rule31Count = 0

        while (decodeMap[42].includes(message.slice(0, rule42Length))) {
            message = message.slice(rule42Length)
            rule42Count++
        }

        while (decodeMap[31].includes(message.slice(0, rule31Length))) {
            message = message.slice(rule31Length)
            rule31Count++
        }
        console.log(message, rule42Count, rule31Count)

        return (
            message === '' &&
            rule42Count > rule31Count &&
            rule42Count &&
            rule31Count
        )
    }

    ruleArr.forEach((rule) => {
        const ruleName = rule.split(':')[0]
        decodeMap[ruleName] = decodeRule(ruleName)
    })
    console.log(decodeMap)

    console.log('lengthArr', loopLengthArr)

    let ans

    if (updateRule) {
        ans = messageArr.reduce(
            (acc, cur) => (testLoopRule(cur) ? acc + 1 : acc),
            0
        )
    } else {
        ans = messageArr.reduce(
            (acc, cur) => (decodeMap[0].includes(cur) ? acc + 1 : acc),
            0
        )
    }

    return ans
}

module.exports = {
    findValidMessage,
}
