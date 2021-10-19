import { scoreImages } from './resources.js';

class Score {
    constructor() {
        this.padding = 3;
        this.scoreDigitWidth = 24;
        this.score = 0;
    }

    incrementScore() {
        this.score++;
    }

    update(game) {
        if(this.score > 99) {
            this.score = 99;
        }
    }

    draw(game) {
        const digit1 = this.score / 10;
        const digit2 = this.score % 10;

        const xPos = game.screenWidth / 2 - (this.scoreDigitWidth * 2 + this.padding) / 2;

        game.ctx.drawImage(scoreImages[digit1], xPos, 20);
        game.ctx.drawImage(scoreImages[digit2], xPos + this.padding + this.scoreDigitWidth, 20);
    }
}

export default Score;
