var Enemy = {
    array : {
        width : 12,
        height : 6,
        offsetX : 0.125,
        offsetY : 0
    },

    direction : [0, 0],

    speed : 1,

    animation : new Animation('images/invader.png', 2, 3),

    action : 0,

    init : function(){
        this.width = Math.round(window.innerWidth * 0.75 / this.array.width);
        this.height = Math.round(window.innerHeight * 0.5 / this.array.height);
        this.paddingX = this.width / 2 - 16;
        this.paddingY = this.height / 2 - 16;
        for(var i = 0; i < this.array.height; i++){
            for(var j = 0; j < this.array.width; j++){
                this.create(j * this.width, i * this.height, i);
            }
        }
    },
    create : function(x, y, tier){
        var entity = new Entity(
            x + window.innerWidth * this.array.offsetX + this.paddingX,
            y + window.innerHeight * this.array.offsetY + this.paddingY,
            32, 32,
            {
                isSensor : true,
                label : 'enemy'
            }
        );

        entity.score = 10 * (this.array.height - tier);
        entity.animation = this.animation;
        entity.canvas = canvases.main;
        return self;
    },

    counter : 1,

    update : function(){
        var win = true;

        if(this.counter > 60){
            this.counter = 0;
            this.action = (this.action + 1) % 6;
            switch(this.action){
                case 0 : case 1 : this.direction = [window.innerWidth * 0.1, 0]; break;
                case 3 : case 4 : this.direction = [-window.innerWidth * 0.1, 0]; break;
                case 2 : case 5 : this.direction = [0, window.innerHeight / 48];
                    break;
            }
            for(var i in Entities){
                    if(Entities[i].physical.label != 'enemy') continue;

                    Matter.Body.translate(Entities[i].physical,
                        Matter.Vector.create(this.direction[0], this.direction[1]));
                    if(!Math.floor(Math.random() * this.array.width * this.array.height * 0.9))
                        new Projectile(Entities[i], true);
            }

            background.speed *= 1.01;
        }

        for(var i in Entities){
            if(Entities[i].physical.label != 'enemy') continue;

            win = false;
            if(Entities[i].physical.position.y > window.innerWidth * 0.5){
                gameOver();
                break;
            }
        }

        this.counter += this.speed;

        if(win){
            levelUp();
        }

    },
    levelUp : function(){
        this.counter = 0;
        this.action = 0;
        if(!level % 3) this.array.height -= 1;
        else this.array.width -= 1;
        this.speed = 1 + level * 0.5;
        for(var i in Entities) if(Entities[i].label == 'enemy') Entities[i].destroy();
        this.init();
    }
};

Subsystems.push(Enemy);
