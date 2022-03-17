const GRID_SIZE = 21


//function to get random position on grid for food spawn
export function randomGridPosition(){
    return{
        x: Math.floor(Math.random() * GRID_SIZE) +1,
        y: Math.floor(Math.random() * GRID_SIZE) +1
    }
}

//function to check if snake has crossed outside the grid
export function outsideGrid(position){
    return(
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}