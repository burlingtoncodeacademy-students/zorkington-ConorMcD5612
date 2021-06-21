








let light = 'green'

let possibleChange = {
    green :['yellow', 'blinking green'],
    'blinking green': ['green'],
    yellow: ['red', 'blinking yellow'],
    'blinking yellow': ['yellow'],
    red: ['green', 'blinking red'],
    'blinking red': ['red']
}

function changeLight(newState) {
    if(possibleChange[light].includes(newState)){
        light = newState
        console.log(light)
    } else {
        console.log(`invalid state transition attempted: ${light} to ${newState}`)
    }
}

changeLight('yellow')
changeLight('red')
changeLight('blinking red')