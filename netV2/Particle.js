function Particle(x, y) 
{
    this.pos = new Vec2(x, y);
    this.lastPos = new Vec2(x, y);
    this.highLight = false;
    this.lock = false;
}

Particle.prototype.draw = function (ctx)
{
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = this.highLight ?  "#ff0000": "#2dad8f";
    ctx.fill();
}