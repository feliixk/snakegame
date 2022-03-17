import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

const foodType = ['food', 'foodApple']

let score = 0
let food = getRandomFoodPos()
let selectedFoodType = selectFoodType()
let EXPANSION_RATE = 1
let SCORE_RATE = 1

export function update(){
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPos()
        selectedFoodType = selectFoodType()
        score += SCORE_RATE
    }

}

export function draw(gameBoard){

    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x

    if (selectedFoodType == 'food'){
        foodElement.classList.add('food')
        EXPANSION_RATE = 1
        SCORE_RATE = 1
    }else{
        foodElement.classList.add('foodApple')
        EXPANSION_RATE = 3
        SCORE_RATE = 3
    }
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPos(){
    let newFoodPosition
    while(newFoodPosition == null ||onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

function selectFoodType(){

    let number = Math.random() * 100
    let selectedFood

    if (number < 85){
        selectedFood = foodType[0]
    }else{
        selectedFood = foodType[1]
    }
    return selectedFood
}

export function getScore(){
    return score
}