const validateTicket = (ticketTemplate, ticketData) => {
    let fieldRangeArr = ticketTemplate.match(/\d+-\d+/g)
    let fieldRangeMap = {}
    let ticketArr = ticketData.split('\n').slice(1)
    let validTicketArr = []

    fieldRangeArr.forEach((fieldRange) => {
        let [start, end] = fieldRange.split('-')

        for (let i = parseInt(start); i <= parseInt(end); i++) {
            fieldRangeMap[i] = true
        }
    })

    let errorRate = ticketArr.reduce((count, ticket) => {
        let fieldArr = ticket.split(',')
        let isValid = true
        let invalidRate = fieldArr.reduce((acc, field) => {
            if (fieldRangeMap[field] === undefined) {
                isValid = false
                return acc + parseInt(field)
            } else {
                return acc
            }
        }, 0)
        if (isValid) {
            validTicketArr.push(ticket)
        }

        return count + invalidRate
    }, 0)

    return [errorRate, validTicketArr]
}

const findFieldSequence = (ticketTemplate, validTicketArr) => {
    let fieldRule = {}
    let fieldArr = ticketTemplate.split('\n')
    let splitValidTicketArr = validTicketArr.map((ticket) => ticket.split(','))

    fieldArr.forEach((field) => {
        let fieldName = field.split(':')[0]
        let fieldValue = field.match(/\d+-\d+/g)

        fieldRule[fieldName] = fieldValue
    })

    const findInvalidField = (value) => {
        let invalidField = []

        for (let key in fieldRule) {
            let valid = fieldRule[key].some((range) => {
                let [start, end] = range.split('-')
                return (
                    parseInt(value) >= parseInt(start) &&
                    parseInt(value) <= parseInt(end)
                )
            })
            if (!valid) invalidField.push(key)
        }

        return invalidField
    }

    let validFieldListArr = splitValidTicketArr[0].map((field, idx) => {
        let fieldList = Object.keys(fieldRule)
        let invalidField = new Set()

        for (let i = 0; i < splitValidTicketArr.length; i++) {
            // if (idx === 6 && i === 164) {
            //     console.log(splitValidTicketArr[i][idx])
            //     console.log(splitValidTicketArr[i][idx])
            //     console.log(i, findInvalidField(splitValidTicketArr[i][idx]))
            // }
            findInvalidField(splitValidTicketArr[i][idx]).forEach((field) =>
                invalidField.add(field)
            )
        }

        let validFieldList = fieldList.filter(
            (field) => !Array.from(invalidField).includes(field)
        )

        return validFieldList
    })

    return validFieldListArr
}

const allocateField = (ticketTemplate, validFieldListArr) => {
    let fieldList = ticketTemplate
        .split('\n')
        .map((field) => field.split(':')[0])
    let sortList = validFieldListArr
        .map((fieldList, idx) => {
            return { idx, fieldList }
        })
        .sort((a, b) => a.fieldList.length - b.fieldList.length)
    let allocateSequence = []

    // console.log(validFieldListArr)

    sortList.forEach((list) => {
        list.fieldList.forEach((field) => {
            if (fieldList.includes(field)) {
                allocateSequence.push({ idx: list.idx, field })
                fieldList = fieldList.filter((f) => f !== field)
            }
        })
    })

    return allocateSequence.sort((a, b) => a.idx - b.idx)
}

const getMultiplied = (myTicket, fieldSequence) => {
    let myTicketField = myTicket.split('\n')[1].split(',')
    let multipliedList = fieldSequence.reduce((store, field) => {
        if (field.field.includes('departure')) {
            store.push(field.idx)
        }
        return store
    }, [])

    let multiples = multipliedList.reduce(
        (multiples, idx) => myTicketField[idx] * multiples,
        1
    )

    return multiples
}

module.exports = {
    validateTicket,
    findFieldSequence,
    allocateField,
    getMultiplied,
}
