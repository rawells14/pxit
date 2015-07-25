var anim_frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var game_width = 800;
var game_height = 600;
var pixel_width = 10;
var pixelsx = game_width / pixel_width;
var pixelsy = game_height / pixel_width;
var acceleration = -.1;


window.onload = function () {
    //$('#login-modal').modal({
    //    backdrop: 'static',
    //    keyboard: false
    //});

    anim_frame(render);

};

function Pixel(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.draw = function () {
        drawPixel(this.x, this.y, this.color);
    }
}

function Rectangle(x1, y1, x2, y2, color) {
    this.minx = Math.min(x1, x2);
    this.miny = Math.min(y1, y2);
    this.maxx = Math.max(x1, x2);
    this.maxy = Math.max(y1, y2);
    this.color = color;
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.minx * pixel_width, game_height - (this.maxy + 1) * pixel_width,
            (this.maxx - this.minx + 1) * pixel_width, (this.maxy - this.miny + 1) * pixel_width);
    }
}

function Player(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.y_velocity=0;
    this.x_velocity=0;
    this.jumping=false;
    this.draw = function () {
        drawPixel(this.x, this.y, this.color);
    };
}

var keys_pressed = {};

window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: // left arrow
            keys_pressed["left"] = true;
            break;
        case 38: // up arrow
            keys_pressed["up"] = true;
            break;
        case 39: // right arrow
            keys_pressed["right"] = true;
            break;
        case 40: // down arrow
            keys_pressed["down"] = true;
            break;
        case 65: // left a
            keys_pressed["left"] = true;
            break;
        case 87: // up w
            keys_pressed["up"] = true;
            break;
        case 68: // right d
            keys_pressed["right"] = true;
            break;
        case 83: // down s
            keys_pressed["down"] = true;
            break;
    }
});

window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 37: // left arrow
            keys_pressed["left"] = false;
            break;
        case 38: // up arrow
            keys_pressed["up"] = false;
            break;
        case 39: // right arrow
            keys_pressed["right"] = false;
            break;
        case 40: // down arrow
            keys_pressed["down"] = false;
            break;
        case 65: // left a
            keys_pressed["left"] = false;
            break;
        case 87: // up w
            keys_pressed["up"] = false;
            break;
        case 68: // right d
            keys_pressed["right"] = false;
            break;
        case 83: // down s
            keys_pressed["down"] = false;
            break;
    }
});

var player = new Player(1, 31, "black");

var game_objects = {
    players: [
        player
    ],
    collide: [
        new Rectangle(0, 0, pixelsx, pixelsy / 2, "green")
    ],
    background: []
};


function draw(obj) {
    obj.draw();
}

function render(time) {
    if (keys_pressed["up"]) {
        if(!player.jumping) {
            player.jumping = true;
            player.y_velocity = 1;
        }
    }
    //if (keys_pressed["down"]) {
    //    player.y -= player_speed;
    //}
    if (keys_pressed["right"]) {
        player.x_velocity = .5;
    }else if (keys_pressed["left"]) {
        player.x_velocity = -.5;
    }else{
        player.x_velocity=0;
    }
    if(player.jumping){
        player.y_velocity+=acceleration;
    }
    player.y+=player.y_velocity;
    player.x+=player.x_velocity;
    //check collision
    ctx.moveTo(0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game_objects.background.map(draw);
    game_objects.players.map(draw);
    game_objects.collide.map(draw);
    anim_frame(render);
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixel_width, game_height - (y + 1) * pixel_width, pixel_width, pixel_width);
}

function drawRectange(x1, y1, x2, y2, color) {
    var minx = Math.min(x1, x2), miny = Math.min(y1, y2), maxx = Math.max(x1, x2), maxy = Math.max(y1, y2);
    ctx.fillStyle = color;
    ctx.fillRect(minx * pixel_width, game_height - (maxy + 1) * pixel_width, (maxx - minx + 1) * pixel_width, (maxy - miny + 1) * pixel_width);
}

