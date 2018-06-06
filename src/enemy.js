var Enemy = {
    array : {
        width : 12,
        height : 6,
        offsetX : 0.125,
        offsetY : 0
    },
    
    direction : [0, 0],
    
    sprites : [
        new Sprite('images/invader/1.png')
        ],
    
    entities : [],
    
    init : function(){
        this.width = Math.round(window.innerWidth * 0.75 / this.array.width);
        this.height = Math.round(window.innerHeight * 0.5 / this.array.height);
        this.paddingX = this.width / 2 - 16;
        this.paddingY = this.height / 2 - 16;
        for(var i = 0; i < this.array.height; i++){
            this.entities.push([]);
            for(var j = 0; j < this.array.width; j++){
                this.entities[i].push(this.create(j * this.width, i * this.height));
                this.entities[i][j].score = 10 * (6 - i);
                this.entities[i][j].sprite = this.sprites[0];
                this.entities[i][j].canvas = canvases.main;
            }
        }
        
        Entities.push(this);
    },
    create : function(x, y){
        return new Entity(
            x + window.innerWidth * this.array.offsetX + this.paddingX, 
            y + window.innerHeight * this.array.offsetY + this.paddingY,
            32, 32, 
            {
                isSensor : true,
                label : 'enemy'
            }
        );
    },
    
    counter : 0,
    
    update : function(){
        if(this.counter % 60 === 0){
            switch(this.counter / 60 % 6){
                case 5 : case 0 : this.direction = [this.width * 1.5, 0]; break;
                case 2 : case 3 : this.direction = [-this.width * 1.5, 0]; break;
                case 1 : case 4 : this.direction = [0, window.innerHeight / 48]; break;
            }
            for(var i in this.entities){
                for(var j in this.entities[i]){
                    Matter.Body.translate(this.entities[i][j].physical,
                        Matter.Vector.create(this.direction[0], this.direction[1]));
                    if(!Math.floor(Math.random() * this.array.width * this.array.height * 0.9)) 
                        new Projectile(this.entities[i][j], true);
                }
            }
        }
        
        for(var i in this.entities) for(var j in this.entities[i]){
            if(this.entities[i][j].physical.position.y > window.innerWidth * 0.5){
                gameOver();
                break;
            }
        }

        this.counter += 1;
    }
};