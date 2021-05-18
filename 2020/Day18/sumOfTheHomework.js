const sumOfTheHomework = (homeworkData, priority) => {
    const questionArr = homeworkData.split('\n')

    let ansArr = questionArr.map((question) => {
        const trimQuestion = question.replace(/ /g, '')
        let store = []
        let processing = []

        for (let i = 0; i < trimQuestion.length; i++) {
            if (trimQuestion[i] !== ')') {
                store.push(trimQuestion[i].toString())
            } else {
                while (store[store.length - 1] !== '(') {
                    processing.unshift(store.pop())
                }
                store.pop()

                if (priority === 'addition') {
                    while (processing.includes('+')) {
                        let idx = processing.indexOf('+')

                        processing.splice(
                            idx - 1,
                            3,
                            calculate(processing.slice(idx - 1, idx + 3))
                        )
                    }
                } else if (priority === 'multiplication') {
                    while (processing.includes('*')) {
                        let idx = processing.indexOf('*')
                        processing.splice(
                            idx - 1,
                            3,
                            calculate(processing.slice(idx - 1, idx + 3))
                        )
                    }
                }

                while (processing.length > 2) {
                    let ans = calculate(processing.slice(0, 3))
                    processing = processing.slice(3)
                    processing.unshift(ans)
                }

                store.push(processing.pop())
            }
        }

        if (priority === 'addition') {
            while (store.includes('+')) {
                let idx = store.indexOf('+')
                store.splice(
                    idx - 1,
                    3,
                    calculate(store.slice(idx - 1, idx + 3))
                )
            }
        } else if (priority === 'multiplication') {
            while (store.includes('*')) {
                let idx = store.indexOf('*')
                store.splice(
                    idx - 1,
                    3,
                    calculate(store.slice(idx - 1, idx + 3))
                )
            }
        }
        while (store.length > 2) {
            let ans = calculate(store.slice(0, 3))
            store = store.slice(3)
            store.unshift(ans)
        }

        return store[0]
    })

    return ansArr.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0)
}

const calculate = (expressionArr) => {
    const [first, operator, second] = expressionArr
    let ans
    switch (operator) {
        case '+':
            ans = parseInt(first) + parseInt(second)
            break
        case '*':
            ans = parseInt(first) * parseInt(second)
            break
        default:
            console.log('Error input')
            break
    }

    return ans
}

module.exports = {
    sumOfTheHomework,
}
