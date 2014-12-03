/**
 * Created by zqczqc on 2014/11/6.
 */

function createSnake(speed,cxt){
    this.cxt = cxt;
    this.speed = speed; // 移动速度
    this.body = 5; // 开始长度
    this.cell = 20; // 单元大小
    this.spath = []; // 蛇的路
    this.curdir = 39; // 方向
    this.food = null; // 食物位置
    this.initSnake = function () { // 初始化
        this.cxt.fillStyle = "#FF0000";
        this.cxt.fillRect(100,100,this.cell*this.body,this.cell);
        for(var i = 0; i < this.body; i ++) {
            this.spath.push({'x':100 + this.cell * i,'y':100});
        }
        var that=this;
        document.onkeydown = function (e) {
            if(e.keyCode >= 37 && e.keyCode <= 40 && Math.abs(e.keyCode - that.curdir) != 2) {
                that.curdir = e.keyCode;
            }
            else
                console.log('不能反方向走！');
            if(e.keyCode == 32)
                that.speed = speed/5;
        };
        document.onkeyup = function () {
            that.speed = speed;
        };
        this.startSnake();
        this.setFoot();
    };
    this.dirSnake = function (d) { // 控制方向
        var fpath = this.spath[this.spath.length - 1],
            x = fpath.x,
            y = fpath.y;
        switch(d){
            case 37: // 左
                x = fpath.x - this.cell;
                break;
            case 38: // 上
                y = fpath.y - this.cell;
                break;
            case 39: // 右
                x = fpath.x + this.cell;
                break;
            case 40: // 下
                y = fpath.y + this.cell;
                break;
        }
        return {'x':x,'y':y};
    };
    this.setFoot = function () {
        this.food = {'x':Math.ceil(Math.random() * 1000) % 40 * this.cell,
            'y':Math.ceil(Math.random() * 1000) % 20 *this.cell};
        this.cxt.fillStyle = "black";
        this.cxt.fillRect(this.food.x, this.food.y, this.cell, this.cell);
    };
    this.getFood = function (food) {
        this.cxt.fillStyle = "#FF0000";
        this.cxt.fillRect(food.x, food.y, this.cell, this.cell);
        this.spath.push(food);
    };
    this.moveSnake = function (dir) {
        this.getFood(dir); // 借用吃食物的操作
        var old = this.spath.shift();
        this.cxt.clearRect(old.x, old.y, this.cell, this.cell);
    };
    this.isMoveFail = function (dir) {
        if(dir.x >= 800 || dir.x < 0 || dir.y >= 400 || dir.y < 0)
            return true;
        for(var i = 0; i < this.spath.length; i ++){
            if(dir.x == this.spath[i].x && dir.y == this.spath[i].y)
                return true;
        }
        return false;
    };
    this.startSnake = function () {
        var that = this;
        setTimeout(function () {
            var dir = that.dirSnake(that.curdir);
            if (that.isMoveFail(dir)) {
                alert('你挂啦！');
                return;
            }
            if (dir.x == that.food.x && dir.y == that.food.y) {
                that.getFood(that.food);
                that.setFoot();
            }
            that.moveSnake(dir);
            that.startSnake();
        }, this.speed);
    };
}

var c = document.getElementById('snake');
var cxt = c.getContext('2d');
var snake = new createSnake(150,cxt);
snake.initSnake();
