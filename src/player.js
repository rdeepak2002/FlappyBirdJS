// import images
import { birdDownFlapImage, birdMidFlapImage, birdUpFlapImage, playWingSound } from "./resources.js";

// import animated sprite
import { drawAnimatedSprite } from "./utils.js";

// player class
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.images = [birdDownFlapImage, birdMidFlapImage, birdUpFlapImage];

        // check if jumping
        this.jumping = false;

        // keep track of whether bird is off ground
        this.grounded = false;

        // vertical velocity
        this.velY = 0;

        // jumping speed
        this.jumpSpeed = 150;

        // flag for hitting ground
        this.hitGround = false;

        // add key press listener
        document.addEventListener('keyup', this.keyPressListener);
        document.addEventListener('click', this.mousePressListener);
    }

    jump() {
        this.velY = -this.jumpSpeed;
        playWingSound();
    }

    keyPressListener = (e) => {
        const keyListeners = {
            'Space': () => {
                this.jumping = true;
            }
        };

        const fun = keyListeners[e.code];

        if(fun) {
            fun();
        }
    }

    mousePressListener = () => {
        this.jumping = true;
    }

    update(game) {
        // update player's y velocity
        this.y += this.velY * game.dt;

        // check whether the player is grounded (collided with ground)
        this.grounded = this.y + this.height > game.groundHeight;

        // jump if necessary and allowed
        if(this.jumping) {
            if(game.state === 'PLAYING' && this.y - this.height >= 0) {
                this.jump();
            }

            if(game.state === 'TITLE_SCREEN') {
                game.state = 'PLAYING';
            }

            if(game.state === 'GAME_OVER' && this.hitGround) {
                game.state = 'RESET';
            }

            this.jumping = false;
        }

        if(this.grounded) {
            // if grounded, stop bird from falling through floor
            this.velY = 0;

            if(!this.hitGround) {
                // game over cuz hit ground
                game.state = 'GAME_OVER';
                this.hitGround = true;
                console.log('hit ground');
            }
        }
        else {
            // if not grounded, apply gravity on the bird if you are playing
            if(game.state !== 'TITLE_SCREEN') {
                this.velY += game.gravity * game.dt;
            }
        }
    }

    draw(game) {
        // rotate
        game.ctx.save();

        const xCopy = this.x;
        const yCopy = this.y;

        const centerXCopy = this.x + this.width / 2;
        const centerYCopy = this.y + this.height / 2;

        // convert velocity to rotation
        const minVelY = -this.jumpSpeed;
        const maxVelY = 300;

        const velRangeMag = Math.abs(minVelY) + Math.abs(maxVelY);
        let degreesToRotate = ( this.velY / velRangeMag ) * 180;

        if(degreesToRotate > 40) {
            degreesToRotate = 40;
        }
        else if(degreesToRotate < -30) {
            degreesToRotate = -30;
        }

        game.ctx.translate(centerXCopy, centerYCopy);
        game.ctx.rotate(degreesToRotate * Math.PI / 180);
        game.ctx.translate(-centerXCopy, -centerYCopy);

        // draw
        if(game.state === 'GAME_OVER') {
            game.ctx.drawImage(this.images[1], xCopy, yCopy);
        }
        else {
            drawAnimatedSprite(game, this.images, this.x, this.y, this.width, this.height);
        }

        // restore canvas so other drawn images are not rotated
        game.ctx.restore();
    }
}

export default Player;
