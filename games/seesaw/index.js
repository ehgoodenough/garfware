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
    garf1: Pixi.Texture.fromImage("images/GarfSmall.png"),
    garf2: Pixi.Texture.fromImage("images/GarfLarge.png"),
    garf3: Pixi.Texture.fromImage("images/monkey.png"),
    fulcrum: Pixi.Texture.fromImage("images/Fulcrum.png"),
    banana: Pixi.Texture.fromImage("images/banana.png"),
    saw: Pixi.Texture.fromImage("images/saw.png"),
}

// This is a sprite! It'll move around the screen.
// To create a sprite, you need to give it a texture.
// Let's make a seesaw that'll move around the screen.

// Make the parent seesaw
var seesaw = new Pixi.Sprite(textures.saw)
seesaw.anchor.x = 0.5
seesaw.anchor.y = 0.5
seesaw.position.x=320
seesaw.position.y=400

// Add the Garfs on top of it
 // Left Garf
var Lx = Math.random()*-220
var Lw = Math.random()%2 + 1
if(Lw == 2){
  var leftGarf = new Pixi.Sprite(textures.garf2)
}
else{
  var leftGarf = new Pixi.Sprite(textures.garf1)
}
seesaw.addChild(leftGarf)
leftGarf.anchor.x=0.5
leftGarf.anchor.y=1.0
leftGarf.position.x= Lx
leftGarf.position.y=-9
leftGarf.scale.x*=Lw
leftGarf.scale.y*=Lw

 // Right Garf
var Rx = Math.random()*220
var Rw = Math.random()%2 + 1
if(Rw == 2){
  var rghtGarf = new Pixi.Sprite(textures.garf2)
}
else{
  var rghtGarf = new Pixi.Sprite(textures.garf1)
}
seesaw.addChild(rghtGarf)
rghtGarf.anchor.x=0.5
rghtGarf.anchor.y=1.0
rghtGarf.position.x= Rx
rghtGarf.position.y=-9
rghtGarf.scale.x=-1
rghtGarf.scale.x*=Rw
rghtGarf.scale.y*=Rw

// Make the fulcrum sprite
var fulcrum = new Pixi.Sprite(textures.fulcrum)
fulcrum.anchor.x = 0.5
fulcrum.anchor.y = 0.0
fulcrum.position.x=320
var Fx = 0
fulcrum.position.y=409

var winX = (Lw*Lx + Rw*Rx)/(Lw+Rw)

// Now that we've created a sprite, we need to
// add it to our container, which we called "stage".
stage.addChild(seesaw)
stage.addChild(fulcrum)

// Create a new microgame.
var microgame = new Microgame({
    title: "Seesaw",
    duration: 50000,
    onTimeout:function(){
      microgame.fail()
    }
})

var omega = 0
var Mome = Rw*Rx*Rx + Lw*Lx*Lx

var loop = new Afloop(function(delta) {

    // We can check if a key is being pressed
    // using Keyb. If a player is pressing the
    // H key, we'll log "Hello World!!" to
    // the console. Try it!
    if(Keyb.isDown("H")) {
        console.log("Hello World!!")
    }

    // Fulcrum Movement
    if(Keyb.isDown("<left>")) {
        //fulcrum.position.x -= 1
        Fx -= 1
    }
    if(Keyb.isDown("<right>")) {
        //fulcrum.position.x += 1
        Fx += 1
    }
    if(Fx < -220){Fx=-220}
    if(Fx > 220) {Fx=220}
    seesaw.anchor.x = (220+Fx)/440
    leftGarf.position.x = Lx - Fx
    rghtGarf.position.x = Rx - Fx
    Mome = Rw*(Rx - Fx)*(Rx - Fx) + Lw*(Lx - Fx)*(Lx - Fx)

    // Generate torques for rotation
    moment = Lw*(Fx-Lx) - Rw*(Rx-Fx)
    moment += -60*seesaw.rotation// add fudge spring around pivot point
    omega += moment / Mome
    seesaw.rotation += omega
    if(seesaw.rotation > Math.PI/6){
      seesaw.rotation = Math.PI/6
      omega = 0
    }
    if(seesaw.rotation < -Math.PI/6){
      seesaw.rotation = -Math.PI/6
      omega = 0
    }

    // Check for winx
    console.log(omega)
    if(Fx > winX-5 && Fx < winX+5){
    //if( Math.abs(seesaw.rotation) < Math.PI/15 && Math.abs(omega)<0.01  ){
      microgame.pass()
    }

    // At the end of our loop, we render
    // the stage to the screen.
    Pixi.render(stage)
})

// Please feel free to copy this code, but
// delete all the comments I wrote. I'd hate
// to know my annoying last-minute writing
// has proliferated across every mini-game.
