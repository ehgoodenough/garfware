// Because we imported them in our HTML, we
// now have access to these three tools:
// 
// -> Pixi: For drawing to the canvas!!
// -> Keyb: For getting input from the keyboard!!
// -> Afloop: For looping your code!!
// 
// Below is an example of how to use these. :]

// This is our "container", which contains
// everything that'll be drawn to the screen.
// We'll call it our "stage", cuz this is a game.
var stage = new Pixi.Container()

// These are our "textures", which are the images
// we'll be drawing to the screen. To import them, we
//  need to give the relative file location.
var textures = {
    monkey: Pixi.Texture.fromImage("images/monkey.png"),
    banana: Pixi.Texture.fromImage("images/banana.png"),
}

// This is a sprite! It'll move around the screen.
// To create a sprite, you need to give it a texture.
// Let's make a monkey that'll move around the screen.
var monkey = new Pixi.Sprite(textures.monkey)

// Now that we've created a sprite, we need to
// add it to our container, which we called "stage".
stage.addChild(monkey)

var loop = new Afloop(function(delta) {
    
    // We can check if a key is being pressed
    // using Keyb. If a player is pressing the
    // H key, we'll log "Hello World!!" to
    // the console. Try it!
    if(Keyb.isDown("H")) {
        console.log("Hello World!!")
    }
    
    // We can use this to move our monkey.
    // If the player is pressing the up arrow key...
    if(Keyb.isDown("<up>")) {
        // We'll move the monkey up by one pixel.
        // The monkey is a sprite, and all sprites
        // have this nifty position object.
        monkey.position.y -= 1
    }
    
    // Let's do that for all directions.
    if(Keyb.isDown("<down>")) {
        monkey.position.y += 1
    }
    if(Keyb.isDown("<left>")) {
        monkey.position.x -= 1
    }
    if(Keyb.isDown("<right>")) {
        monkey.position.x += 1
    }
    
    // Oh, and drop a banana if
    // you hitting the spacebar.
    if(Keyb.isJustDown("<space>")) {
        // Create a new sprite for the banana..
        var banana = new Pixi.Sprite(textures.banana)
        
        // Position the banana on top of the monkey.
        banana.position.copy(monkey.position)
        
        // Add the banana to our "stage".
        stage.addChild(banana)
    }
    
    // At the end of our loop, we render
    // the stage to the screen.
    Pixi.render(stage)
})

// Please feel free to copy this code, but
// delete all the comments I wrote. I'd hate
// to know my annoying last-minute writing
// has proliferated across every mini-game.
