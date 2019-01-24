export abstract class Deck {
    cards: Card[] = [];

    constructor(numberOfDecks: number) {
        //create 'size' decks
        CardSuit.values().forEach((cardSuit) => {
            CardNumber.values().forEach((cardNumber) => {
                this.cards.push(new Card(cardNumber, cardSuit, this.getCardValue(cardSuit, cardNumber)));
            });
        });
    }

    abstract getCardValue(cardSuit: CardSuit, cardNumber: CardNumber): any;

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



export class CardNumber {
    constructor(public id: number, public name: String) { }

    static ACE = new CardNumber(1, "Ace");
    static TWO = new CardNumber(2, "2");
    static THREE = new CardNumber(3, "3");
    static FOUR = new CardNumber(4, "4");
    static FIVE = new CardNumber(5, "5");
    static SIX = new CardNumber(6, "6");
    static SEVEN = new CardNumber(7, "7");
    static EIGHT = new CardNumber(8, "8");
    static NINE = new CardNumber(9, "9");
    static TEN = new CardNumber(10, "10");
    static JACK = new CardNumber(11, "Jack");
    static QUEEN = new CardNumber(12, "Queen");
    static KING = new CardNumber(13, "King");

    static values() {
        const values = [];
        Object.keys(this).forEach((value) => values.push(this[value]));
        return values;
    }
}

export class CardSuit {
    constructor(public id: Number, public name: String) { }

    static CLUB = new CardSuit(1, "Club");
    static HEART = new CardSuit(2, "Heart");
    static DIAMOND = new CardSuit(3, "Diamond");
    static SPADE = new CardSuit(4, "Spade");

    static values() {
        const values = [];
        Object.keys(this).forEach((value) => values.push(this[value]));
        return values;
    }
}