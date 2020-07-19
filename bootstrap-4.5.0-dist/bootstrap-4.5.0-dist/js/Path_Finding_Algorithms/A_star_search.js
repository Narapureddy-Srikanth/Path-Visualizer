
var open = []; // all the nodes to be evaluated
var close = []; // the that are already evaluated

var start_idx;
var end_idx;

function g_cost(xx, yy){
	let x = Math.abs(xx - start_idx[0]);
	let y = Math.abs(yy - start_idx[1]);
	if(x < y){
		let temp = x;
		x = y;
		y = temp;
	}
	return 14*y + 10*Math.abs(x - y); 
}


function h_cost(xx, yy){
	let x = Math.abs(xx - end_idx[0]);
	let y = Math.abs(yy - end_idx[1]);
	if(x < y){
		let temp = x;
		x = y;
		y = temp;
	}
	return 14*y + 10*Math.abs(x - y); 
}

function get_dis(a, b, c, d){
	let x = Math.abs(a - c);
	let y = Math.abs(b - d);
	if(x < y){
		let temp = x;
		x = y;
		y = temp;
	}
	return 14*y + 10*Math.abs(x - y);
}

function find_min_and_delete_it(){

	let ref = open[0];
	let idx = 0;
	for(let i = 1; i < open.length; i++){
		if(open[i][2] < ref[2] || open[i][2] == ref[2] && open[i][3] < ref[3]){
			ref = open[i];
			idx = i;
		}
	}
	open.splice(idx, 1);
	return ref;
}	

function present_close(ref_x, ref_y){

	for(let i = 0; i < close.length; i++){
		if(close[i][0] == ref_x && close[i][1] == ref_y)
			return true;
	}
	return false;
}

function A_star(){
	reset_paths();
	document.getElementById("output").innerHTML = "A* search is smarter way to search and guarantees the shortest path for both un/weighted walls..."
	
	start_idx = find_state('s');
	end_idx = find_state('f');

	var start = find_state('s');
	open.push([start[0], start[1], 0, 0]);
	var done = false;
	var dir = [[1,0],[-1,0],[0,1],[0,-1]];
	var char = ['R', 'L', 'D', 'U'];

	function A_star_animation(){
		if(open.length > 0 && !done){

			let top = find_min_and_delete_it();

			close.push(top);

			let x = top[0]; 
			let y = top[1];

			if(grid[x][y].state == 'f'){
				done = true;
				draw_path();
				while(open.length > 0)
					open.pop();
				while(close.length > 0)
					close.pop();
			}
			if(!done && grid[x][y].state != 's')
				grid[x][y].state = 'v';

			for(let i = 0; i < dir.length && !done; i++){
				var xx = x + dir[i][0];
				var yy = y + dir[i][1];

				if(xx < 0 || xx >= rows || yy < 0 || yy >= columns)
					continue;

				if(present_close(xx,yy) || grid[xx][yy].state == 'w')
					continue;
				let gc = g_cost(xx, yy);
				let hc = h_cost(xx, yy);
				f_cost = gc + hc;

				let found = -1;
				for(let j = 0; j < open.length; j++){
					if(open[j][0] == xx && open[j][1] == yy){
						found = j;
					}
				}
				let value = g_cost(x, y) + get_dis(x, y, xx, yy);
				if(found == -1 || value < gc){
					grid[xx][yy].direction = char[i];
					if(found == -1)
						open.push([xx, yy, f_cost, hc]);
					else{
						open[found][2] = f_cost;
						open[found][3] = hc;
					}
					if(grid[xx][yy].state != 'f')
						grid[xx][yy].state = 't';
				}
			}
			requestAnimationFrame(A_star_animation);
		}
	}
	requestAnimationFrame(A_star_animation);	
}