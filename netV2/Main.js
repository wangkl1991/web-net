var engine;
var param = function () 
{
    this.gravity = 0.5;
}

var text;

function main(params)
{
    text = new param();
    var data = new dat.GUI();
    data.add(text, "gravity", -2, 2);

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine = new Engine(canvas);
    //params
    engine.gravity = new Vec2(0, text.gravity);
    engine.friction = 1;
    engine.selectRadius = 50;

    var group1 = setModel1();
    var group2 = setModel2();
    var group3 = setModel3();
    engine.groupArr.push(group1);
    engine.groupArr.push(group2);
    engine.groupArr.push(group3);
    onFrame();
}


function setModel3()
{
    var group = new Group();
    var i;
    var angle = 20;
    var n = Math.floor(360 / angle);
    var radius = 50;
    var dis = 2 * radius / n;
    group.particles.push(new Particle(200, 200));
    for (i = 0; i < n; i++)
    {
        var x = Math.cos(i * angle * Math.PI / 180) * radius + 200;
        var y = -Math.sin(i * angle * Math.PI / 180) * radius + 200;
        var p = new Particle(x, y);
        group.particles.push(p);
    }
    for (i = 1; i < n; i++)
    {
        var c = new Constraint(group.particles[i], group.particles[i + 1], dis);
        group.constraints.push(c);
        c = new Constraint(group.particles[0], group.particles[i], dis);
        group.constraints.push(c);
    }
    c = new Constraint(group.particles[n], group.particles[1], dis);
    group.constraints.push(c);
    c = new Constraint(group.particles[n], group.particles[0], dis);
    group.constraints.push(c);
    return group;
}

function setModel2()
{
    var row = 5;
    var col = 2;
    //group particles
    var group = new Group();
    var i, j, c;
    var s = 15;
    for (i = 0; i < row; i++)
    {
        for (j = 0; j < col; j++)
        {
            var p = new Particle(j * 42 + canvas.width/4*3, i * 42 + 500);
            if (i == row - 1) p.lock = true;
            group.particles.push(p);
        }
    }
    //group constraint
    //横约束
    for (i = 0; i < row; i++)
    {
        for (j = 0; j < col - 1; j++)
        {
            c = new Constraint(group.particles[i * col + j], group.particles[i * col + j + 1], s);
            group.constraints.push(c);
        }
    }
    //竖约束
    for (i = 0; i < row - 1; i++)
    {
        for (j = 0; j < col; j++)
        {
            c = new Constraint(group.particles[i * col + j], group.particles[(i + 1) * col + j], s);
            group.constraints.push(c);
        }
    }

    for (i = 0; i < group.particles.length - 2; i = i + 2)
    {
        c = new Constraint(group.particles[i], group.particles[i + 3], s);
        group.constraints.push(c);
        c = new Constraint(group.particles[i + 1], group.particles[i + 2], s);
        group.constraints.push(c);
    }

    return group;
}

function setModel1()
{
    var row = 10;
    var col = 16;
    //group particles
    var group = new Group();
    var i, j, c;
    for (i = 0; i < row; i++)
    {
        for (j = 0; j < col; j++)
        {
            var p = new Particle(j * 28 + canvas.width/4, i * 28 + 300);
            if (j % 3 == 0 && i == 0) p.lock = true;
            group.particles.push(p);
        }
    }
    //group constraint
    //横约束
    for (i = 0; i < row; i++)
    {
        for (j = 0; j < col - 1; j++)
        {
            c = new Constraint(group.particles[i * col + j], group.particles[i * col + j + 1], 0.2);
            group.constraints.push(c);
        }
    }
    //竖约束
    for (i = 0; i < row - 1; i++)
    {
        for (j = 0; j < col; j++)
        {
            c = new Constraint(group.particles[i * col + j], group.particles[(i + 1) * col + j], 0.2);
            group.constraints.push(c);
        }
    }

    return group;
}

function onFrame(timeStep)
{
    engine.gravity.y = text.gravity;
    engine.update(timeStep);
    engine.draw();
    requestAnimationFrame(onFrame);
}