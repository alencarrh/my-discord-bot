import { Deck, Card } from "./decks/french-deck"
var logging = require("../logging/logging.ts").label("blackjack").level('debug').get();

class Game {
    status: BlackjackStatus = BlackjackStatus.FIRST_ROUND;
    dealerHand: Hand;
    userHand: Hand;
    deck: Deck;

    play(previousGame, message) {

        if (!previousGame) {
            return this.start(message);
        }
        return this.resume(previousGame, message);
    }

    start(message) {
        logging.debug("Starting blackjack");
        this.deck = new Deck(4);
        this.distributeCards();
        return this.processMessage(message);
    }

    resume(previousGame, message) {
        logging.debug("Resuming blackjack");
        this.deck = previousGame.deck;
        this.dealerHand = previousGame.dealerHand;
        this.userHand = previousGame.userHand;
        this.status = previousGame.status;
        return this.processMessage(message);
    }

    processMessage(message) {
        this.updateStatus();
        let response = this.getNormalResponse(message);
        console.log(response);
        return response;
    }

    getNormalResponse(message) {
        let response = "<@" + message.author.id + ">";
        response += "\nYour hand: ";

        this.userHand.cards.forEach((card) => {
            response += card.number + ", ";
        });

        response += "\nYour score: " + this.userHand.score();
        response += "\nThe dealer shows: " + this.dealerHand.cards[0].number;

        if (this.status === BlackjackStatus.FIRST_ROUND) {
            response += "\nHit, stay or double?";
        } else {
            response += "\nHit or stay?";
        }

        return response;
    }

    updateStatus() {
        if (this.status == BlackjackStatus.FIRST_ROUND) {
            this.status = BlackjackStatus.MIDDLE_ROUNDS;
        }

        if (this.userHand.score() >= 21 && this.status == BlackjackStatus.MIDDLE_ROUNDS) {
            this.status = BlackjackStatus.END_GAME;
        }
    }

    distributeCards() {
        this.dealerHand = new Hand();
        this.userHand = new Hand();
        this.deck.shuffle();
        this.dealerHand.addCard(this.deck.popCard());
        this.userHand.addCard(this.deck.popCard());
        this.dealerHand.addCard(this.deck.popCard());
        this.userHand.addCard(this.deck.popCard());
    }

}

class BlackjackStatus {
    static FIRST_ROUND = 1;
    static MIDDLE_ROUNDS = 2;
    static END_GAME = 3;
}

class BlackjackMode {
    static HIT_17 = 1;
    static STAY_17 = 2;
}

class Score {
    static calculate(cards: Card[]) {
        // TODO
        return 0;
    }
}

class Hand {
    cards: Card[] = [];

    addCard(card: Card) {
        this.cards.push(card);
    }

    score() {
        return Score.calculate(this.cards);
    }
}


module.exports = {
    process(message) {
        let result = new Game().play(null, message);
        message.channel.send(result);
    }
}



