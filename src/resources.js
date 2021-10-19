// game background image
const backgroundImage = new Image();
backgroundImage.src = 'resources/background-day.png';

// player image
const birdMidFlapImage = new Image();
birdMidFlapImage.src = 'resources/yellowbird-midflap.png';

// floor image
const baseImage = new Image();
baseImage.src = 'resources/base.png';

// top pipe image
const topPipeImage = new Image();
topPipeImage.src = 'resources/pipe-green-d.png';

// bottom pipe image
const bottomPipeImage = new Image();
bottomPipeImage.src = 'resources/pipe-green-u.png';

// title screen
const titleScreenImage = new Image();
titleScreenImage.src = 'resources/message.png';

// game over
const gameOverImage = new Image();
gameOverImage.src = 'resources/gameover.png';

// score numbers
const scoreImages = [];
for(let i = 0; i < 10; i++) {
    const scoreImage = new Image();
    scoreImage.src = `/resources/${i}.png`;
    scoreImages.push(scoreImage);
}

// play wing sound
const playWingSound = () => {
    const wingSound = new Audio();
    wingSound.src = 'resources/wing.ogg';
    return wingSound.play();
};

// export these variables
export { backgroundImage, birdMidFlapImage, baseImage, topPipeImage, bottomPipeImage, titleScreenImage, gameOverImage, scoreImages, playWingSound };
