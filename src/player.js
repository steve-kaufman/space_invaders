var player = {
    width : 64,
    height : 64,
    speed : Math.round(window.innerWidth / 200),
    direction : null,
    
    lives : 3,
    
    animations : {
        normal : new Animation('images/ship.png', 5, 3, 60),
        explode : new Animation('images/ship_explode.png', 4, 5, 40, false)
    },
    
    frame : 0,
    
    keysEnabled : false,
    
    init : function(){
        if(this.entity) this.entity.destroy();
        this.entity = new Entity(window.innerWidth / 2 - this.width / 2,
            window.innerHeight * 0.85, this.width, this.height, {label : 'player'});
        this.entity.animation = this.animations.normal;
        this.physical = this.entity.physical;
        this.entity.canvas = canvases.main;
        this.keysEnabled = true;
        Subsystems.push(this);
    },
    update : function(){
        if(!this.entity.animation) player.init();
        
        if(!IO.isPressed(37) && !IO.isPressed(39)){
            this.direction = null;
        }
        else{
            for(var i in IO.keys){
                switch(IO.keys[i]){
                    case 37 : case 39 : this.direction = IO.keys[i]; break;
                }
            }
        }
        
        if(!this.keysEnabled) this.direction = null;
        
        switch(this.direction){
            case 37 : case 39 : Matter.Body.setVelocity(this.physical,
                Matter.Vector.create((this.direction - 38) * this.speed), 0); break;
            default : Matter.Body.setVelocity(this.physical,
                Matter.Vector.create(0, 0)); break;
        }
        if(IO.isTapped(32)) new Projectile(this.entity);
    },
    kill : function(){
        player.entity.animation = player.animations.explode;
        player.entity.frame = 0;
        player.lives -= 1;
        this.keysEnabled = false;
    },
    destroy : function(){
        for(var i in Subsystems) if(Subsystems[i] == this) Subsystems.splice(i, 1);
    },
    levelUp : function(){
        this.lives += 1;
    }
};