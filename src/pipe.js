// import images
import {topPipeImage, bottomPipeImage, playHitSound, playPointSound, playDieSound} from "./resources.js";

// import collision logic
import { box2dCollision } from "./utils.js";

// player class
class Pipe {
    constructor(x, y, width, height, gap, minY, maxY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.topPipeImage = topPipeImage;
        this.bottomPipeImage = bottomPipeImage;
        this.gap = gap;

        // flag to count score
        this.scoreCounted = false;

        // velocity of left x pixels per second
        this.xVel = -70;

        // bounds to randomly spawn pipe
        this.minY = minY;
        this.maxY = maxY;

        // check for collision
        this.checkCollision = true;

        // randomize the y position
        this.randomizeY();
    }

    checkCollisions(game) {
        // get bounding rectangles of top and bottom pipes
        const totalHeight = this.height * 2 + this.gap;

        const topPipeBoundingRect = {
            x: this.x,
            y: this.y - totalHeight / 2,
            width: this.width,
            height: this.height,
        }

        const bottomPipeBoundingRect = {
            x: this.x,
            y: this.y - totalHeight / 2  + this.height + this.gap,
            width: this.width,
            height: this.height,
        }

        // game over if player collides with pipe
        if(this.checkCollision && (box2dCollision(topPipeBoundingRect, game.player) || box2dCollision(bottomPipeBoundingRect, game.player))) {
            game.state = 'GAME_OVER';
            this.checkCollision = false;
            playHitSound();
            playDieSound();
            console.log('hit pipe');
        }
    }

    update(game) {
        if(game.state === 'PLAYING') {
            // bounding rectangle for collision detection
            this.checkCollisions(game);

            // move pipe to left
            this.x += this.xVel * game.dt;

            // count game score
            if(!this.scoreCounted && this.x + this.width / 2 <= game.player.x + game.player.width / 2) {
                game.score.incrementScore();
                this.scoreCounted = true;
                playPointSound();
            }

            // if the pipe goes off screen, then move it to the right of the screen
            if(this.x < -1 * this.width) {
                this.scoreCounted = false;
                this.x = game.screenWidth + 100;
                this.randomizeY(game);
            }
        }
    }

    draw(game) {
        const totalHeight = this.height * 2 + this.gap;

        game.ctx.drawImage(this.topPipeImage, this.x, this.y - totalHeight / 2);
        game.ctx.drawImage(this.bottomPipeImage, this.x, this.y - totalHeight / 2  + this.height + this.gap);
    }

    randomizeY() {
        this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
    }
}

export default Pipe;
