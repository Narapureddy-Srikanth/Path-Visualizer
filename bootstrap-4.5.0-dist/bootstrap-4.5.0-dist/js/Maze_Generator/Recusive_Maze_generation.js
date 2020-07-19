
var array = [];

function ispossible(x, y){
	for(let i = 0; i < array.length; i++){
		if(array[i][0] == x && array[i][1] == y){
			return true;
		}
	}
	return false;
}

function recusion(){
	var stack = [[[1,1], [rows - 2, columns - 2]]];
	array.push(find_state('s'));
	array.push(find_state('f'));

	function maze_animation(){
		if(stack.length > 0){
			draw();
			var top = stack.pop();
			var s_x = top[0][0];
			var s_y = top[0][1];
			var e_x = top[1][0];
			var e_y = top[1][1];
			var width = e_y - s_y;
			var height = e_x - s_x;
			if(height >= 2 && width >= 2){
				var orientation = "";
				if(width > height){
					orientation = "VERTICAL";
				}
				else if(width < height){
					orientation = "HORIZONTAL";
				}
				else{
					let rand_val = rand(1, 2);
					if(rand_val == 1)
						orientation = "VERTICAL";
					else
						orientation = "HORIZONTAL";
				}

				if(orientation == "HORIZONTAL"){
					let count = 0;
					do{
						count ++;
						var rand_row = rand(s_x + 1, e_x - 1);
					}while(count < 100 && (ispossible(rand_row, s_y - 1) || ispossible(rand_row, e_y + 1)))

					if(count < 100){

						let hole_col = rand(s_y, e_y);

						for(let i = s_y; i <= e_y; i++){
							if(hole_col == i){
								continue;
							}
							if(grid[rand_row][i].state == 'f' || grid[rand_row][i].state == 's')
								continue;
							grid[rand_row][i].state = 'w';
						}
						array.push([rand_row, hole_col]);
						stack.push([[s_x, s_y],[rand_row - 1, e_y]]);
						stack.push([[rand_row + 1, s_y],[e_x, e_y]]);
					}
				}

				else{
					let count = 0;
					do{
						count++;
						var rand_col = rand(s_y + 1, e_y - 1);
					}while(count < 100 && (ispossible(s_x - 1, rand_col) || ispossible(e_x + 1, rand_col)))

					if(count < 100){

						let hole_row = rand(s_x, e_x);

						for(let i = s_x; i <= e_x; i++){
							if(hole_row == i){
								continue;
							}
							if(grid[i][rand_col].state == 'f' || grid[i][rand_col].state == 's')
								continue;
							grid[i][rand_col].state = 'w';
						}
						array.push([hole_row,rand_col]);
						stack.push([[s_x, s_y], [e_x, rand_col - 1]]);
						stack.push([[s_x, rand_col + 1],[e_x, e_y]]);
					}
				}
			}
			requestAnimationFrame(maze_animation);
		}
	}
	requestAnimationFrame(maze_animation);
}	

function Maze_generator(){
	reset();
	document.getElementById("output").innerHTML = "Maze is generated using recursive division algorithm..."
	for(let i = 0; i < columns; i++){
		if(grid[0][i].state != 'f' && grid[0][i].state != 's'){
			grid[0][i].state = 'w';
		}
		if(grid[rows - 1][i].state != 'f' && grid[rows - 1][i].state != 's'){
			grid[rows - 1][i].state = 'w';
		}
	}
	for(let i = 0; i < rows; i++){
		if(grid[i][0].state != 'f' && grid[i][0].state != 's'){
			grid[i][0].state = 'w';
		}
		if(grid[i][columns - 1].state != 'f' && grid[i][columns - 1].state != 's'){
			grid[i][columns - 1].state = 'w';
		}
	}
	recusion();
}
