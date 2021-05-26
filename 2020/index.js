const fs = require('fs')
// const { findThreeFactor } = require('./Day1/findFactor.js');
// const { readPW, testPW } = require('./Day2/testPW.js');
// const { countTree, testTreeMap } = require('./Day3/countTree.js');
// const { readPassport, includePassportField, isValidPassport } = require('./Day4/testPassport.js');
// const { findSeatId, findLastSeat } = require('./Day5/findSeatId.js');
// const { countQuestionType, countQuestionType2 } = require('./Day6/countQuestionType.js');
// const { readBagData, findBag, countBags } = require('./Day7/day7.js');
// const { findAccumulator, autoFixAction } = require('./Day8/findAccumulator.js');
// const { findXMAWeakness, findEncryptionWeakness } = require('./Day9/findXMASWeakness.js');
// const { countJoltDifference, countArrangement } = require('./Day10/countJoltDifference.js');
// const { calculateSeat } = require('./Day11/calculateSeat.js');
// const {
//     calculateDistance,
//     moveByWaypoint,
// } = require('./Day12/calculateDistance.js')
// const {
//     findClosestBus,
//     findMatchingTimeStamp,
//     minTimestampOfTwoBus,
//     minTimestampOfTwoTimestamp,
//     findGCD,
// } = require('./Day13/findClosestBus.js')
// const { readMemoryWithMask } = require('./Day14/readMemoryWithMask.js')
// const { answerOfMemoryGame } = require('./Day15/answerOfMemoryGame.js')
// const {
//     validateTicket,
//     findFieldSequence,
//     allocateField,
//     getMultiplied,
// } = require('./Day16/validateTicket.js')
// const { countActiveCube } = require('./Day17/countActiveCube.js')
// const { sumOfTheHomework } = require('./Day18/sumOfTheHomework.js')
// const { findValidMessage } = require('./Day19/findValidMessage.js')
// const { readPuzzle, combinePuzzle, countHash } = require('./Day20/puzzle.js')
// const { readIngredient, testIngredient } = require('./Day21/testIngredient')
const { playGame } = require('./Day22/game')
const { cupGame } = require('./Day23/cupGame.js')

let fakeData = fs.readFileSync('../fakeData.txt', 'utf8')
// let day1Data = fs.readFileSync('./Day1/data.txt', 'utf8');
// let day2Data = fs.readFileSync('./Day2/data.txt', 'utf8');
// let day3Data = fs.readFileSync('./Day3/data.txt', 'utf8');
// let day4Data = fs.readFileSync('./Day4/data.txt', 'utf8');
// let day5Data = fs.readFileSync('./Day5/data.txt', 'utf-8');
// let day6Data = fs.readFileSync('./Day6/data.txt', 'utf-8');
// let day7Data = fs.readFileSync('./Day7/data.txt', 'utf-8');
// let day8Data = fs.readFileSync('./Day8/data.txt', 'utf-8');
// let day9Data = fs.readFileSync('./Day9/data.txt', 'utf-8');
// let day10Data = fs.readFileSync('./Day10/data.txt', 'utf-8');
// let day11Data = fs.readFileSync('./Day11/data.txt', 'utf-8');
// const day12Data = fs.readFileSync('./Day12/data.txt', 'utf-8')
// const day13Data = fs.readFileSync('./Day13/data.txt', 'utf-8')
// const day14Data = fs.readFileSync('./Day14/data.txt', 'utf-8')
// const day15Data = fs.readFileSync('./Day15/data.txt', 'utf-8')
// const day16Data = fs.readFileSync('./Day16/data.txt', 'utf-8')
// const day17Data = fs.readFileSync('./Day17/data.txt', 'utf-8')
// const day18Data = fs.readFileSync('./Day18/data.txt', 'utf-8')
// const day19Data = fs.readFileSync('./Day19/data.txt', 'utf-8')
// const day20Data = fs.readFileSync('./Day20/data.txt', 'utf-8')
// const day21Data = fs.readFileSync('./Day21/data.txt', 'utf-8')
const day22Data = fs.readFileSync('./Day22/data.txt', 'utf-8')

// Day 1
// let sortedDataArr = day1Data.split('\n').sort((a,b)=> a-b);
// let factors = findThreeFactor(sortedDataArr, 2020);
// let ans = factors.reduce((acc, cur)=> acc * cur, 1);

// console.log("Day1:" + ans)

// Day 2
// let PWArr = readPW(day2Data);

// console.log("Day2:" + testPW(PWArr));

// Day 3
// let treeMap = day3Data.split('\n');

// console.log(testTreeMap(treeMap, 3, 1));
// console.log(countTree(treeMap, 3, 1));
// console.log('Day3:' + countTree(treeMap, 1, 1) * countTree(treeMap, 3, 1) * countTree(treeMap, 5, 1) * countTree(treeMap, 7, 1) * countTree(treeMap, 1, 2))

// Day 4
// let passportArr = readPassport(day4Data);

// let validPassportArr = includePassportField(passportArr, 'cid');

// console.log(validPassportArr.filter(passport => isValidPassport(passport)).length);

// Day 5
// let seatArr = day5Data.split('\n');
// let seatIdMap = findSeatId(seatArr);

// console.log(Math.max(...Object.values(seatIdMap)));
// console.log(findLastSeat(seatIdMap));

// Day 6
// let questionGroup = day6Data.split('\n\n').map(group => group.split('\n'));

// console.log("Sum of group's question type: " + countQuestionType(questionGroup).reduce((acc, cur) => acc + cur));
// let type2Question = countQuestionType2(questionGroup).reduce((acc, cur) => acc + cur.length, 0)
// console.log("Sum of group's question type2: " + type2Question);

// Day 7
// let bagMap = readBagData(day7Data.split('\n'));
// console.log(bagMap['shiny gold bag']);
// console.log('Bags contain shiny gold bag: ', findBag('shiny gold bag', bagMap).length);
// total bag "in" shiny gold bags => countBags - 1
// console.log('Total Bags in shiny gold bag: ', countBags('shiny gold bag', bagMap-1));

// Day 8
// let actionData = day8Data.split('\n');
// // console.log('Accumulator before infinite loop: ', findAccumulator(actionData));
// console.log('Auto fix infinite loop: ', autoFixAction(actionData));

// Day 9
// let xmasArr = day9Data.split('\n');

// console.log('First weakness number: ', findXMAWeakness(xmasArr));
// console.log('Encryption weakness: ', findEncryptionWeakness(xmasArr, findXMASWeakness(xmasArr)));
// console.log('Encryption weakness: ', findEncryptionWeakness(xmasArr, findXMASWeakness(xmasArr)));

// Day 10
// let adapterArr = day10Data.split('\n');

// console.log('Multiplied number: ', countJoltDifference(adapterArr, [1, 2, 3],[1, 3]))
// console.log('Possible arrangements: ', countArrangement(adapterArr));

// Day 11
// let seatArr = day11Data.split('\n');
// console.log(seatArr);

// console.log('Final seat amount: ', CalculateSeat(seatArr, 5))

// Day 12
// const directionArr = day12Data.split('\n')

// console.log('Manhattan distance: ', calculateDistance(directionArr))

// console.log(
//     'Manhattan distance(Move by waypoint): ',
//     moveByWaypoint(directionArr)
// )
// Day 13
// const busData = day13Data.split('\n')

// console.log('Closest Bus: ', findClosestBus(busData))
// console.log('Timestamp: ', findMatchingTimeStamp(busData))

// Day 14
// let maskActionArr = day14Data.split('\n')

// console.log(readMemoryWithMask(maskActionArr, 'value'))
// console.log(readMemoryWithMask(maskActionArr))

// Day 15
// let startNumberArr = day15Data.split(',')

// console.log('2020th number spoken: ', answerOfMemoryGame(startNumberArr, 2020))
// console.log(
//     '30000000th number spoken: ',
//     answerOfMemoryGame(startNumberArr, 30000000)
// )
// !!Consume too much time

// Day 16
// const [ticketTemplate, myTicket, nearbyTicket] = day16Data.split('\n\n')
// // const [ticketTemplate, myTicket, nearbyTicket] = fakeData.split('\n\n')
// const [ticketScanningError, validTicketArr] = validateTicket(
//     ticketTemplate,
//     nearbyTicket
// )
// const fieldSequence = findFieldSequence(ticketTemplate, validTicketArr)
// console.log('Ticket scanning error rate: ', ticketScanningError)
// // console.log('Ticket field sequence: ', fieldSequence)
// const allocateFieldArr = allocateField(ticketTemplate, fieldSequence)
// console.log('Field sequence: ', allocateFieldArr)
// console.log(
//     'Get the  "Departure field" Multiplied: ',
//     getMultiplied(myTicket, allocateFieldArr)
// )

// Day 17
// const initialCubeState = day17Data.split('\n').map((row) => row.split(''))
// const fakeCubeState = fakeData.split('\n').map((row) => row.split(''))
// // console.log(
// //     'Active cubes after 6 cycle: ',
// //     countActiveCube(initialCubeState, 6)
// // )
// console.log(
//     'Active cubes after 6 cycle: ',
//     countActiveCube(initialCubeState, 6, true)
// )

// Day 18

// console.log('Sum of the homework: ', sumOfTheHomework(fakeData, 'addition'))
// console.log('Sum of the homework: ', sumOfTheHomework(day18Data))
// console.log(
//     'Sum of the homework(addition first): ',
//     sumOfTheHomework(day18Data, 'addition')
// )

// Day 19
// console.log(
//     'Number of valid message: ',
//     findValidMessage(fakeData, {
//         8: ['42', '42 8'],
//         11: ['42 31', '42 11 31'],
//     })
// )
// console.log('Number of valid message: ', findValidMessage(day19Data))
// console.log(
//     'Number of valid message(update rules): ',
//     findValidMessage(day19Data, {
//         8: ['42', '42 8'],
//         11: ['42 31', '42 11 31'],
//     })
// )

// Day 20
// const organizedPuzzleDate = readPuzzle(day20Data)
// const organizedPuzzleDate = readPuzzle(fakeData)

// const completePicture = combinePuzzle(organizedPuzzleDate[0])
// const monster = organizedPuzzleDate[1]

// console.log(
//     '# not part of a sea monster: ',
//     countHash(completePicture, monster)
// )

// Day 21
// const ingredientAllergenArr = readIngredient(fakeData)
// const ingredientAllergenArr = readIngredient(day21Data)
// console.log(testIngredient(ingredientAllergenArr))

// Day 22
// console.log(playGame(fakeData, true))
// console.log('Regular Combat: ', playGame(day22Data))
// console.log('Recursive Combat: ', playGame(day22Data, true))

// Day 23
// console.log(
//     'Labels on the cups after cup 1: ',
//     cupGame('389125467', 10000000, true)
// )
console.log(
    'Labels on the cups after cup 1: ',
    cupGame('318946572', 10000000, true)
)
