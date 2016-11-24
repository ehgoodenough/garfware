/*
    afloop.js

    An "animation frame loop". Given a function, it
    will loop it each and every frame. How nice!!

    Example Usage:

        var loop = new Afloop(function() {
            // Put code here you want to run in your loop!!
        })

    Github:

        https://github.com/ehgoodenough/afloop
*/

function Afloop(func) {
    (function loop(now) {
        delta = window.performance.now() - now
        delta = Math.min(delta, 1000)
        delta = delta / (1000 / 60)
        func(delta)
        window.requestAnimationFrame(loop.bind(this, window.performance.now()))
    })(window.performance.now())
}
