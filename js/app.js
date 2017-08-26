//常量申明
/*
 count：是用来记时的，到达河岸就开始记时，count达到某个值才会使player复位。
 score：是用来记录成绩的。
*/
var ENEMYnumber= 6,ENEMYx=-30,ENNEMYy=70,ROW=101,COL=83;var count= 0,score=0;
var oScore;
var hinder;//障碍
// 这是我们的玩家要躲避的敌人
var Enemy = function(y,speed) {
    this.x=ENEMYx*Math.floor(Math.random()*10*speed);
    this.y=y;
    this.speed=Math.ceil(Math.random()*30*speed+60);
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    if(this.x<=550){
        this.x += dt*this.speed;
    }else{
        this.x=0;
    }
};
// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 现在实现你自己的玩家类
var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-cat-girl.png';
};
Player.prototype.update=function(dt){
    if(this.y === -13){
    count++;
    if(count==20){
        score++;
        this.x = ROW*2;
        this.y = COL*4+ENNEMYy;
    }
        oScore=document.getElementById("scores");
        oScore.innerHTML=score;
        if(score==10){
            alert("成绩达到10分！通关");
            oScore.innerHTML=0;
        }
    }
    if(this.x == ROW*2&&this.y == COL*4+ENNEMYy){
        count=0;
    }
};
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(movement){
        switch (movement){
            case'left':
                if(this.x>0){
                    if(this.y==hinder.y){
                        if(Math.abs(this.x-hinder.x)>130||this.x<hinder.x){
                            this.x -=ROW ;
                        }
                    }else{
                        this.x -=ROW ;
                    }
                }break;

            case'right':
                if(this.x<ROW*4){
                    if(this.y==hinder.y){
                        if(Math.abs(this.x-hinder.x)>130||this.x>hinder.x){
                            this.x +=ROW ;
                        }
                    }else{
                        this.x +=ROW ;
                    }
                }break;
            case'up':
                if(this.y>0){
                   if(this.x==hinder.x){
                       if(Math.abs(this.y-hinder.y)>130||this.y<hinder.y){
                           this.y -=COL;
                       }
                   }else{
                       this.y -=COL;
                   }
                }break;
            case'down':
                if(this.y<355){
                    if(this.x==hinder.x){
                        if(Math.abs(this.y-hinder.y)>130||this.y>hinder.y){
                            this.y +=COL;
                        }
                    }else{
                        this.y +=COL;
                    }
                }break;
            /* case'left':
             if(this.x>0){
             this.x -=ROW ;
             }break;*/

            /*case'right':
             if(this.x<ROW*4){
             this.x +=ROW ;
             }break;*/
            /*case'up':
             if(this.y>0){
             this.y -=COL;
             }break;*/
            /*case'down':
             if(this.y<355){
             this.y +=COL;
             }break;*/

        }

};
//此为游戏的碰撞检测
Player.prototype.checkCollisions= function(){
    oScore=document.getElementById("scores");
    oScore.innerHTML=score;
    for( var i=0;i<allEnemies.length;i++){
        if(this.y==allEnemies[i].y){
            if(Math.abs(this.x-allEnemies[i].x)<40){
              if(score!==0){
                  score--;
                  oScore.innerHTML=score;
              }else{
                  alert("重新开始游戏！");
                  score=0;
              }
                this.x = ROW*2;
                this.y = COL*4+ENNEMYy;
            }
        }
    }
};



//这是我的石头类
var Rock=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Rock-small.png';
};
Rock.prototype.Rplace= function(){

    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);

};

















// 现在实例化你的所有对象
var allEnemies=[];
for(var i=0;i<ENEMYnumber;i++){
   var a= new Enemy(COL* Math.floor(Math.random()*4)+ ENNEMYy, i);
    allEnemies.push(a);
}
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var player=new Player(ROW*2, COL*4+ENNEMYy);
// 把玩家对象放进一个叫 player 的变量里面

var allRocks=[];
for(var i=0;i<10;i++){
    var rock =new Rock(ROW*Math.floor(Math.random()*4),COL* Math.floor(Math.random()*4)+ENNEMYy);
    allRocks.push(rock);
}
//把所以石头放进一个叫allRocks的数组里面

/*while(score%10==0){
    allRocks[Math.ceil(Math.random()*10)].Rplace();
}*/
hinder=allRocks[1];













// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



