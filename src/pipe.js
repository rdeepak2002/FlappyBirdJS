// import images
import { topPipeImage, bottomPipeImage } from "./resources.js";

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

        // velocity of left x pixels per second
        this.xVel = -70;

        // bounds to randomly spawn pipe
        this.minY = minY;
        this.maxY = maxY;

        // randomize the y position
        this.randomizeY();
    }

    update(game) {
        if(game.state === 'PLAYING') {
            // move pipe to left
            this.x += this.xVel * game.dt;

            // if the pipe goes off screen, then move it to the right of the screen
            if(this.x < -1 * this.width) {
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
