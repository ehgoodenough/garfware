// Create the container
var stage = new Pixi.Container()

// Import some textures
var textures = {
    ball: Pixi.Texture.fromImage("images/ball.png"),
    paddle: Pixi.Texture.fromImage("images/paddle.png"),
}

// Create the sprites, two paddles and a ball.
var good_paddle = new Pixi.Sprite(textures.paddle)
var bad_paddle = new Pixi.Sprite(textures.paddle)
var ball = new Pixi.Sprite(textures.ball)

// The good paddle is for the player.
// We position it on the left side.
good_paddle.position.x = 13
good_paddle.position.y = 57
good_paddle.anchor.x = 0.5
good_paddle.anchor.y = 0.5

// The bad paddle is for the opponent.
// We position it on the right side.
bad_paddle.position.x = Pixi.renderer.view.width - 13
bad_paddle.position.y = Pixi.renderer.view.height / 2
bad_paddle.anchor.x = 0.5
bad_paddle.anchor.y = 0.5

// The ball will bounce between the two paddles.
ball.position.x = Pixi.renderer.view.width / 2
ball.position.y = Pixi.renderer.view.height / 2
ball.anchor.x = 0.5
ball.anchor.y = 0.5

// We assign both the paddles a speed variable.
// Unlike "position" or "anchor", which are attributes
// of the sprite by default, the "speed" is something
// we just made up. You can do that in javascript.
good_paddle.speed = 1
bad_paddle.speed = 2
// You'll notice that the bad paddle is faster than
// the good paddle; it must be cheating!! How evil.

// The ball will also be assigned a speed, which along
// with rotation, we use to create velocity. Again, none
// of these variables existed until we added them to the
// sprite. I just love javascritpt.
ball.speed = 3
ball.rotation = -45 * (Math.PI / 180)
ball.velocity = {
    x: Math.cos(ball.rotation) * ball.speed,
    y: Math.sin(ball.rotation) * ball.speed
}
// We are calculating velocity as a vector of
// speed (the magnitude) and rotation (the angle).
// We are converting that vector into it's x and y
// components, which are much more useful to us.

// Add the sprites to the container!
stage.addChild(good_paddle)
stage.addChild(bad_paddle)
stage.addChild(ball)

// Create a new microgame.
var microgame = new Microgame({
    subtitle: "Pong",
    duration: 5000,
})

// Kickoff the game loop!
var loop = new Afloop(function(delta) {

    // If the game is over,
    // stop everything.
    if(microgame.hasEnded) {
        return
    }

    //////////////////////
    // The Good Paddle //
    ////////////////////

    // When the player presses up arrow
    // key, we move the paddle upwards.
    if(Keyb.isDown("<up>")) {
        good_paddle.position.y -= good_paddle.speed * delta
    }

    // When the player presses the down arrow
    // key, we move the paddle downwards.
    if(Keyb.isDown("<down>")) {
        good_paddle.position.y += good_paddle.speed * delta
    }

    /////////////////////
    // The Bad Paddle //
    ///////////////////

    // If the paddle is above the
    // ball, move the paddle upwards.
    if(bad_paddle.position.y > ball.position.y) {
        bad_paddle.position.y -= bad_paddle.speed * delta
    }

    // If the paddle is below the
    // ball, move the paddle downwards.
    if(bad_paddle.position.y < ball.position.y) {
        bad_paddle.position.y += bad_paddle.speed * delta
    }

    ///////////////
    // The Ball //
    /////////////

    // Give the ball a spin!
    // It doesn't actually affect
    // anything; it just looks cool.
    ball.rotation += 0.2 * delta

    ball.position.x += ball.velocity.x * delta
    ball.position.y += ball.velocity.y * delta

    // If the ball is moving upwards and hit
    // the top of the screen, bounce the ball.
    if(ball.velocity.y < 0 && ball.position.y < 0) {
        ball.velocity.y *= -1
    }

    // If the ball is moving downwards and hit
    // the bottom of the screen, bounce the ball.
    if(ball.velocity.y > 0 && ball.position.y > Pixi.renderer.view.height) {
        ball.velocity.y *= -1
    }

    // If the ball is moving leftwards and hit the good paddle, bounce the ball.
    if(ball.velocity.x < 0 && good_paddle.containsPoint(ball.position)) {
        ball.velocity.x *= -1
    }

    // If the ball is moving rightwards and hit the bad paddle, bounce the ball.
    if(ball.velocity.x > 0 && bad_paddle.containsPoint(ball.position)) {
        ball.velocity.x *= -1
    }


    // If the ball leaves the screen, the player
    // has failed to bounce it, and has lost.
    if(ball.position.x < 0) {
        microgame.fail()
    }

    ////////////////
    // Rendering //
    //////////////

    // Render the game.
    Pixi.render(stage)
})

// Eh good enough! If I had more time, I would:
// -> Stop the paddles from moving off the screen
// -> Fix the bug where the ball glitches through the bottom of the paddles
// -> Move both paddles via velocity and acceleration
// -> Randomize the direction of the ball
