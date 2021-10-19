// import player, floor, and pipe
import Player from './player.js';
import Pipe from './pipe.js';
import Floor from './floor.js';
import Score from './score.js';

// import images
import { backgroundImage, titleScreenImage, gameOverImage } from "./resources.js";

// get the HTML canvas element
const canvas = document.getElementById('canvas');

const screenWidth = 288;
const screenHeight = 512;

canvas.width = screenWidth;
canvas.height = screenHeight;

// ctx is used for drawing onto the canvas
const ctx = canvas.getContext('2d');

// object to store current state of the game
let game = undefined;

// function to reset the state of the game
const resetGame = () => {
    game = {
        state: 'TITLE_SCREEN',
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        ctx: ctx,
        dt: 0,
        lastUpdated: 0,
        background: backgroundImage,
        player: new Player(screenWidth / 2 - 70, screenHeight / 2, 34, 24),
        pipes: [new Pipe(screenWidth + 100, screenHeight / 2, 52, 320, 100, 100, screenHeight - 200), new Pipe(screenWidth + 300, screenHeight / 2, 52, 320, 100, 100, screenHeight - 200)],
        floors: [new Floor(0, screenHeight - 112, screenWidth, 112), new Floor(screenWidth, screenHeight - 112, screenWidth, 112)],
        score: new Score(),
        gravity: 300,
        groundHeight: screenHeight - 112,
        gameSpeed: 1.5
    };
}

// function that runs every time a frame is available
const gameLoop = (timestamp) => {
    // setup the game once
    if(!game || game.state === 'RESET') {
        resetGame();

        if(game.state === 'RESET') {
            game.state = 'PLAYING';
        }
    }

    // clear everything from the screen
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // get time elapsed in seconds (divide by 1000 since timestamp is in milliseconds and we want seconds)
    game.dt = (timestamp - game.lastUpdated) / 1000;
    game.dt *= game.gameSpeed;

    // draw background
    game.ctx.drawImage(backgroundImage, 0, 0);

    // draw and update each pipe
    for(let i = 0; i < game.pipes.length; i++) {
        const pipe = game.pipes[i];
        pipe.update(game);
        pipe.draw(game);
    }

    // draw and update each floor
    for(let i = 0; i < game.floors.length; i++) {
        const floor = game.floors[i];
        floor.draw(game);
        floor.update(game);
    }

    // draw and update player
    game.player.update(game);
    game.player.draw(game);

    // draw score
    if(game.state === 'PLAYING' || game.state === 'GAME_OVER') {
        game.score.draw(game);
        game.score.update(game);
    }

    // draw title or game over texts
    if(game.state === 'TITLE_SCREEN') {
        game.ctx.drawImage(titleScreenImage, screenWidth / 2 - 184 / 2, screenHeight / 2 - 267 / 2 - 35);
    }

    if(game.state === 'GAME_OVER') {
        game.ctx.drawImage(gameOverImage, screenWidth / 2 - 192 / 2, screenHeight / 2 - 42 / 2);
    }

    // update the time the game was last updated at
    game.lastUpdated = timestamp;

    // call this function again (once a frame is available)
    requestAnimationFrame(gameLoop);
}

// function to initialize the game
const init = () => {
    canvas.focus();
    requestAnimationFrame(gameLoop);
}

// call init to start the game
init();
