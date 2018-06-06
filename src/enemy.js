var Enemy = {
    array : {
        width : 12,
        height : 1,
        offsetX : 0.125,
        offsetY : 0
    },
    
    direction : [0, 0],
    
    speed : 1,
    
    sprites : [
        new Sprite('images/invader/1.png')
        ],
    

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
        var self = new Entity(
            x + window.innerWidth * this.array.offsetX + this.paddingX, 
            y + window.innerHeight * this.array.offsetY + this.paddingY,
            32, 32, 
            {
                isSensor : true,
                label : 'enemy'
            }
        );
        
        self.score = 10 * (this.array.height - tier);
        self.sprite = this.sprites[0];
        self.canvas = canvases.main;
        return self;
    },
    
    counter : 0,
    
    update : function(){
        var win = true;
        
        if(this.counter % 60 === 0){
            switch(this.counter / 60 % 6){
                case 5 : case 0 : this.direction = [window.innerWidth * 0.1, 0]; break;
                case 2 : case 3 : this.direction = [-window.innerWidth * 0.1, 0]; break;
                case 1 : case 4 : this.direction = [0, window.innerHeight / 48 * this.speed]; 
                    break;
            }
            for(var i in Entities){
                    if(Entities[i].physical.label != 'enemy') continue;
                    
                    Matter.Body.translate(Entities[i].physical,
                        Matter.Vector.create(this.direction[0], this.direction[1]));
                    if(!Math.floor(Math.random() * this.array.width * this.array.height * 0.9)) 
                        new Projectile(Entities[i], true);
            }
        }
        
        for(var i in Entities){
            if(Entities[i].physical.label != 'enemy') continue;
            
            win = false;
            if(Entities[i].physical.position.y > window.innerWidth * 0.5){
                gameOver();
                break;
            }
        }
        
        if(win){
            this.speed *= 1.2;
            this.init();
            this.counter = 0;
            level += 1;
        }

        this.counter += 1;
    }
};

Subsystems.push(Enemy);