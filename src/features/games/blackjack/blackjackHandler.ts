var logging = require("../../logging/logging.ts").logging;

class Hand {
    cards: Card[] = [];

    push = (card: Card) => {
        this.cards.push(card);
    }

    score = () => {
        let _score = 0;
        this.cards.forEach((card) => {
            let values = card.number.values;
            _score += values[0];
        });
        if (_score > 21) {
            this.cards.forEach((card) => {
                if (card.number.id == 1) {
                    _score -= 10;
                }
                if (_score <= 21) {
                    return;
                }
            });
        }
        return _score;
    }
}

interface Hands {
    dealerHand: Hand;
    userHand: Hand;
}

interface CardNumber {
    id: number;
    name: string;
    values: number[];

}

function build_number(id, name, values): CardNumber {
    return ({
        id,
        name,
        values
    });
}

var numbers = [
    build_number(1, "Ace", [1, 11]),
    build_number(2, "2", [2]),
    build_number(3, "3", [3]),
    build_number(4, "4", [4]),
    build_number(5, "5", [5]),
    build_number(6, "6", [6]),
    build_number(7, "7", [7]),
    build_number(8, "8", [8]),
    build_number(9, "9", [9]),
    build_number(10, "10", [10]),
    build_number(11, "Jack", [10]),
    build_number(12, "Queen", [10]),
    build_number(13, "King", [10])
]

class Card {
    constructor(public number) { }
}



class Deck {
    deck_size = 10;
    deck: Card[] = [];

    initialize_deck = () => {
        logging.debug("blackjack - initalizing deck");
        Array(this.deck_size).fill(0).forEach(() =>
            numbers.forEach(number =>
                this.deck.push(new Card(number))));
        console.log(this.deck);
        logging.debug("blackjack - deck initialized");
    }

    /*
       Copied from: https://stackoverflow.com/a/12646864/8250538
    */
    shuffle = () => {
        logging.debug("blackjack - shuffling deck");
        console.log(this.deck);
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        console.log(this.deck);
        logging.debug("blackjack - deck shuffled");
    }

    pop_card = () => {
        logging.debug("blackjack - poping card");
        console.log(this.deck);
        let card = this.deck.shift();
        console.log(card);
        return card;
    }



    distribute_initial_cards: () => Hands = () => {
        logging.debug("blackjack - initializating hands");
        let dealerHand = new Hand();
        let userHand = new Hand();
        dealerHand.push(this.pop_card());
        userHand.push(this.pop_card());
        dealerHand.push(this.pop_card());
        userHand.push(this.pop_card());
        logging.debug("blackjack - hands initialized");
        return {
            dealerHand,
            userHand
        }
    }


}
var round = 1;
module.exports = {
    process: (message) => {
        let deck = new Deck();
        deck.initialize_deck();
        deck.shuffle();
        let hands = deck.distribute_initial_cards();
        let mentionUser = "<@" + message.author.id + ">";
        let options = ["hit", "stay"]
        if (round == 1) {
            options.push("or double")
        }
        let response = options;


        message.channel.send(response);
    }
}