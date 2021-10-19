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

        // check if jumping
        this.jumping = false;

        // keep track of whether bird is off ground
        this.grounded = false;

        // vertical velocity
        this.velY = 0;

        // jumping speed
        this.jumpSpeed = 150;

        // add key press listener
        document.addEventListener('keyup', this.keyPressListener);
        document.addEventListener('click', this.mousePressListener);
    }

    jump() {
        this.velY = -this.jumpSpeed;

        const wingSound = new Audio();
        wingSound.src = 'resources/wing.ogg';
        wingSound.play();
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
            else if(game.state === 'TITLE_SCREEN') {
                game.state = 'PLAYING';
            }
            else if(game.state === 'GAME_OVER') {
                game.state = 'RESET';
            }

            this.jumping = false;
        }

        if(this.grounded) {
            // if grounded, stop bird from falling through floor
            this.velY = 0;
            this.y = game.groundHeight - this.height;

            // game over cuz on ground
            game.state = 'GAME_OVER';
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
        game.ctx.drawImage(this.image, xCopy, yCopy);

        // restore canvas so other drawn images are not rotated
        game.ctx.restore();
    }
}

export default Player;
