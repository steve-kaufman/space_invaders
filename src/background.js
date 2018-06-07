var background = {
    frame : 0,
    speed : 2,
    sprite : new Sprite('images/background.png'),
    render : function(){
        canvases.background.ctx.clear();
        this.sprite.drawPattern(0, this.frame - this.sprite.image.height,
            window.innerWidth,
            window.innerHeight + this.sprite.image.height, canvases.background);
        this.frame = (this.frame + this.speed) % this.sprite.image.height;
        Canvas.save();
        canvases.background.ctx.globalAlpha = 0.05;
        canvases.background.ctx.fillStyle = 'green';
        canvases.background.ctx.fillRect(0, bottom.vertices[0].y,
          window.innerWidth, 10);
        Canvas.restore();
    },
    gameOver : function(){
        canvases.background.ctx.clear();
        canvases.background.ctx.globalAlpha = 0.9;
        this.sprite.drawPattern(0, 0, window.innerWidth, window.innerHeight, canvases.background);
        canvases.background.ctx.fillStyle = 'black';
        canvases.background.ctx.fillRect(0, window.innerHeight * 0.2, window.innerWidth, window.innerHeight * 0.4)
        gameoverImg.draw(window.innerWidth / 2 - gameoverImg.image.width / 2,
            window.innerHeight * 0.25, null, null, canvases.background);
    },
    gameWin : function(){
        canvases.background.ctx.clear();
        canvases.background.ctx.globalAlpha = 0.9;
        this.sprite.drawPattern(0, 0, window.innerWidth, window.innerHeight, canvases.background);
        canvases.background.ctx.fillStyle = 'black';
        canvases.background.ctx.fillRect(0, window.innerHeight * 0.2, window.innerWidth, window.innerHeight * 0.4)
        gamewinImg.draw(window.innerWidth / 2 - gamewinImg.image.width / 2,
            window.innerHeight * 0.25, null, null, canvases.background);
    }
};
Subsystems.push(background);
