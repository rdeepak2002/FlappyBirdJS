// check if 2 rectangles collide
const box2dCollision = (sprite1, sprite2) => {
    return (sprite1.x < sprite2.x + sprite2.width &&
        sprite1.x + sprite1.width > sprite2.x &&
        sprite1.y < sprite2.y + sprite2.height &&
        sprite1.y + sprite1.height > sprite2.y);
}

// draw an animated image
const drawAnimatedSprite = (game, frameArr, x, y, width, height, animDuration = 300) => {
    const numFrames = frameArr.length;

    const curAnimTime = Math.round(game.timestamp % animDuration);
    const timePerFrame = animDuration / numFrames;

    const curFrame = Math.floor(curAnimTime / timePerFrame);

    game.ctx.drawImage(frameArr[curFrame], x, y , width, height);
}

export { box2dCollision, drawAnimatedSprite };
