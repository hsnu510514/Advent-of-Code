const readIngredient = (ingredientData) => {
    const ingredientAllergenArr = ingredientData
        .split('\n')
        .map((ingredientAllergen) => {
            const ingredientArr = ingredientAllergen
                .match(/.+(?=\()/)[0]
                .match(/\w+/g)
            const allergenArr = ingredientAllergen
                .match(/(?<=\().+(?=\))/)[0]
                .replace(/(contains|,)/g, '')
                .match(/\w+/g)

            return { ingredient: ingredientArr, allergen: allergenArr }
        })
    return ingredientAllergenArr
}

const testIngredient = (ingredientAllergenArr) => {
    let ingredientMap = {}
    let allergenMap = {}
    let algToPossibleIngMap = {}
    let algToIngMap = {}

    const countIngredientAndAllergen = () => {
        ingredientAllergenArr.forEach(({ ingredient, allergen }) => {
            ingredient.forEach((ing) => {
                ingredientMap[ing]
                    ? (ingredientMap[ing] += 1)
                    : (ingredientMap[ing] = 1)
            })
            allergen.forEach((alg) => {
                allergenMap[alg]
                    ? (allergenMap[alg] += 1)
                    : (allergenMap[alg] = 1)
            })
        })
    }

    const createAlgToIngMap = () => {
        Object.keys(allergenMap).forEach((key) => {
            ingredientAllergenArr.forEach(({ ingredient, allergen }) => {
                if (allergen.includes(key)) {
                    if (algToPossibleIngMap[key]) {
                        algToPossibleIngMap[key] = algToPossibleIngMap[
                            key
                        ].filter((ing) => ingredient.includes(ing))
                    } else {
                        algToPossibleIngMap[key] = ingredient
                    }
                }
            })
        })
    }

    const allocateAlgToIng = (algToPossibleIngMap) => {
        let allocatedIng = []

        while (
            Object.keys(algToIngMap).length <
            Object.keys(algToPossibleIngMap).length
        ) {
            for (let key in algToPossibleIngMap) {
                if (algToPossibleIngMap[key].length === 1) {
                    algToIngMap[key] = algToPossibleIngMap[key][0]
                    allocatedIng.push(algToPossibleIngMap[key][0])
                } else {
                    algToPossibleIngMap[key] = algToPossibleIngMap[key].filter(
                        (ing) => !allocatedIng.includes(ing)
                    )
                }
            }
        }
    }

    const countNoAlgIng = () => {
        let count = Object.keys(ingredientMap).reduce((count, key) => {
            if (!Object.values(algToIngMap).includes(key)) {
                return count + ingredientMap[key]
            } else {
                return count
            }
        }, 0)

        return count
    }

    countIngredientAndAllergen()
    createAlgToIngMap()
    allocateAlgToIng(algToPossibleIngMap)

    let noAlgIngAppearance = countNoAlgIng()
    let dangerousIngList = Object.keys(algToIngMap)
        .sort((a, b) => sortByAlphabetical(a, b))
        .map((key) => algToIngMap[key])
        .join(',')

    console.log('No allergen Ingredient appearance: ', noAlgIngAppearance)
    console.log('Canonical dangerous ingredient list: ', dangerousIngList)

    return dangerousIngList
}

const sortByAlphabetical = (a, b) => {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i].charCodeAt() > b[i].charCodeAt()) {
            return 1
        } else if (a[i].charCodeAt() < b[i].charCodeAt()) {
            return -1
        }
    }
}

module.exports = {
    readIngredient,
    testIngredient,
}
