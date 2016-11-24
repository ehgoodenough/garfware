var MAX_VELOCITY = 3
var COOKIE_COUNT = 20

var stage = new Pixi.Container()

var textures = {
    garf: Pixi.Texture.fromImage("images/garf.png"),
    cookie: Pixi.Texture.fromImage("images/cookie.png")
}

for(var i = 0; i < COOKIE_COUNT; i += 1) {
    var cookie = new Pixi.Sprite(textures.cookie)
    cookie.position.x = Math.random() * Pixi.renderer.view.width
    cookie.position.y = Math.random() * Pixi.renderer.view.height
    stage.addChild(cookie)
}

var garf = new Pixi.Sprite(textures.garf)

garf.velocity = {x: 0, y: 0}
garf.speed = 0.25

garf.howMuchEaten = 0

stage.addChild(garf)

var microgame = new Microgame({
    duration: 5000,
    title: "Eat 9 cookies!",
    onTimeout: function() {
        if(garf.howMuchEaten >= 9) {
            microgame.pass()
        } else {
            microgame.fail()
        }
    }
})

var loop = new Afloop(function(delta) {
    if(microgame.hasEnded) {
        return
    }

    if(Keyb.isDown("<up>")) {
        garf.velocity.y -= garf.speed * delta
    }
    if(Keyb.isDown("<down>")) {
        garf.velocity.y += garf.speed * delta
    }
    if(Keyb.isDown("<left>")) {
        garf.velocity.x -= garf.speed * delta
    }
    if(Keyb.isDown("<right>")) {
        garf.velocity.x += garf.speed * delta
    }

    if(garf.velocity.y < -MAX_VELOCITY) {
        garf.velocity.y = -MAX_VELOCITY
    }
    if(garf.velocity.y > MAX_VELOCITY) {
        garf.velocity.y = MAX_VELOCITY
    }
    if(garf.velocity.x < -MAX_VELOCITY) {
        garf.velocity.x = -MAX_VELOCITY
    }
    if(garf.velocity.x > MAX_VELOCITY) {
        garf.velocity.x = MAX_VELOCITY
    }

    garf.position.x += garf.velocity.x
    garf.position.y += garf.velocity.y

    var x1 = garf.position.x - (garf.width * garf.anchor.x) - 10
    var x2 = garf.position.x + (garf.width * garf.anchor.x) + 10
    var y1 = garf.position.y - (garf.height * garf.anchor.y)
    var y2 = garf.position.y + (garf.height * garf.anchor.y)

    stage.children.forEach(function(child) {
        var cookie = child != garf ? child : null

        if(!!cookie) {
            if(cookie.isEaten != true) {
                if(cookie.containsPoint({x: x1, y: y1})
                || cookie.containsPoint({x: x1, y: y2})
                || cookie.containsPoint({x: x2, y: y1})
                || cookie.containsPoint({x: x2, y: y2})) {
                    cookie.visible = false
                    cookie.isEaten = true
                    garf.howMuchEaten += 1
                }
            }
        }
    })

    Pixi.render(stage)
})

// Eh good enough. If I had more time, I would:
// -> show how many cookies have been eaten
