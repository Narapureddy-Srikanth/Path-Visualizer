

function Dfs(){
	reset_paths();
	document.getElementById("output").innerHTML = "Dfs does not guarantees the shortest..."

	var dir = [[1,0],[-1,0],[0,1],[0,-1]];
	var char = ['R', 'L', 'D', 'U'];

	var start = find_state('s');
	var queue = [start];
	var done = false;

	function animate(){
		if(queue.length > 0 && !done){
			draw();
			var ref = queue.pop();
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
		        if(0 <= xx && xx < rows && 0 <= yy && yy < columns && (grid[xx][yy].state == 'e' || grid[xx][yy].state == 't')){
		        	queue.push([xx, yy]);
		        	grid[xx][yy].state = 't';
		        	grid[xx][yy].direction = char[i];
		        }
		    }
		    requestAnimationFrame(animate);
		}
	}
	requestAnimationFrame(animate);
	if(!done){
		// TODO : print path not found
	}
}