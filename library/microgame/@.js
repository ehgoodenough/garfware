function Microgame(options) {
    options = options || {}

    this.title = options.title || undefined
    this.duration = options.duration || 5000
    this.onTimeout = options.onTimeout || function() {
        this.pass()
    }.bind(this)

    this.time = 0

    this.hearts = parseInt(this._urlhash("h")) || 3
    this.hearts = Math.max(0, Math.min(3, this.hearts))

    this.points = parseInt(this._urlhash("p")) || 0

    this.mount = document.createElement("div")
    this.mount.className = "frame"
    this.mount.style.zIndex = 999999999
    document.body.appendChild(this.mount)

    var request = new XMLHttpRequest();
    request.open("GET", "./../../library/microgame/@.html", true);
    request.onload = function() {
        if(request.status < 200 || request.status > 400) {
            throw new Error("Something happened trying to get the microgame markup.")
            console.log(error)
        } else {
            this.mount.innerHTML = request.responseText
            this.mount.querySelector(".points").textContent = this.points
            this.mount.querySelector("#has.heart").style.width = this.hearts + "em"
            this.mount.querySelector("#hasnt.heart").style.width = (3 - this.hearts) + "em"

            this.loop = new Afloop(function(delta) {
                delta = delta * (1000 / 60)
                this.onLoop(delta)
            }.bind(this))
        }
    }.bind(this)
    request.send()
}

Microgame.prototype.pass = function() {
    this.onEnd("pass")
}

Microgame.prototype.fail = function() {
    this.onEnd("fail")
}

Microgame.prototype.onLoop = function(delta) {
    if(this.hasEnded != true) {
        this.time += delta
        if(this.time > this.duration) {
            if(!!this.onTimeout) {
                this.onTimeout()
            }
        } else {
            var percentage = Math.max(this.duration - this.time, 0) / this.duration
            this.mount.querySelector(".timer").style.width = (4 * percentage) + "em"
        }
    }
}

Microgame.prototype.onEnd = function(state) {
    if(this.hasEnded != true) {
        this.hasEnded = true

        if(!!this.onEnd) {
            this.onEnd(state)
        }

        if(state == "pass") {
            this.points += 1

            this.mount.querySelector("#pass.state").classList.add("active")
            this.mount.querySelector(".points").textContent = this.points
        }

        if(state == "fail") {
            this.hearts -= 1

            this.mount.querySelector("#fail.state").classList.add("active")
            this.mount.querySelector("#has.heart").style.width = this.hearts + "em"
            this.mount.querySelector("#hasnt.heart").style.width = (3 - this.hearts) + "em"


            if(this.hearts == 0) {
                this.points = 0
                this.hearts = 3
            }
        }

        this._schedule(function() {
            window.location = window.location.pathname + "?h=" + this.hearts + "&s=" + this.points
        }, 2000)
    }
}

// TODO: Have a game over state.
// TODO: In production, jump to random pages.
// TODO: Update example game to use microgame.

Microgame.prototype._schedule = function(func, time) {
    func = (func || function() {}).bind(this)
    window.setTimeout(func, time)
}

Microgame.prototype._urlhash = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}
