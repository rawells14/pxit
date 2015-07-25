

var anim_frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");


window.onload = function(){
    console.log("asdf");
    anim_frame(render);

};

function render(){
    ctx.moveTo(0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anim_frame(render);
}