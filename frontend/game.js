
var anim_frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var game_width = 800;
var game_height = 600;
var pixel_width = 10;

var game_objects = [
    new Pixel(0, 0, "black"),
    new Pixel(0, 1, "red"),
    new Pixel(1, 0, "green"),
    new Pixel(0, 6, "black"),
    new Rectangle(1, 1, 6, 6, "blue")
];


window.onload = function(){
    //$('#login-modal').modal('show');
    anim_frame(render);
};

function render(time){
    ctx.moveTo(0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i<game_objects.length; i++){
        game_objects[i].draw();
    }
    anim_frame(render);
}

function drawPixel(x, y, color){
    ctx.fillStyle=color;
    ctx.fillRect(x*pixel_width, game_height-(y+1)*pixel_width, pixel_width, pixel_width);
}

function drawRectange(x1, y1, x2, y2, color){
    var minx=Math.min(x1, x2), miny=Math.min(y1, y2), maxx=Math.max(x1, x2), maxy=Math.max(y1, y2);
    ctx.fillStyle=color;
    ctx.fillRect(minx*pixel_width, game_height-(maxy+1)*pixel_width, (maxx-minx+1)*pixel_width, (maxy-miny+1)*pixel_width);
}

function Pixel(x, y, color){
    this.x=x;
    this.y=y;
    this.draw= function () {
        drawPixel(x, y, color);
    }
}

function Rectangle(x1, y1, x2, y2, color){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.color=color;
    this.draw = function () {
        drawRectange(x1, y1, x2, y2, color);
    }
}