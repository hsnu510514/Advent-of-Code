const findAccumulator = (actionArr) => {
    let excutedAction = []
    let accumulator = 0

    for (let i = 0; i < actionArr.length; ) {
        if (!actionArr[i]) break

        let [type, value] = actionArr[i].split(' ')

        if (excutedAction[i]) break

        switch (type) {
            case 'acc':
                excutedAction[i] = true
                accumulator += parseInt(value)
                i++
                break
            case 'jmp':
                excutedAction[i] = true
                i += parseInt(value)
                break
            case 'nop':
                excutedAction[i] = true
                i++
                break
            default:
                console.log('False type')
        }

        if (i === actionArr.length - 1) {
            return accumulator
        }
    }

    return `Infinite Loop with accumulator ${accumulator}`
}

const autoFixAction = (actionArr) => {
    let jmpIdxArr = actionArr.reduce((idxArr, action, idx) => {
        if (action.includes('jmp')) {
            idxArr.push(idx)
        }
        return idxArr
    }, [])
    let nopIdxArr = actionArr.reduce((idxArr, action, idx) => {
        if (action.includes('nop')) {
            idxArr.push(idx)
        }
        return idxArr
    }, [])

    console.log(jmpIdxArr, nopIdxArr)

    for (let i = 0; i < jmpIdxArr.length; i++) {
        let actionValue = actionArr[jmpIdxArr[i]].split(' ')[1]

        let updatedAction = 'nop ' + actionValue
        let cloneData = [...actionArr]
        cloneData.splice(jmpIdxArr[i], 1, updatedAction)

        if (i === 0) console.log(cloneData)

        let accumulator = findAccumulator(cloneData)

        if (typeof accumulator === 'number') {
            return accumulator
        }
    }

    for (let i = 0; i < nopIdxArr.length; i++) {
        let actionValue = actionArr[nopIdxArr[i]].split(' ')[1]

        let updatedAction = 'jmp ' + actionValue
        let cloneData = [...actionArr]
        cloneData.splice(nopIdxArr[i], 1, updatedAction)

        let accumulator = findAccumulator(cloneData)

        if (typeof accumulator === 'number') {
            return accumulator
        }
    }

    return "Can't autofix"
}

module.exports = {
    findAccumulator,
    autoFixAction,
}
