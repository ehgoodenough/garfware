// Create the container
var stage = new Pixi.Container()

// Import some textures
var textures = {
    ball: Pixi.Texture.fromImage("images/ball.png"),
    avatar: Pixi.Texture.fromImage("images/you.png"),
}

// Create the sprites
var you = new Pixi.Sprite(textures.avatar)
you.position.x = Pixi.renderer.view.width/2
you.position.y = Pixi.renderer.view.height/2

var ball = []
var speed = []
var ballvelo = []

for(var i=0; i<5; i++)
{
	ball[i] = new Pixi.Sprite(textures.ball)
	ball[i].position.x = (Math.random(1)*Pixi.renderer.view.width)-5
	ball[i].position.y = Pixi.renderer.view.height-10
	speed[i]=Math.random(8)+1
    //ballvelo[i]=(you.position.y - ball[i].position.y)/(you.position.x-ball[i].position.x)
	stage.addChild(ball[i])
}

for(var i=5; i<10; i++)
{
	ball[i] = new Pixi.Sprite(textures.ball)
	ball[i].position.x = (Math.random(1)*Pixi.renderer.view.width)-5
	ball[i].position.y = 0
	speed[i]=Math.random(8)+1
//    ballvelo[i] = Math.atan2(you.position.y - ball[i].position.y, you.position.x-ball[i].position.x)// * 180 / Math.PI // in degrees
//  ballvelo[i]=(you.position.y)/(you.position.x-ball[i].position.x)
	stage.addChild(ball[i])
}



//good_paddle.anchor.x = 0.5
//good_paddle.anchor.y = 0.5

// The ball will bounce between the two paddles.
//ball.position.x = Pixi.renderer.view.width / 2
//ball.position.y = Pixi.renderer.view.height / 2
//ball.anchor.x = 0.5
//ball.anchor.y = 0.5

// We assign both the paddles a speed variable.
// Unlike "position" or "anchor", which are attributes
// of the sprite by default, the "speed" is something
// we just made up. You can do that in javascript.

// You'll notice that the bad paddle is faster than
// the good paddle; it must be cheating!! How evil.

// The ball will also be assigned a speed, which along
// with rotation, we use to create velocity. Again, none
// of these variables existed until we added them to the
// sprite. I just love javascritpt.
//ball.speed = 3
//ball.rotation = -45 * (Math.PI / 180)
/*ball.velocity = {
    x: Math.cos(ball.rotation) * ball.speed,
    y: Math.sin(ball.rotation) * ball.speed
}*/
// We are calculating velocity as a vector of
// speed (the magnitude) and rotation (the angle).
// We are converting that vector into it's x and y
// components, which are much more useful to us.

var time = 0;
var endnum = 0;

// Add the sprites to the container!
stage.addChild(you)

// Create a new microgame.
var microgame = new Microgame({
    title: "Dodgit",
    duration: 5000,
})

// Kickoff the game loop!
var loop = new Afloop(function(delta) {

    // If the game is over,
    // stop everything.
    if(microgame.hasEnded) {
        return
    }

    //////////
    // You //
    ////////

	// We can use this to move our monkey.
    // If the player is pressing the up arrow key...
    if(Keyb.isDown("<up>")) {
        // We'll move you up by one pixel.
        // The monkey is a sprite, and all sprites
        // have this nifty position object.
        you.position.y -= delta
    }

    if(Keyb.isDown("<down>")) {
        you.position.y += delta
    }
    if(Keyb.isDown("<left>")) {
        you.position.x -= delta
    }
    if(Keyb.isDown("<right>")) {
        you.position.x += delta
    }

    ///////////////
    // The Ball //
    /////////////

    // Give the ball a spin!
    // It doesn't actually affect
    // anything; it just looks cool.
    //ball.rotation += 0.2 * delta
    
	endnum = microgame.time/400
	if(microgame.time>4000){
		endnum=10
	}
	for(var i=0; i<10; i++)
	{
	if(microgame.time>=i*400 && microgame.time<=i*400 + 250) {
	    ballvelo[i] = Math.atan2(you.position.y - ball[i].position.y, you.position.x-ball[i].position.x)// * 180 / Math.PI // in degrees
	}
	if(microgame.time>i*400)
	{
		ball[i].position.x += Math.cos(ballvelo[i])*speed[i]*delta
		ball[i].position.y += Math.sin(ballvelo[i])*speed[i]*delta
		if(you.containsPoint(ball[i].position)) {
			microgame.fail()
		}
	}
	}
    /*
	for(var i=0; i<endnum; i++)
	{
	    if(i<5)
		{
			ball[i].position.x += (Math.cos(ballvelo[i])*speed[i])
			ball[i].position.y += Math.sin(ballvelo[i])*speed[i]
			
			if(you.containsPoint(ball[i].position)) {
				microgame.fail()
			}			
			//console.log("Hello World!!")
		}
		if(i>=5 && i<10)
		{
			ball[i].position.x += Math.cos(ballvelo[i])*speed[i]
			ball[i].position.y += Math.sin(ballvelo[i])*speed[i]
			if(you.containsPoint(ball[i].position)) {
				microgame.fail()
			}			
		}
	}
	*/
	/*
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
    */

    // If the ball leaves the screen, the player
    // has failed to bounce it, and has lost.
    //if(ball.position.x < 0) {
    //    microgame.fail()
    //}

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
