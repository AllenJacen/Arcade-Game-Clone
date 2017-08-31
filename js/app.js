//常量申明
/*
 count：是用来记时的，到达河岸就开始记时，count达到某个值才会使player复位。
 score：是用来记录成绩的。
 ROW：行宽
 COL：列宽
 ENEMYnumber:虫子的数量。
*/
var ENEMYnumber= 6,ENEMYx=-30,ENNEMYy=70,ROW=101,COL=83;var count= 0,score= 0;
var oScore;
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
        this.x=-101;
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
    this.indexX=3;
    this.indexY=6;
    this.sprite='images/char-cat-girl.png';
};
Player.prototype.resetPlayer=function(){
    this.x = ROW*2;
    this.y = COL*4+ENNEMYy;
    this.indexX=3;
    this.indexY=6;
};
Player.prototype.update=function(){
    if(this.y === -13){
    count++;
    if(count==20){
        score+=10;
       this.resetPlayer();
    }
        oScore=document.getElementById("scores");
        oScore.innerHTML=score;
        if(score==100){
            alert("成绩达到100分！通关");
            oScore.innerHTML=0;
            score=0;
            this.resetPlayer();
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
             if(this.x>0&&player.checkLeft()==true){
             this.x -=ROW ;
                 this.indexX--;
             }break;

            case'right':
             if(this.x<ROW*4&&player.checkRight()==true){
             this.x +=ROW ;
                 this.indexX++;
             }break;
            case'up':
             if(this.y>0&&player.checkUp()==true){
             this.y -=COL;
                 this.indexY--;
             }break;
            case'down':
             if(this.y<355&&player.checkDown()==true){
             this.y +=COL;
                 this.indexY++;
             }break;
        }

};
//此为玩家是否可以移动的函数
Player.prototype.checkLeft=function(){
    if(!getObjectByattr(this.indexX-1,this.indexY)){
        return true;
    }else{
        if(this.x-getObjectByattr(this.indexX-1,this.indexY).x>130){
            return true;
        }
        return false;
    }
};
Player.prototype.checkRight=function(){
    if(!getObjectByattr(this.indexX+1,this.indexY)){
        return true;
    }else{
        if(getObjectByattr(this.indexX+1,this.indexY).x-this.x>130){
            return true;
        }
        return false;
    }
};
Player.prototype.checkDown=function(){
    if(!getObjectByattr(this.indexX,this.indexY+1)){
        return true;
    }else{
        if(getObjectByattr(this.indexX,this.indexY+1).y-this.y>130){
            return true;
        }
        return false;
    }
};
Player.prototype.checkUp=function(){
    if(!getObjectByattr(this.indexX,this.indexY-1)){
            return true;
    }else{
        if(this.y-getObjectByattr(this.indexX,this.indexY-1).y>130){
            return true;
        }
        //console.log("buxing");
        return false;
    }

};
//此为通过坐标获取石头位置的函数
function getObjectByattr(x,y){
    for(var i=0;i<allRocks.length;i++){
        if(allRocks[i].indexX==x&&allRocks[i].indexY==y){
            return allRocks[i];
        }
    }
}
//此为游戏的碰撞检测
Player.prototype.checkCollisions= function(){
    oScore=document.getElementById("scores");
    oScore.innerHTML=score;
    for( var i=0;i<allEnemies.length;i++){
        if(this.y==allEnemies[i].y){
            if(Math.abs(this.x-allEnemies[i].x)<80){
              if(score!==0){
                  score-=10;
                  oScore.innerHTML=score;
              }else{
                  alert("重新开始游戏！");
                  score=0;
              }
                this.resetPlayer();
            }
        }
    }
};



//这是我的石头类
var Rock=function(x,y){
    this.x=x;
    this.y=y;
    this.indexX=this.x/ROW+1;
    this.indexY=(this.y-ENNEMYy)/COL+2;
    this.sprite='images/Rock-small.png';
};

//这部分是我在提交之后，自己修改的，但是看了导师审批后给的意见，感觉导师的性能更好。
// 记录石头个数
//var num=0;
//var x=0;
/*Rock.prototype.update= function (){
    if(score%10==0&&score!=0&&x<6){
        num++;
        console.log(num);
        if(num==3000&&x<6){
            allRocks.push(new Rock(ROW*Math.floor(Math.random()*5),COL* Math.floor(Math.random()*4)+ENNEMYy));
            x++;
        }
    if(num==3100){
        num=0;
    }
}
};*/

// 记录石头个数
var rockNum = 0;
// 设置计时器，大约每 1000ms 添加一个石头
var rockTimerId = window.setInterval(function(){
    rockNum++;
    var rock =new Rock(ROW*Math.floor(Math.random()*5),COL* Math.floor(Math.random()*4)+ENNEMYy);
    allRocks.push(rock);
}, 1000);
Rock.prototype.update=function(){
    if (rockNum > 4) {
        window.clearInterval(rockTimerId);
    }
};
Rock.prototype.render=function(){
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
var a=new Rock(ROW*Math.floor(Math.random()*5),COL* Math.floor(Math.random()*4)+ENNEMYy);
var b=new Rock(ROW*Math.floor(Math.random()*5),COL* Math.floor(Math.random()*4)+ENNEMYy);
allRocks.push(a);
allRocks.push(b);
//把所以石头放进一个叫allRocks的数组里面









// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



