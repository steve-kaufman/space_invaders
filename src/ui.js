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
      var scoreText = 'SCORE: ' + score;
      var green = true;
      text = 'PRESS ENTER TO PLAY AGAIN';
      window.setInterval(function(){
        canvases.UI.ctx.clear();
        canvases.UI.ctx.font = "20px Monospace";
        green = !green;
        canvases.UI.ctx.fillStyle = green ? 'green' : 'black';
        canvases.UI.ctx.fillText(text, (window.innerWidth - text.length * 10) / 2, window.innerHeight * 0.45);
        canvases.UI.ctx.font = '30px Monospace';
        canvases.UI.ctx.fillStyle = 'blue';
        canvases.UI.ctx.fillText(scoreText, (window.innerWidth - scoreText.length * 10) / 2, window.innerHeight * 0.52);
      }, 500);
    },
    gameWin : function(){
      this.gameOver();
    }
};

Subsystems.push(UI);
