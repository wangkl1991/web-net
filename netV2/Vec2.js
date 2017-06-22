function Vec2(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
}

Vec2.prototype.set = function (v)
{
    this.x = v.x;
    this.y = v.y;
    return this;
}

Vec2.prototype.add = function (v)
{
    return new Vec2(this.x + v.x, this.y + v.y);
}

Vec2.prototype.setAdd = function (v)
{
    this.x += v.x;
    this.y += v.y;
    return this;
}

Vec2.prototype.sub = function (v)
{
    return new Vec2(this.x - v.x, this.y - v.y);
}

Vec2.prototype.setSub = function (v)
{
    this.x -= v.x;
    this.y -= v.y;
    return this;
}

Vec2.prototype.multi = function (v)
{
    return this.x * v.x + this.y * v.y;
}

Vec2.prototype.normalize = function ()
{
    var len = this.len;
    this.x /= len;
    this.y /= len;
    return this;
}

Vec2.prototype.len = function ()
{
    return Math.sqrt(this.len2());
}

Vec2.prototype.len2 = function ()
{
    return (this.x * this.x + this.y * this.y);
}

Vec2.prototype.scale = function (p)
{
    return new Vec2(this.x * p, this.y * p);
}

Vec2.prototype.setScale = function (p)
{
    this.x *= p;
    this.y *= p;
    return this;
}

Vec2.prototype.setRotate = function (p)
{
    p = p / 180 * Math.PI;
    var cos = Math.cos(p);
    var sin = Math.sin(p);
    var tmpX = this.x;
    var tmpY = this.y;
    this.x = tmpX * cos - tmpY * sin;
    this.y = tmpY * cos + tmpX * sin;
    return this;
}

Vec2.prototype.angle = function (p)
{
    var a = this.multi(p);
    var b = this.len() * p.len();
    var angle = Math.acos(a / b) * 180 / Math.PI;
    return angle;
}

