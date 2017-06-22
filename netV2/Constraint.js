function Constraint(a, b, stiffness, len)
{
    this.a = a;
    this.b = b;
    this.stiffness = stiffness;
    this.len = typeof len == "undefined" ? a.pos.sub(b.pos).len() : len;
    this.len2 = this.len * this.len;
}

Constraint.prototype.relax = function (step)
{
    var vec = this.a.pos.sub(this.b.pos);
    var dis2 = vec.len2();
    var off = (dis2 - this.len2) / this.len2 * this.stiffness * step;
    var aa = vec.scale(off);
    if (!this.b.lock)
    {
        this.b.pos.setAdd(aa);
    }
    if (!this.a.lock)
    {
        this.a.pos.setSub(aa);
    }
}

Constraint.prototype.draw = function (ctx)
{
    ctx.beginPath();
    ctx.moveTo(this.a.pos.x, this.a.pos.y);
    ctx.lineTo(this.b.pos.x, this.b.pos.y);
    ctx.strokeStyle = "#d8dde2";
    ctx.stroke();
}