var player = {
    width : 64,
    height : 64,
    speed : Math.round(window.innerWidth / 200),
    direction : null,
    
    lives : 3,
    
    frame : 0,
    
    init : function(){
        this.entity = new Entity(window.innerWidth / 2 - this.width / 2,
            window.innerHeight * 0.85, this.width, this.height, {label : 'player'});
        this.physical = this.entity.physical;
        this.entity.canvas = canvases.main;
        Subsystems.push(this);
    },
    update : function(){
        if(ship.loaded){
            this.frame = (this.frame + 1) % ship.sprites.length;
            this.entity.sprite = ship.sprites[this.frame];
        }
        
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
        switch(this.direction){
            case 37 : case 39 : Matter.Body.setVelocity(this.physical,
                Matter.Vector.create((this.direction - 38) * this.speed), 0); break;
            default : Matter.Body.setVelocity(this.physical,
                Matter.Vector.create(0, 0)); break;
        }
        if(IO.isTapped(32)) new Projectile(this.entity);
    },
    destroy : function(){
        for(var i in Subsystems) if(Subsystems[i] == this) Subsystems.splice(i, 1);
    }
};