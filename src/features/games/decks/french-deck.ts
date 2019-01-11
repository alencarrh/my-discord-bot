export class Deck {
    cards: Card[] = [];

    constructor(numberOfDecks: number) {
        //create 'size' decks
        CardSuit.values().forEach((cardSuit) => {
            CardNumber.values().forEach((cardNumber) => {
                //const value = blackjackHandler(cardSuit, cardNumber);
                //TODO get the value
                this.cards.push(new Card(cardNumber, cardSuit, null));
            });
        });
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    popCard() {
        return this.cards.shift();
    }
}

export class Card {
    constructor(public number: CardNumber, public suit: CardSuit, public value) { }
}



class CardNumber {
    static ACE = "Ace";
    static TWO = "2";
    static THREE = "3";
    static FOUR = "4";
    static FIVE = "5";
    static SIX = "6";
    static SEVEN = "7";
    static EIGHT = "8";
    static NINE = "9";
    static TEN = "10";
    static JACK = "Jack";
    static QUEEN = "Queen";
    static KING = "King";

    static values() {
        const values = [];
        Object.keys(this).forEach((value) => values.push(this[value]));
        return values;
    }
}

class CardSuit {
    static CLUB = "Club";
    static HEART = "Heart";
    static DIAMOND = "Diamond";
    static SPADE = "Spade";

    static values() {
        const values = [];
        Object.keys(this).forEach((value) => values.push(this[value]));
        return values;
    }
}