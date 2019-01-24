import { Deck, CardSuit, CardNumber } from "./french-deck"

var values: { [key: number]: number[] } = {};
values[CardNumber.ACE.id] = [1];
values[CardNumber.TWO.id] = [2];
values[CardNumber.THREE.id] = [3];
values[CardNumber.FOUR.id] = [4];
values[CardNumber.FIVE.id] = [5];
values[CardNumber.SIX.id] = [6];
values[CardNumber.SEVEN.id] = [7];
values[CardNumber.EIGHT.id] = [8];
values[CardNumber.NINE.id] = [9];
values[CardNumber.TEN.id] = [10];
values[CardNumber.JACK.id] = [10];
values[CardNumber.QUEEN.id] = [10];
values[CardNumber.KING.id] = [10];


export class BlackjackDeck extends Deck {

    getCardValue(cardSuit: CardSuit, cardNumber: CardNumber): any {
        //cardsuit doesn't matter for blackjack
        return values[cardNumber.id];
    };

}

