
var anim_frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var game_width = 800;
var game_height = 600;
var pixel_width = 10;

var game_objects = {
};


window.onload = function(){
    $('#login-modal').modal('show');
    anim_frame(render);
};

function render(){
    ctx.moveTo(0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPixel(0, 0, "black");
    drawPixel(0, 1, "red");
    drawPixel(1, 0, "green");
    drawPixelRectange(1, 1, 2, 2, "blue");
    anim_frame(render);
}

function drawPixel(x, y, color){
    ctx.fillStyle=color;
    ctx.fillRect(x*pixel_width, game_height-(y+1)*pixel_width, pixel_width, pixel_width);
}

function drawPixelRectange(x1, y1, x2, y2, color){
    var minx=Math.min(x1, x2), miny=Math.min(y1, y2), maxx=Math.max(x1, x2), maxy=Math.max(y1, y2);
    ctx.fillStyle=color;
    ctx.fillRect(minx*pixel_width, game_height-(miny+2)*pixel_width, (maxx-minx+1)*pixel_width, (maxy-miny+1)*pixel_width);
}