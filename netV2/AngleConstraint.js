function AngleConstraint(a, b, anchor, stiffness, angle)
{
    this.a = a;
    this.b = b;
    this.anchor = anchor;
    this.stiffness = stiffness;
    var tmp = this.a.pos.sub(this.anchor.pos).angle(this.b.pos.sub(this.anchor.pos));
    tmp = Math.abs(tmp) < 180 ? Math.abs(tmp) : 360 - Math.abs(tmp);
    this.angle = typeof angle == "undefined" ? this.a.pos.sub(this.anchor.pos).angle(this.b.pos.sub(this.anchor.pos)) : angle;
    // this.angle = typeof angle === "undefined" ? 
}

AngleConstraint.prototype.relax = function (step)
{
    var v1 = this.a.pos.sub(this.anchor.pos);
    var v2 = this.b.pos.sub(this.anchor.pos);
    var tmp = v2.angle(v1);
    tmp = Math.abs(tmp) < 180 ? Math.abs(tmp) : 360 - Math.abs(tmp);
    var off = (this.angle - tmp) * step / this.stiffness;
    v1.setRotate(off);
    v2.setRotate(-off);
    this.a.pos = v1.add(this.anchor.pos);
    this.b.pos = v2.add(this.anchor.pos);
}

AngleConstraint.prototype.draw = function (ctx)
{
    ctx.beginPath();
    var v1 = this.a.pos.sub(this.anchor.pos);
    var v2 = this.b.pos.sub(this.anchor.pos);
    var start = Math.atan2(v1.y, v1.x);
    var end = Math.atan2(v2.y, v2.x);
    start = start <= -Math.PI ? start + Math.PI * 2 : start;
    start = start >= Math.PI ? start - Math.PI * 2 : start;
    end = end <= - Math.PI ? end + Math.PI * 2 : end;
    end = end >= Math.PI ? end - Math.PI * 2 : end;
    ctx.arc(this.anchor.pos.x, this.anchor.pos.y, 10, Math.min(start, end), Math.max(start, end), false);
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
}