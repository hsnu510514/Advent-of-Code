const playGame = (cardData, recursive = false) => {
    const [player1Cards, player2Cards] = cardData.split('\n\n').map((player) =>
        player
            .split('\n')
            .slice(1)
            .map((int) => parseInt(int))
    )

    const compareCards = (player1Cards, player2Cards) => {
        let player1Record = {}
        let player2Record = {}
        let winner = 'Player1'

        while (player1Cards.length > 0 && player2Cards.length > 0) {
            let player1Str = player1Cards.join('')
            let player2Str = player2Cards.join('')

            if (player1Record[player1Str] || player2Record[player2Str]) {
                return 'Player1'
            }

            player1Record[player1Str] = true
            player2Record[player2Str] = true

            let player1Card = player1Cards.shift()
            let player2Card = player2Cards.shift()

            if (recursive) {
                let recursiveWinner

                if (
                    player1Cards.length >= player1Card &&
                    player2Cards.length >= player2Card
                ) {
                    recursiveWinner = compareCards(
                        player1Cards.slice(0, player1Card),
                        player2Cards.slice(0, player2Card)
                    )

                    if (recursiveWinner === 'Player1') {
                        player1Cards.push(player1Card, player2Card)
                        continue
                    } else if (recursiveWinner === 'Player2') {
                        player2Cards.push(player2Card, player1Card)
                        continue
                    } else {
                        console.log('Equal')
                        break
                    }
                }
            }

            if (player1Card > player2Card) {
                player1Cards.push(player1Card, player2Card)
            } else if (player1Card < player2Card) {
                player2Cards.push(player2Card, player1Card)
            } else {
                console.log('Equal')
                break
            }
        }

        if (player1Cards.length === 0) {
            winner = 'Player2'
        }

        return winner
    }

    let winner = compareCards(player1Cards, player2Cards)
    let winnerArr = player1Cards.length > 0 ? player1Cards : player2Cards
    let winnerScore = winnerArr.reduce(
        (acc, cur, idx) => acc + cur * (winnerArr.length - idx),
        0
    )

    return [winner, winnerScore]
}

module.exports = {
    playGame,
}
