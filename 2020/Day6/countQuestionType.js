const countQuestionType = (groupQuestionArr) => {
    let allAnswerQuestionArr = groupQuestionArr.map((groupQuestion) => {
        let allQuestion = groupQuestion.join('').split('')
        let questionSet = new Set(allQuestion)
        return questionSet.size
    })
    return allAnswerQuestionArr
}

const countQuestionType2 = (groupQuestionArr) => {
    let allAnswerQuestionArr = groupQuestionArr.map((groupQuestion) => {
        let questionMap = {}
        let allAnswerQuestion = []

        groupQuestion.forEach((customerQuestion) => {
            customerQuestion.split('').forEach((question) => {
                if (questionMap[question]) {
                    questionMap[question]++
                } else {
                    questionMap[question] = 1
                }
            })
        })

        Object.keys(questionMap).forEach((key) => {
            if (questionMap[key] === groupQuestion.length) {
                allAnswerQuestion.push(key)
            }
        })
        return allAnswerQuestion
    })

    return allAnswerQuestionArr
}

module.exports = {
    countQuestionType,
    countQuestionType2,
}
