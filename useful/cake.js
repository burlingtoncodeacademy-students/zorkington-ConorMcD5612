class Cake{
    
    constructor(flavor, icing ='no', decoration ='no decorations') {
        this.flavor = flavor 
        this.icing = icing  
        this.decoration = decoration 

    

    describe(num = 1) {
       return console.log(`it is a ${num} ${this.flavor} cake ${num > 1? 's' : ''} with ${this.icing} frosting, and ${this.decoration}`)
    }
    
}


let myCake = new Cake("vanilla", "choclate", "sprinkles")

console.log(myCake.describe())

let cakeTwo = new Cake

console.log(cakeTwo.defualtCake())

console.log(cakeTwo)

let cakeThree = new Cake