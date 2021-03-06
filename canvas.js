window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
        window.setTimeout(t, 1e3 / 60)
    }
}();
var c = document.getElementById("c"), ctx = c.getContext("2d"), cw = c.width = window.innerWidth, ch = c.height = .7 * window.innerHeight, rand = function(t, i) {
    return ~~(Math.random() * (i - t + 1) + t)
};
window.onresize = function() {
    cw = c.width = window.innerWidth, ch = c.height = .7 * window.innerHeight
}, updateAll = function(t) {
    for (var i = t.length; i--;)
        t[i] && t[i].update(i)
}, renderAll = function(t) {
    for (var i = t.length; i--;)
        t[i] && t[i].render(i)
};
var stars = [];
Star = function(t, i, n, e) {
    this.x = t, this.y = i, this.speed = e / 25, this.radius = n, this.saturation = 20 + 5 * this.radius, this.lightness = 20 + 4 * this.radius
}, Star.prototype = {
    update: function() {
        this.x += this.speed, this.x - this.radius >= cw && (this.x = rand(0, ch - this.radius), this.x =- this.radius)
    },
    render: function() {
        ctx.beginPath(), ctx.arc(this.x, this.y, this.radius < 0 ? 0 : this.radius, 0, 2 * Math.PI, !1);
        var t = 0 === rand(0, 140) ? rand(5, 20): 0;
        ctx.fillStyle = "hsl(240, " + this.saturation + "%, " + (this.lightness + t) + "%)", ctx.fill()
    }
}, makeStarfield = function() {
    for (var t = .75, i = .2, n = 40, e = 6; n--;)
        for (var r = t + i, a = e; a--;)
            r += i, stars.push(new Star(rand(0, cw - r), rand(0, ch - r), r, 3 * r))
};
var loop = function() {
    window.requestAnimFrame(loop), updateAll(stars), ctx.clearRect(0, 0, cw, ch), renderAll(stars)
};
makeStarfield(), loop();

