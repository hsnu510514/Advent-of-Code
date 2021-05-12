const readPassport = (data) => {
    let splitData = data
        .split('\n\n')
        .map((passport) => passport.split(/[ \n]/))
    let passportArr = []

    splitData.forEach((passportInfo) => {
        let passportObject = passportInfo.reduce((passport, info) => {
            let [key, value] = info.split(':')
            passport[key] = value
            return passport
        }, {})
        passportArr.push(passportObject)
    })

    return passportArr
}

const includePassportField = (passportArr, ...excludeFields) => {
    let passportFields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid',
        'cid',
    ]
    let validFields = excludeFields.reduce(
        (targetFields, excludeField) => {
            targetFields.splice(targetFields.indexOf(excludeField), 1)
            return targetFields
        },
        [...passportFields]
    )
    let validPassport = []

    passportArr.forEach((passport) => {
        let isValid = validFields.every(
            (field) => passport[field] !== undefined
        )
        if (isValid) {
            validPassport.push(passport)
        }
    })

    return validPassport
}

let rules = {
    byr: {
        digits: 4,
        range: [1920, 2002],
    },
    iyr: {
        digits: 4,
        range: [2010, 2020],
    },
    eyr: {
        digits: 4,
        range: [2020, 2030],
    },
    hgt: {
        range: {
            cm: [150, 193],
            in: [59, 76],
        },
    },
    hcl: {
        start: '#',
        digits: 6,
        element: '0-9a-f',
    },
    ecl: {
        type: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    },
    pid: {
        digits: 9,
    },
    cid: {},
}

const isValidPassport = (passport) => {
    let isValid = true

    if (passport['byr'] !== undefined) {
        isValid = isValid && validator('byr', passport['byr'])
    }
    if (passport['iyr'] !== undefined) {
        isValid = isValid && validator('iyr', passport['iyr'])
    }
    if (passport['eyr'] !== undefined) {
        isValid = isValid && validator('eyr', passport['eyr'])
    }
    if (passport['hgt'] !== undefined) {
        isValid = isValid && validator('hgt', passport['hgt'])
    }
    if (passport['hcl'] !== undefined) {
        isValid = isValid && validator('hcl', passport['hcl'])
    }
    if (passport['ecl'] !== undefined) {
        isValid = isValid && validator('ecl', passport['ecl'])
    }
    if (passport['pid'] !== undefined) {
        isValid = isValid && validator('pid', passport['pid'])
    }

    return isValid
}

const validator = (field, value) => {
    let isValid = false
    let isValidDigits
    let isValidrange

    switch (field) {
        case 'byr':
            isValidDigits = value.length === 4
            isValidrange = value >= 1920 && value <= 2002
            isValid = isValidDigits && isValidrange
            break
        case 'iyr':
            isValidDigits = value.length === 4
            isValidrange = value >= 2010 && value <= 2020
            isValid = isValidDigits && isValidrange
            break
        case 'eyr':
            isValidDigits = value.length === 4
            isValidrange = value >= 2020 && value <= 2030
            isValid = isValidDigits && isValidrange
            break
        case 'hgt':
            let unit = value.match(/(cm)|(in)/) || []
            let height = value.match(/\d+/)[0]
            if (unit[0] === 'cm') {
                isValid = height >= 150 && height <= 193
            } else if (unit[0] === 'in') {
                isValid = height >= 59 && height <= 76
            } else {
                isValid = false
            }
            break
        case 'hcl':
            let isValidStart = value[0] === '#'
            let charArr = value.match(/[a-f0-9]/g) || []
            let isValidChar = charArr.length === 6
            isValid = isValidStart && isValidChar
            break
        case 'ecl':
            let colorArr = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
            isValid = colorArr.includes(value)
            break
        case 'pid':
            isValid = value.length === 9
            break
        default:
            console.log('False type' + rule)
    }

    return isValid
}

module.exports = {
    readPassport,
    includePassportField,
    isValidPassport,
}
