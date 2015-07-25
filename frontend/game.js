
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
    anim_frame(render);
}

function drawPixel(x, y, color){
    ctx.fillStyle=color;
    ctx.fillRect(x*pixel_width, game_height-(y+1)*pixel_width, pixel_width, pixel_width);
}