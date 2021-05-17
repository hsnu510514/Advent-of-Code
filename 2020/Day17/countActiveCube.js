const countActiveCube = (initialCubeState, cycles, hypercube = false) => {
    const initXLength = initialCubeState[0].length
    const initYLength = initialCubeState.length

    const expansion = 4 * cycles
    const setupXLength = initXLength + expansion
    const setupYLength = initYLength + expansion
    const setupZLength = expansion + 1
    const setupWLength = expansion + 1

    let pocketDimension

    const buildPocketDimension = () => {
        let cleanPocketDimension = []

        if (hypercube) {
            for (let w = 0; w < setupWLength; w++) {
                let hypercube = []
                for (let z = 0; z < setupZLength; z++) {
                    let surface = []
                    for (let y = 0; y < setupYLength; y++) {
                        let row = []
                        for (let x = 0; x < setupXLength; x++) {
                            row.push('.')
                        }
                        surface.push(row)
                    }
                    hypercube.push(surface)
                }
                cleanPocketDimension.push(hypercube)
            }
        } else {
            for (let z = 0; z < setupZLength; z++) {
                let surface = []
                for (let y = 0; y < setupYLength; y++) {
                    let row = []
                    for (let x = 0; x < setupXLength; x++) {
                        row.push('.')
                    }
                    surface.push(row)
                }
                cleanPocketDimension.push(surface)
            }
        }

        pocketDimension = cleanPocketDimension
    }

    const initSurface = (initialState) => {
        let surface
        let offset = Math.ceil(expansion / 2)

        if (hypercube) {
            surface =
                pocketDimension[Math.floor((setupZLength + 1) / 2) - 1][
                    Math.floor((setupZLength + 1) / 2) - 1
                ]
            for (let i = 0; i < initialState.length; i++) {
                for (let j = 0; j < initialState[0].length; j++) {
                    if (initialCubeState[i][j]) {
                        surface[offset + i][offset + j] = initialCubeState[i][j]
                    }
                }
            }
        } else {
            surface = pocketDimension[Math.floor((setupZLength + 1) / 2) - 1]
            for (let i = 0; i < initialState.length; i++) {
                for (let j = 0; j < initialState[0].length; j++) {
                    if (initialCubeState[i][j]) {
                        surface[offset + i][offset + j] = initialCubeState[i][j]
                    }
                }
            }
        }
    }

    const runCycle = (cycles) => {
        let i = 0
        while (i < cycles) {
            updatePocketDimension()
            i++
        }
    }

    const updatePocketDimension = () => {
        let updatePocketDimension = []

        if (hypercube) {
            for (let w = 0; w < setupWLength; w++) {
                let hypercube = []
                for (let z = 0; z < setupZLength; z++) {
                    let surface = []
                    for (let y = 0; y < setupYLength; y++) {
                        let row = []
                        for (let x = 0; x < setupXLength; x++) {
                            row.push(updateState(x, y, z, w))
                        }
                        surface.push(row)
                    }
                    hypercube.push(surface)
                }
                updatePocketDimension.push(hypercube)
            }
        } else {
            for (let z = 0; z < setupZLength; z++) {
                let surface = []
                for (let y = 0; y < setupYLength; y++) {
                    let row = []
                    for (let x = 0; x < setupXLength; x++) {
                        row.push(updateState(x, y, z))
                    }
                    surface.push(row)
                }
                updatePocketDimension.push(surface)
            }
        }

        pocketDimension = updatePocketDimension
    }

    const updateState = (x, y, z, w) => {
        let active = 0
        let updateState

        if (hypercube) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    for (let k = -1; k < 2; k++) {
                        for (let l = -1; l < 2; l++) {
                            if (i === 0 && j === 0 && k === 0 && l === 0)
                                continue
                            if (x + i < 0 || x + i >= setupXLength) continue
                            if (y + j < 0 || y + j >= setupYLength) continue
                            if (z + k < 0 || z + k >= setupZLength) continue
                            if (w + l < 0 || w + l >= setupWLength) continue
                            if (
                                pocketDimension[w + l][z + k][y + j][x + i] ===
                                '#'
                            )
                                active++
                        }
                    }
                }
            }
            if (pocketDimension[w][z][y][x] === '#') {
                if (active === 2 || active === 3) {
                    updateState = '#'
                } else {
                    updateState = '.'
                }
            } else {
                if (active === 3) {
                    updateState = '#'
                } else {
                    updateState = '.'
                }
            }
        } else {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    for (let k = -1; k < 2; k++) {
                        if (i === 0 && j === 0 && k === 0) continue
                        if (x + i < 0 || x + i >= setupXLength) continue
                        if (y + j < 0 || y + j >= setupYLength) continue
                        if (z + k < 0 || z + k >= setupZLength) continue
                        if (pocketDimension[z + k][y + j][x + i] === '#')
                            active++
                    }
                }
            }
            if (pocketDimension[z][y][x] === '#') {
                if (active === 2 || active === 3) {
                    updateState = '#'
                } else {
                    updateState = '.'
                }
            } else {
                if (active === 3) {
                    updateState = '#'
                } else {
                    updateState = '.'
                }
            }
        }

        return updateState
    }

    const countActive = () => {
        let count = 0

        if (hypercube) {
            for (let i = 0; i < setupXLength; i++) {
                for (let j = 0; j < setupYLength; j++) {
                    for (let k = 0; k < setupZLength; k++) {
                        for (let l = 0; l < setupWLength; l++)
                            if (pocketDimension[l][k][j][i] === '#') count++
                    }
                }
            }
        } else {
            for (let i = 0; i < setupXLength; i++) {
                for (let j = 0; j < setupYLength; j++) {
                    for (let k = 0; k < setupZLength; k++) {
                        if (pocketDimension[k][j][i] === '#') count++
                    }
                }
            }
        }

        return count
    }
    buildPocketDimension(setupXLength, setupYLength, setupZLength)
    // console.log(pocketDimension)

    initSurface(initialCubeState)
    // console.log(pocketDimension)

    runCycle(cycles)
    // console.log(pocketDimension)

    let activeCount = countActive()
    // console.log(activeCount)

    return activeCount
}

module.exports = {
    countActiveCube,
}
