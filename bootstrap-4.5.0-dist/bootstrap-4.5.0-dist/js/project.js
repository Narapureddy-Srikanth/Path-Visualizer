
//const lib = require("./Path_Finding_Algorithms/breath_first_search");

//Maximum number of rows and coloums
rows = 20;
columns = 50;

// Dimensions of a unit
const box = 30;
var grid = [];
// Creating the grid 
function initialization() {
    for(let r = 0; r < rows; r++){
        grid[r] = [];
        for(let c = 0; c < columns; c++){
            grid[r][c] = {x : c*box, y : r*box, state : "e", direction : "UD", done : "false"};
        }
    }
    // some random start and end positions...

    grid[rand(0, rows / 2)][rand(0, columns / 2)].state = "s";
    grid[rand(rows / 2 + 1, rows - 1)][rand(columns / 2 + 1, columns - 1)].state = "f";    
}



window.render  = function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    // jQuery to show and hide the instruction bar...
    $(document).ready(function(){
      $("#hide").click(function(){
        $("#instructions_panel").hide();
      });
      $('.aaf').on("click",function(){
        $("#instructions_panel").show();    
      });
    });

    canvas.width = document.documentElement.clientWidth * 0.98;
    canvas.height = document.documentElement.clientHeight * 0.8;

    rows = Math.floor(canvas.height / box);
    columns = Math.floor(canvas.width / box);
    initialization();
  // output = document.getElementById("outcome");
	canvas.onmousedown = onDown;
	canvas.onmouseup = onUp;
	return setInterval(draw, 1);
}

// on load and resize
window.onresize = render;
window.onload = render;

/*
Possible States :
	start --> s
	end --> f
	empty --> e
	wall --> w
	visited --> v
    To be evaluated --> t
	path --> p
Possible directions :
	up --> U
	down --> D
	left --> L
	right --> R
	undefined --> UD
*/
var start = new Image();
start.src = "images/start.svg";

var finish = new Image();
finish.src = "images/finish.svg";

var path = new Image();
path.src = "images/path.svg";


var wall = new Image();
wall.src = "images/wall.svg";

var dx = [0, 0, -1, 1];
var dy = [-1, 1, 0, 0];

function colour(s, e, state, x, y){
    if(state == 's'){
        ctx.fillStyle = "#4F5D67";
        for(var i = 0; i < 4; i++) {
            var nx = dx[i] + x;
            var ny = dy[i] + y;
            if(nx < 0 || nx >= rows || ny < 0 || ny >= columns)
                continue;

            if(grid[nx][ny].state == 'v'){ 
                ctx.fillStyle = "LightBlue";
            }
            else if(grid[nx][ny].state == 'p'){
                ctx.fillStyle = "#8c1c6c";
                break;
            }
        }
        ctx.fillRect(s, e, box, box);
        ctx.drawImage(start, s, e, box, box);
    }
    else if(state == 'f'){
    	ctx.fillStyle = "#4F5D67";
        for(var i = 0; i < 4; i++) {
            var nx = dx[i] + x;
            var ny = dy[i] + y;
            if(nx < 0 || nx >= rows || ny < 0 || ny >= columns)
                continue;

            if(grid[nx][ny].state == 'v'){ 
                ctx.fillStyle = "LightBlue";
            }
            else if(grid[nx][ny].state == 'p'){
                ctx.fillStyle = "#8c1c6c";
                break;
            }
        }
        ctx.fillRect(s, e, box, box);
        ctx.drawImage(finish, s, e, box, box);
    }
    else if(state == 'e'){
        ctx.fillStyle = "#4F5D67";
        ctx.fillRect(s, e, box, box);
    }
    else if(state == 'w'){
        // ctx.fillStyle = "Gray";
        // ctx.fillRect(s, e, box, box);
        ctx.drawImage(wall, s, e, box, box);
    }
    else if(state == 'v'){
        ctx.fillStyle = "LightBlue";
        ctx.fillRect(s, e, box, box);
    }
    else if(state == 'p'){
    	ctx.fillStyle = "#8c1c6c";
        ctx.fillRect(s, e, box, box);
        // ctx.drawImage(path, s, e, box, box);
    }
    else if(state == 't'){
        ctx.fillStyle = "Violet";
        ctx.fillRect(s, e, box, box);
    }
    else{
        ctx.fillStyle = "blue";
        ctx.fillRect(s, e, box, box);
    }
    ctx.strokeStyle = "white";
    ctx.strokeRect(s, e, box, box);
}



// Draw grid on canvas
function draw(){
    // Clears the screen
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var r = 0; r < rows; r++){
        for(var c = 0; c < columns; c++){
            if(grid[r][c].state == 'w' && grid[r][c].done[0] == 't')
                continue;
            else{
                if(grid[r][c].state == 'w')
                    grid[r][c].done = "true";
                else
                    grid[r][c].done = "false";
            }
            colour(grid[r][c].x, grid[r][c].y, grid[r][c].state, r, c);
        }
    }
}



function onUp() {
  canvas.onmousemove = null;
}

var prex = -1, prey = -1;
var pres = "e";
function onMove(event){
	
	let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;


    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(grid[r][c].x <= x && x < grid[r][c].x + box && grid[r][c].y <= y && y < grid[r][c].y + box){
            	if(grid[prex][prey].state == 's' || grid[prex][prey].state == 'f' 
                	&& (prex != r || prey != c)){
                	if(grid[r][c].state != 's' && grid[r][c].state != 'f'){
                		let temp = grid[prex][prey].state;
                		grid[prex][prey].state = pres;
	                    pres = grid[r][c].state;
	                    grid[r][c].state = temp; 
                	}
                }
            	else if(grid[r][c].state == 'e' && (prex != r || prey != c)){
                    grid[r][c].state = 'w';
                    canvas.onmousemove = onMove;
                }
                else if(grid[r][c].state == 'w' && (prex != r || prey != c)){
                    grid[r][c].state = 'e';
                    canvas.onmousemove = onMove;
                }
                prex = r; prey = c;
            }  
        }
    }
}

function onDown(event){

    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(grid[r][c].x <= x && x < grid[r][c].x + box && grid[r][c].y <= y && y < grid[r][c].y + box){
            	prex = r; prey = c;
            	if(grid[r][c].state == 'e'){
                    grid[r][c].state = 'w';
                }
                else if(grid[r][c].state == 'w'){
                    grid[r][c].state = 'e';
                }
                canvas.onmousemove = onMove;
            }  
        }
    }
}

function reset(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(grid[r][c].state != 's' && grid[r][c].state != 'f'){
                grid[r][c].state = 'e';
            }
        }
    }
}


function reset_paths(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(grid[r][c].state != 's' && grid[r][c].state != 'f' && grid[r][c].state != 'w'){
                grid[r][c].state = 'e';
            }
        }
    }
}

function find_state(state){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			if(grid[r][c].state === state)
				return [r, c];
		}
	}
	return [-1, -1];
}


function draw_path(){

	var dir = [[1,0],[-1,0],[0,1],[0,-1]];
	var char = ['R', 'L', 'D', 'U'];

	var final = find_state('f');
	var x = final[0], y = final[1];

	var path = [];

	while(grid[x][y].state != 's'){
		for(let j = 0; j < dir.length; j++){
            if(char[j] == grid[x][y].direction){
                x -= dir[j][0];
                y -= dir[j][1];
                break;
            }
        }
        path.push([x, y]);
	}
	var i = path.length - 2;
	function Todraw(){
		if(i >= 0){
			grid[path[i][0]][path[i][1]].state = 'p';
			draw(); i--;
			requestAnimationFrame(Todraw);
		}
	}
	requestAnimationFrame(Todraw);
}


function rand(low, high){
    return Math.ceil(low + (Math.random()*(high - low + 1))) - 1;
}

//!