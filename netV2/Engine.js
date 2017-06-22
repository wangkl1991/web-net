//
function Group()
{
    this.particles = [];
    this.constraints = [];
}

//
function Engine(canvas)
{
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    //param
    this.gravity = new Vec2(0, 0.0);
    this.friction = 0.97;
    this.selectRadius = 20;
    this.groupArr = [];
    this.select;
    this.mousePos = new Vec2();

    var self = this;
    this.canvas.onmousedown = function (e)
    {
        var nearest = self.findNearest();
        if (nearest)
        {
            self.select = self.findNearest();
            self.select.highLight = true;
        }
    }

    this.canvas.ontouchstart = function (e)
    {
        var nearest = self.findNearest();
        if (nearest)
        {
            self.select = self.findNearest();
            self.select.highLight = true;
        }
    }

    this.canvas.onmousemove = function (e)
    {
        var rect = self.canvas.getBoundingClientRect();
        self.mousePos.x = e.clientX - rect.left;
        self.mousePos.y = e.clientY - rect.top;
    }

    this.canvas.ontouchmove = function (e)
    {
        var rect = self.canvas.getBoundingClientRect();
        self.mousePos.x = e.clientX - rect.left;
        self.mousePos.y = e.clientY - rect.top;
    }

    this.canvas.onmouseup = function (e)
    {
        if (self.select)
        {
            self.select.highLight = false;
            self.select = null;
        }
    }

    this.canvas.touchend = function (e)
    {
        if (self.select)
        {
            self.select.highLight = false;
            self.select = null;
        }
    }
}

Engine.prototype.update = function (timeStep)
{
    for (g in this.groupArr)
    {
        //particles
        var particles = this.groupArr[g].particles;
        for (p in particles)
        {
            if (!particles[p].lock)
            {
                //计算速度
                var v = particles[p].pos.sub(particles[p].lastPos);
                v.setAdd(this.gravity);
                v.setScale(this.friction);
                //更新坐标
                particles[p].lastPos.set(particles[p].pos);
                particles[p].pos.setAdd(v);
            }
        }

        //constraints
        var constraints = this.groupArr[g].constraints;
        timeStep = 100;
        for (var i = 0; i < timeStep; i++)
        {
            for (c in constraints)
            {
                constraints[c].relax(1 / timeStep);
            }
        }

        //bound check
        for (p in particles)
        {
            if (particles[p].pos.x >= this.canvas.width - 1)
            {
                particles[p].pos.x = this.canvas.width - 1;
            }
            if (particles[p].pos.x <= 1)
            {
                particles[p].pos.x = 1;
            }
            if (particles[p].pos.y >= this.canvas.height - 1)
            {
                particles[p].pos.y = this.canvas.height - 1;
            }
            if (particles[p].pos.y <= 1)
            {
                particles[p].pos.y = 1;
            }
        }

        //select
        if (this.select)
        {
            this.select.pos.set(this.mousePos);
        }
    }
}

Engine.prototype.draw = function ()
{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '40px serif';
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillText("使用鼠标拖拽", canvas.width / 2 - 90, 100);
    for (g in this.groupArr)
    {
        var constraints = this.groupArr[g].constraints;
        for (c in constraints)
        {
            constraints[c].draw(this.ctx);
        }
        var particles = this.groupArr[g].particles;
        for (p in particles)
        {
            particles[p].draw(this.ctx);
        }
    }
}

Engine.prototype.findNearest = function ()
{
    var nearest;
    var minDis;
    for (g in this.groupArr)
    {
        var particles = this.groupArr[g].particles;
        if (typeof nearest == "undefined")
        {
            nearest = particles[0];
        }
        minDis = nearest.pos.sub(this.mousePos).len2();
        for (p in particles)
        {
            var dis = particles[p].pos.sub(this.mousePos).len2();
            if (dis <= minDis)
            {
                nearest = particles[p];
                minDis = dis;
            }
        }
    }
    if (minDis <= (this.selectRadius * this.selectRadius) && !nearest.lock)
    {
        return nearest;
    }
    else
    {
        return null;
    }
}