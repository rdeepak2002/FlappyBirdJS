// import images
import { birdMidFlapImage } from "./resources.js";

// player class
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = birdMidFlapImage;
    }

    draw(game) {
        game.ctx.drawImage(this.image, this.x, this.y);
    }
}

export default Player;
