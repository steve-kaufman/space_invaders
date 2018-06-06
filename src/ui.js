var UI = {
    width : 32,
    height : 32,
    offsetX : 0.1,
    offsetY : 0.1,
    draw : function(){
        canvases.UI.ctx.clear();
        canvases.UI.ctx.save();
        for(var i = 0; i < player.lives; i++){
            lifeImg.draw(
                window.innerWidth - window.innerWidth * UI.offsetX + i * UI.width,
                window.innerHeight - window.innerHeight * UI.offsetY,
                UI.width, UI.height, canvases.UI
            );
        }
        canvases.UI.ctx.font = '28px Monospace';
        canvases.UI.ctx.fillStyle = 'white';
        canvases.UI.ctx.fillText('SCORE: ' + score, 
        window.innerWidth * 0.05, 
        window.innerHeight - window.innerHeight * 0.12);
        canvases.UI.ctx.restore();
    },
    gameOver : function(){
        
    }
};