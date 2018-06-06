var bullet_sprite = new Sprite('images/bullet.png');

function Projectile(entity, enemy = false){
    var offset;
    if(enemy) offset = -1;
    else offset = 1;
    
    var width = 6;
    var height = 16;
    var x = entity.physical.position.x - width / 2;
    var y = entity.physical.position.y - (enemy ? 0 : entity.height / 2) - offset * height;
    
    this.speed = enemy ? 6 : 12;
    this.speed *= offset;
    
    this.entity = new Entity(x, y, width, height, 
        {
            isSensor : true,
            label : enemy ? 'enemy_projectile' : 'projectile'
        });
    this.entity.sprite = bullet_sprite;
    this.entity.canvas = canvases.main;
    
    this.update = function(){
        Matter.Body.setVelocity(this.entity.physical, Matter.Vector.create(0, -this.speed));
        if(this.entity.physical.position.y < -height || this.entity.physical.position.y > window.innerHeight + height)
            this.destroy();
    };
    this.destroy = function(){
        for(var i in Entities) if(Entities[i] == this) Entities.splice(i - 1, 2);
    };
    
    Entities.push(this);
}