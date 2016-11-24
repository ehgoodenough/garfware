var stage = new Pixi.Container()

var textures = {
    frog: Pixi.Texture.fromImage("images/frog.png"),
}

var frog = new Pixi.Sprite(textures.frog)

frog.anchor.x = 0.5
frog.anchor.y = 0.5
frog.position.x = Pixi.renderer.view.width / 2
frog.position.y = Pixi.renderer.view.height / 2

stage.addChild(frog)

var microgame = new Microgame({
    duration: 7000,
    title: "Do nothing.",
    onTimeout: function() {
        microgame.pass()
    }
})

document.addEventListener("keydown", function(event) {
    microgame.fail()
})

var time = 0

var loop = new Afloop(function(delta) {
    if(microgame.hasEnded) {
        return
    }

    frog.rotation += Math.random() * (Math.PI / 32) - (Math.PI / 64)

    time += delta
    if(time >= 60) {
        time -= 60
        Pixi.renderer.backgroundColor = (Math.random() * 0xFFFFFF << 0)
    }
    Pixi.render(stage)
})
