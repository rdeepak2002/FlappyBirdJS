// import images
import { baseImage } from "./resources.js";

// player class
class Floor {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = baseImage;

        // velocity of left x pixels per second
        this.xVel = -70;
    }

    update(game) {
        // move floor to left
        this.x += this.xVel * game.dt;

        // if the floor goes off screen, then move it to the right of the screen
        if(this.x < -1 * this.width) {
            this.x = game.screenWidth;
        }
    }

    draw(game) {
        game.ctx.drawImage(this.image, this.x, this.y);
    }
}

export default Floor;
