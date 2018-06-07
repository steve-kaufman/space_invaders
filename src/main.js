engine.world.gravity.y = 0;

var playing = false;

var score = 0;
var level = 1;

var ship = new Animation('images/ship.png', 5, 3);
var lifeImg = new Sprite('images/life.png');
var gameoverImg = new Sprite('images/game_over.png');
var gamewinImg = new Sprite('images/game_win.png');

var music = document.createElement('audio');
music.autoplay = true;
music.loop = true;
music.src = 'music/space_invaders.wav';

var dieSound = document.createElement('audio');
dieSound.src = 'sounds/die.wav';

var canvases = {
    background : Canvas.create(),
    main : Canvas.create(),
    UI : Canvas.create()
};

lifeImg.onload = UI.draw;

function init(){
    playing = true;

    bottom = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight * 0.8,
        window.innerWidth, window.innerHeight * 0.1, {isSensor : true, label : 'bottom'});
    Matter.World.add(engine.world, bottom);

    new Entity(0, 0, UI.offsetX, window.innerWidth, {isStatic : true});
    new Entity(window.innerWidth - UI.offsetX, 0, UI.offsetX,
        window.innerHeight, {isStatic : true});

    player.init();
    Enemy.init();

    Render.start();
    Update.start();
}

function render(){
    canvases.main.ctx.clear();

    for(var i in Subsystems) if(Subsystems[i].render) Subsystems[i].render();
    for(var i in Entities) if(Entities[i].render) Entities[i].render();
}

function update(){
    if(IO.isPressed(71) && IO.isPressed(79)) gameOver();

    if(playing && music.paused) music.play();

    for(var i in Projectiles) Projectiles[i].update();
    for(var i in Subsystems) if(Subsystems[i].update) Subsystems[i].update();
    for(var i in Entities) if(Entities[i].update) Entities[i].update();
}

Matter.Events.on(engine, 'collisionActive', function(e){
    for(var i in e.pairs){
        var pair = e.pairs[i];
        if(!(pair.bodyA.label == 'projectile' || pair.bodyB.label == 'projectile'))
        continue;
        if(!(pair.bodyA.label == 'enemy' || pair.bodyB.class == 'enemy'))
        continue;

        pair.bodyA.entity.destroy();
        pair.bodyB.entity.destroy();

        for(var j in pair){
            if(pair[j].label == 'enemy') score += pair[j].entity.score;
        }

        UI.draw();
    }
});
Matter.Events.on(engine, 'collisionActive', function(e){
    for(var i in e.pairs){
        var pair = e.pairs[i];
        if(!(pair.bodyA.label == 'enemy_projectile' || pair.bodyB.label == 'enemy_projectile'))
        continue;
        if(!(pair.bodyA.label == 'player' || pair.bodyB.class == 'player'))
        continue;

        pair.bodyA.entity.destroy();
        pair.bodyB.entity.destroy();

        player.destroy();
        player.lives -= 1;
        dieSound.play();

        if(player.lives < 0) gameOver();
        else window.setTimeout(function() {
            UI.draw();
            player.init();
        }, 500)
    }
});
Matter.Events.on(engine, 'collisionActive', function(e){
    for(var i in e.pairs){
        var pair = e.pairs[i];
        if(!(pair.bodyA.label == 'enemy' || pair.bodyB.label == 'enemy'))
        continue;
        if(!(pair.bodyA.label == 'bottom' || pair.bodyB.label == 'bottom'))
        continue;

        if(playing){
          window.setTimeout(gameOver, 200);
          music.pause();
        }
    }
});

function gameOver(){
    playing = false;

    music.pause();

    window.render = function(){};
    window.update = function(){
        if(IO.isTapped(13)) location.reload();
    };

    Canvas.applyToAll('clear');

    for(var i in Subsystems) if(Subsystems[i].gameOver) Subsystems[i].gameOver();
}

function gameWin(){
    playing = false;
    music.pause();
    window.render = function(){};
    window.update = function(){
      if(IO.isTapped(13)) location.reload();
    };

    Canvas.applyToAll('clear');

    for(var i in Subsystems) if(Subsystems[i].gameWin) Subsystems[i].gameWin();
}

$(document).ready(init);
