const readMemoryWithMask = (maskAndActionArr, mode = 'location') => {
    let mask = ''
    let memoryMap = {}

    const changeMask = (action) => {
        let value = action.split(' = ')[1]
        mask = value
    }
    const updateMemory = (action) => {
        let [location, value] = action.match(/\d+/g)
        if (mode === 'location') {
            let locationWithFloatMaskArr = updateLocationWithFloatMask(location)

            locationWithFloatMaskArr.forEach((location) => {
                memoryMap[location] = parseInt(value)
            })
        } else if (mode === 'value') {
            let valueWithMask = updateValueWithMask(value)
            memoryMap[location] = valueWithMask
        }
    }
    const updateLocationWithFloatMask = (location) => {
        let bitLocation = turnToBit(location, 36)
        let bitLocationWithFloat = ''
        let xCount = 0
        let updateLocationArr = []

        for (let i = 0; i < mask.length; i++) {
            let backwardIdx = mask.length - 1 - i
            if (mask[backwardIdx] === '0') {
                bitLocationWithFloat += bitLocation[backwardIdx]
            } else if (mask[backwardIdx] === '1') {
                bitLocationWithFloat += '1'
            } else {
                bitLocationWithFloat += 'X'
                xCount++
            }
        }

        for (let count = 0; count < Math.pow(2, xCount); count++) {
            let bitCountArr = turnToBit(count, xCount).split('')
            let updateBitLocation = replaceXWithBit(
                bitLocationWithFloat,
                bitCountArr
            )

            reverseUpdateBitLocation = updateBitLocation
                .split('')
                .reverse()
                .join('')

            let location = turnBitToInt(reverseUpdateBitLocation)
            updateLocationArr.push(location)
        }

        return updateLocationArr
    }

    const replaceXWithBit = (bitLocation, valueArr) => {
        let updateBitLocation = bitLocation

        while (updateBitLocation.includes('X') && valueArr.length > 0) {
            let value = valueArr.shift()
            updateBitLocation = updateBitLocation.replace('X', value)
        }

        return updateBitLocation
    }

    const updateValueWithMask = (value) => {
        let updateBitValue = ''
        let bitValue = turnToBit(value, 36)
        for (let i = 0; i < mask.length; i++) {
            let backwardIdx = mask.length - 1 - i
            if (mask[backwardIdx] === '0') {
                updateBitValue += '0'
            } else if (mask[backwardIdx] === '1') {
                updateBitValue += '1'
            } else {
                updateBitValue += bitValue[backwardIdx]
            }
        }
        let reverseUpdateBitValue = updateBitValue.split('').reverse().join('')

        return turnBitToInt(reverseUpdateBitValue)
    }

    const turnToBit = (value, bits) => {
        let bitValue = ''
        let originValue = parseInt(value).toString(2)

        bitValue = '0'.repeat(bits - originValue.length) + originValue

        return bitValue
    }

    const turnBitToInt = (bitValue) => {
        let ans = 0

        for (let i = 0; i < bitValue.length; i++) {
            ans += Math.pow(2, i) * parseInt(bitValue[bitValue.length - 1 - i])
        }

        return ans
    }

    for (let i = 0; i < maskAndActionArr.length; i++) {
        let type = maskAndActionArr[i].includes('mask') ? 'mask' : 'mem'

        switch (type) {
            case 'mask':
                changeMask(maskAndActionArr[i])
                break
            case 'mem':
                updateMemory(maskAndActionArr[i])
                break
            default:
                console.log('Error type')
        }
    }

    return Object.values(memoryMap).reduce((acc, cur) => acc + cur, 0)
}

module.exports = {
    readMemoryWithMask,
}
