function Ware(duration, onTimeout) {
    this.duration = duration || 5000
    this.onTimeout = onTimeout || function() {
        this.pass()
    }.bind(this)
    this.loop = new Afloop(function(delta) {
        if(window.performance.now() > this.duration) {
            this.onTimeout()
        }
    }.bind(this))
}

Ware.prototype.pass = function() {
    this.onEnd("pass")
}

Ware.prototype.fail = function() {
    this.onEnd("fail")
}

Ware.prototype.onEnd = function(state) {
    if(this.hasEnded != true) {
        this.hasEnded = true
        
        if(!!this.onEnd) {
            this.onEnd(state)
        }
        
        if(state == "pass") {
            console.log("YOU WIN")
        }
        
        if(state == "fail") {
            console.log("YOU LOSE")
        }
    }
}

// TODO: Show happy or sad face.
// TODO: Wait a bit.
// TODO: Move on to random game??
