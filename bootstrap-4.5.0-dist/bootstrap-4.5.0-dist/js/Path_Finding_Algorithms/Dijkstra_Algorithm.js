
var queue = [];

function find_min_and_delete_it_(){

	let weight = queue[0];
	let idx = 0;
	for(let i = 1; i < queue.length; i++){
		if(weight[2] > queue[i][2]) {
			weight = queue[i];
			idx = i;
		}
	}
	queue.splice(idx, 1);
	return weight;
}

function Dijkstra(){
	reset_paths();
	document.getElementById("output").innerHTML = "Dijkstra's algorithm guarantees the shortest path for both un/weighted walls..."
	var dir = [[1,0],[-1,0],[0,1],[0,-1]];
	var char = ['R', 'L', 'D', 'U'];

	var start = find_state('s');
	// starting with empty queue
	while(queue.length > 0)
		queue.pop();
	queue.push([start[0], start[1], 0]);
	var done = false;

	function animate(){
		if(queue.length > 0 && !done){
			draw();
			var ref = find_min_and_delete_it_();
			var x = ref[0];
			var y = ref[1];
			if(grid[x][y].state != 'f' && grid[x][y].state != 's')
				grid[x][y].state = 'v';

		    for(let i = 0; i < dir.length; i++){
		        var xx = x + dir[i][0];
		        var yy = y + dir[i][1];
		        if(0 <= xx && xx < rows && 0 <= yy && yy < columns && grid[xx][yy].state == 'f'){
		        	grid[xx][yy].direction = char[i];
		        	draw_path();
		        	done = true;
		        }
		        if(0 <= xx && xx < rows && 0 <= yy && yy < columns && grid[xx][yy].state == 'e'){
		        	queue.push([xx, yy, 0]); // upon update of weighted wall add weight here
		        	grid[xx][yy].state = 't';
		        	grid[xx][yy].direction = char[i];
		        }
		    }
		    requestAnimationFrame(animate);
		}
	}
	requestAnimationFrame(animate);
}