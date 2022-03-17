let inputDirection = {x:0, y:0}
let lastInputDirection = {x:0, y:0}

//Basic event listener for controlling snake via arrow keys
//and not allowing 180 degree turns, e.g when snake is going right we cannot turn left directly etc.

window.addEventListener('keydown', e =>{

    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            inputDirection={x: 0, y: -1}
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection={x: 0, y: 1}
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            inputDirection={x: -1, y: 0}
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection={x: 1, y: 0}
            break
    }

})

export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}