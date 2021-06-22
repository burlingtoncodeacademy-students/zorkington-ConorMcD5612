const { read } = require("fs");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


//State machine
// let roomStates = {
//     startingRoom: ['next room'],
//     nextRoom: ['starting room']
// }
// Have the player go into the next room

start();

let player = {
    inventory: ['lint'],
    location: 'startingroom'
}





class Item {
  constructor(name, description, actions, takeable, locked) {
    this.name = name;
    this.description = description;
    this.actions = actions || "none";
    this.takeable = takeable || false
    this.locked = locked || true;
  }

  async type() {
    let puzzleAnswer = await ask("Please enter pass code");

    if (puzzleAnswer === "12345") {
      door.locked = false;
      console.log("The door unlocks");
      
    } else {
      console.log("Wrong passcode");
    }
  }

  open() {
    if (!this.locked) {
      console.log(`You open ${this.name}, and enter`);
      //if door is open we want to go to a different room

    } else {
      
      console.log(
        `Hey, you can\'t open this ${this.name} right now! It needs to be unlocked`
      );
      //will have to have open change states
    }
  }

  describe() {
    console.log(this.description);
  }
// else if (player.inventory.includes(this))

  take() {
    
    if (!this.takeable) {
        
        if(player.inventory.includes(this.name)){
            console.log(`You already took the ${this.name}!`)
        } else {
            console.log(`Hey, you can\'t take the ${this.name}!`);
        }
      
    } else if(this.name === 'inventory'){
        console.log(`You currently have: ${player.inventory.join(', ')} in your inventory`)
    } else {
      console.log(`You take the ${this.name}, and put it in your inventory`)
      this.takeable = false
      player.inventory.push(this.name)
      console.log(player.inventory);
    }
  }

  drop(){
      console.log(roomLookUp[player.location].roomInventory)
      if(player.inventory.includes(this.name)){
          // console.log(roomLookUp[player.location].roomInventory.push(this.name))
          // roomLookUp[player.location].roomInventory.push(this.name)
          // console.log(roomLookUp[player.location].roomInventory)
          // console.log(player.inventory.splice(player.inventory.indexOf(this.name), 1))
          // player.inventory.splice(player.inventory.indexOf(this.name), 1)
          
          // going to use filter
          // player.inventory.filter((droppedItem) => )
          console.log(`You drop the ${this.name}`)
      } else {
          console.log(`You don\t have ${this.name} in your inventory`)
      }
  }
}

class Room {
    constructor(name, description, altRooms, roomInventory){
        this.name = name
        this.description = description;
        this.altRooms = altRooms
        this.roomInventory = roomInventory;
        
    }

}

// if (roomlookup(player.location).roominventory.includes('answer[1]'))





let startingRoom = new Room(
    'startingroom',
    '182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle.On the door is a handwritten sign.  >_',
    ['nextroom', 'startingroom'],
    ['door', 'keypad', 'sign', 'inventory']

);

let nextRoom = new Room(
    'nextroom',
`You are in a foyer. Or maybe it\'s an antechamber. 
Or a vestibule.  
Or an entryway.  
Or an atrium.  
Or a narthex. 
But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer.
In Vermont, this is pronounced "FO-ee-yurr". Anyways, it\'s definitely not a mudroom. A copy of Seven Days lies in a corner.`,
    ['startingroom', 'nextroom'],
    ['paper', 'inventory']
)

let door = new Item(
  "door",
  "This door is the entrance to burlington code academy",
  ["describe", "open"],
  false,
  true,
);

let keypad = new Item(
  "keypad",
  "Its a lockpad that takes a passcode",
  ["type", "take"],
  false,
  true
);

let sign = new Item(
  "sign",
  'The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.',
  ["describe", "take"],
  false
);

let paper = new Item(
    'paper',
    'A copy of Seven Days, Vermont\'s Alt-Weekly',
    ["take", "describe", "drop"],
    true
);

let inventory = new Item(
    'inventory',
    'Your pocket (it\'s a pretty big pocket)',
    ['take', 'describe'],
    true
)


//I think I can make it so that the items are seperated into rooms

let itemLookUp = {
  sign: sign,
  door: door,
  keypad: keypad,
  paper, paper,
  inventory: inventory
  // key is string val is object/class instance
};

let roomLookUp = {
    'nextroom': nextRoom,
    'startingroom': startingRoom,
    
};


function changeRooms(nextRoom){
    
    if(roomLookUp[nextRoom].altRooms.includes(nextRoom)){
        player.location = nextRoom
        console.log(roomLookUp[nextRoom].description)
      } else {
        console.log('ERROR, ERROR, INVALID FORM')
      }
}


async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.
>_`;


  let answer = await ask(welcomeMessage);
  
  while (answer !== "exit") {
    // .split answer to get item.action == answer[0] and item.name = answer[1]
    
    answer = answer.split(" ");
    // console.log(player.location)
    // console.log(roomLookUp[player.location])
    // guard clause incase user inputs an item that doesn't exist in the lookup table/ only inputs one word 
    if (itemLookUp[answer[1]] === undefined) {
      console.log(`sorry I don't understand what that means`);
    // Checks if the item the user inputted has the user inputted action in the actions array
    } else if (itemLookUp[answer[1]].actions.includes(answer[0]) && roomLookUp[player.location].roomInventory.includes(answer[1])) {
    // If true the currentItem we're looking at is = itemLookUp[answer[1]]
      currentItem = itemLookUp[answer[1]];
      
    // then we want to call the valid user inputted action on the item were accessing  ex. if user inputs describe sign = await sign.describe()
        // console.log(currentItem)
      await currentItem[answer[0]]();
    //   console.log(roomLookUp['nextroom'])
    //   console.log(answer[0])
    //If door is unlocked and user calls open on door change rooms
      if (currentItem.locked === false && answer[0]=== 'open'){
        
        changeRooms('nextroom')
        // changeRooms()
      }
    } else {
    // if user inputs a string that can be split on a space, but isn't a valid action
      console.log(`you cant ${answer[0]} a ${answer[1]}`);
    }

    answer = await ask(">_");
  }
  process.exit();
}
