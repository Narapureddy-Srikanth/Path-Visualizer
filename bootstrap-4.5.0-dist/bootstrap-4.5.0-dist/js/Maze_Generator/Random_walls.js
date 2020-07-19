
function random_walls(){

	document.getElementById("output").innerHTML = "Randomly walls are generated with 0.33 probability...";

	reset();

	for(let i = 0; i < rows; i++){
		for(let j = 0; j < columns; j++){
			if(grid[i][j].state == 's' || grid[i][j].state == 'f')
				continue;
			let rand_val = rand(0, 2);
			if(rand_val == 0){
				grid[i][j].state = 'w';
			}
		}
	}
	draw();
}