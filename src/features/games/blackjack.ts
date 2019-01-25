import { Card, CardNumber } from "./decks/french-deck"
import { BlackjackDeck } from "./decks/blackjack-deck"
var logging = require("../logging/logging.ts").label("blackjack").level('debug').get();

class Game {
    status: BlackjackStatus = BlackjackStatus.FIRST_ROUND;
    dealerHand: Hand;
    userHand: Hand;
    deck: BlackjackDeck;

    play(previousGame, message): any {

        if (!previousGame) {
            return this.start(message);
        }
        return this.resume(previousGame, message);
    }

    start(message) {
        logging.debug("Starting blackjack");
        this.deck = new BlackjackDeck(4);
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
        let response = this.getNormalResponse(message);
        console.log(response);
        this.updateStatus();

        return this.saveWithResponse(response);
    }

    saveWithResponse(response) {
        let save = {};
        save["deck"] = this.deck
        save["dealerHand"] = this.dealerHand
        save["userHand"] = this.userHand
        save["status"] = this.status
        save["response"] = response
        return save
    }

    getNormalResponse(message) {
        let response = "<@" + message.author.id + ">";
        response += "\nYour hand: ";

        this.userHand.cards.forEach((card) => {
            response += card.number.name + ", ";
        });

        response += "\nYour score: " + this.userHand.score();
        response += "\nThe dealer shows: " + this.dealerHand.cards[0].number.name;

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
    static calculate(cards: Card[]): number {

        let number_of_aces: number = cards.filter(card => card.number === CardNumber.ACE).length;

        let score: number;
        score = cards.reduce((sum, card) => sum + card.value[0], 0);
        score += (10 * number_of_aces);
        if (score > 21) {
            for (let i = 0; i < number_of_aces; i++) {
                score -= 10
                if (score < 22) {
                    break
                }
            }
        }

        return score;
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


var temp = {}

module.exports = {
    process(message) {
        let game;
        if (temp[message.author.id]) {
            game = new Game().resume(temp[message.author.id], message);
            if (game.status == BlackjackStatus.END_GAME) {
                temp[message.author.id] = null;
            }
        } else {
            game = new Game().play(null, message);
            temp[message.author.id] = game;
        }
        message.channel.send(game.response);
    }
}



