//imports to make ask function work
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

//ask function prompts user for input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Calling start so the games runs
start();

// * CLASSES
class Item {
  //Constructing my item object
  constructor(name, description, actions, takeable, locked) {
    //Needs a name and description
    this.name = name;
    this.description = description;
    // dosen't always need to be takable, needs to be locked usually
    this.actions = actions || "none";
    this.takeable = takeable || false;
    this.locked = locked || true;
  }

  //This is the method to play the puzzle
  async type() {
    //Ask user for the passcode
    let puzzleAnswer = await ask("Please enter the pass code >_");
    // If the passcode is correct
    if (puzzleAnswer === "12345") {
      //Door unlocks
      door.locked = false;
      console.log("The door unlocks");
    } else {
      //Otherwise it says wrong passcode and the user needs to try and type the code again
      console.log("Wrong passcode");
    }
  }

  //Open method used to open door
  open() {
    //If user is trying to open a locked door tell them that they cant do that, I don't have my changerooms function in here
    if (this.locked) {
      console.log(
        `Hey, you can\'t open this ${this.name} right now! It needs to be unlocked`
      );
    }
  }

  //console logs the current items decription
  describe() {
    console.log(this.description);
  }

  //method to pick up objects and place into inventory
  take() {
    //if item is not takeable
    if (!this.takeable) {
      //if its already in player inventory
      if (player.inventory.includes(this.name)) {
        //tell user they already took the item
        console.log(`You already took the ${this.name}!`);
      } else {
        //otherwise tell them that the item isnt takeable
        console.log(`Hey, you can\'t take the ${this.name}!`);
      }
      //If user says take inventory
    } else if (this.name === "inventory") {
      //Tell them there inventory joined together
      console.log(
        `You currently have: ${player.inventory.join(", ")} in your inventory`
      );
      //if the item is takeable
    } else {
      //log what there putting in there inventory
      console.log(`You take the ${this.name}, and put it in your inventory`);
      // make them not be able to take the item again
      this.takeable = false;
      //take the room inventory array and splice off the item so its no longer in the array
      roomLookUp[player.location].roomInventory.splice(
        roomLookUp[player.location].roomInventory.indexOf(this.name),
        1
      );
      //push the item to the players inventory
      player.inventory.push(this.name);
    }
  }

  //method to take things out of player inventory
  drop() {
    //if player inventory has the object name in it
    if (player.inventory.includes(this.name)) {
      //this variable is the room inventory
      let roomInventoryArr = roomLookUp[player.location].roomInventory;

      //Item name inside of player inventory
      let inventoryItem = player.inventory.splice(
        player.inventory.indexOf(this.name),
        1
      );

      //Push player inventory item to the room inventory
      roomInventoryArr.push(inventoryItem.toString());

      //Make the item takeable
      this.takeable = true;
      console.log(`You drop the ${this.name}`);
    } else {
      console.log(`You don\`t have ${this.name} in your inventory`);
    }
  }
}

//Room with its description and rooms its aloud to change to, and what items it has in it
class Room {
  constructor(name, description, altRooms, roomInventory) {
    this.name = name;
    this.description = description;
    this.altRooms = altRooms;
    this.roomInventory = roomInventory;
  }
}

//Player object containing inventory and player location
let player = {
  inventory: ["lint"],
  location: "startingroom",
};

//Room objects
let startingRoom = new Room(
  "startingroom",
  "182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle.On the door is a handwritten sign.  >_",
  ["nextroom", "startingroom"],
  ["door", "keypad", "sign", "inventory"]
);

let nextRoom = new Room(
  "nextroom",
  `You are in a foyer. Or maybe it\'s an antechamber. 
Or a vestibule.  
Or an entryway.  
Or an atrium.  
Or a narthex. 
But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer.
In Vermont, this is pronounced "FO-ee-yurr". Anyways, it\'s definitely not a mudroom. A copy of Seven Days lies in a corner.`,
  ["startingroom", "north", "east", "west"],
  ["paper", "inventory", "door"]
);

let northRoom = new Room(
  "north",
  "The north room has some stuff in it, it doesn't really go anywhere Stuff = chair",
  ["nextroom"],
  ["chair", "door", "inventory"]
);

let eastRoom = new Room(
  "east",
  "You enter a lounge, theres a water cooler you can take some water if you like. Theres a book on the coffee table. Theres also a mysterious door in the back",
  ["nextroom", "mystery"],
  ["water", "book", "door", "inventory"]
);

let mysteryRoom = new Room(
  "mystery",
  "You enter a supply closet, congratulations you won the game! Theres all sorts of things you can take from here. Like half a bottle of windex (Theres only half a bottle of windex in this room)",
  ["nextroom"],
  ["windex", "door", "inventory"]
);

let westRoom = new Room(
  "west",
  "The room is dimly lit with a pedestal in the center, atop the pedestal is a bag of chips",
  ["nextroom"],
  ["chips", "door", "inventory"]
);

//Item objects

let water = new Item("water", "its water", ["describe", "take", "drop"], true);

let chips = new Item(
  "chips",
  "a bag of chips",
  ["describe", "take", "drop"],
  true
);

let door = new Item(
  "door",
  "This door is the entrance to burlington code academy",
  ["describe", "open"],
  false,
  true
);

let windex = new Item(
  "windex",
  "A half bottle of windex",
  ["take", "describe", "drop"],
  true
);

let chair = new Item(
  "chair",
  "Its a wooden chair",
  ["take", "describe", "drop"],
  true
);

let book = new Item(
  "book",
  "Eloquent javaScript by Marijin Haverbeke",
  ["take", "describe", "drop"],
  true
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
  "paper",
  "A copy of Seven Days, Vermont's Alt-Weekly",
  ["take", "describe", "drop"],
  true
);

let inventory = new Item(
  "inventory",
  "Your pocket (it's a pretty big pocket)",
  ["take", "describe"],
  true
);

//* LOOK UP TABLES

// key is string val is object/class instance
//item look up
let itemLookUp = {
  sign: sign,
  door: door,
  keypad: keypad,
  paper: paper,
  inventory: inventory,
  chair: chair,
  chips: chips,
  book: book,
  windex: windex,
  water: water,
};
// room look up
let roomLookUp = {
  nextroom: nextRoom,
  startingroom: startingRoom,
  north: northRoom,
  east: eastRoom,
  mystery: mysteryRoom,
  west: westRoom,
};

// * FUNCTIONS
//needs to be async so we can await user input
async function changeRooms() {
  let roomAnswer = await ask(
    `What door? Options: ${roomLookUp[player.location].altRooms.join(", ")} _>`
  );
  //Input sanitization loop for room answer if room object doesnt exist
  while (roomLookUp[roomAnswer] === undefined) {
    //tell user options when asking for input
    roomAnswer = await ask(
      `Thats not an option! Options: ${roomLookUp[
        player.location
        //Joining together the rooms player.location has acesss to
      ].altRooms.join(", ")}`
    );
  }

  //if user inputs an answer that is in altrooms of the current room
  if (roomLookUp[player.location].altRooms.includes(roomAnswer)) {
    //change player location to the room answer
    player.location = roomAnswer;
    //console.log room description
    console.log(roomLookUp[roomAnswer].description);
  } else {
    //Make user input a room that current room can change to/make user open door again
    console.log("please choose a valid room");
  }
}

//function where main gameplay loop lives
async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.
>_`;
  //ask for user input
  let answer = await ask(welcomeMessage);

  //gameplay loop
  while (answer !== "exit") {
    // .split answer to get item.action == answer[0] and item.name = answer[1]
    answer = answer.split(" ");
    // guard clause incase user inputs an item that doesn't exist in the lookup table/ only inputs one word
    if (itemLookUp[answer[1]] === undefined) {
      console.log(`sorry I don't understand what that means`);
      // Checks if the item the user inputted has the user inputted action in the actions array
    } else if (
      (itemLookUp[answer[1]].actions.includes(answer[0]) &&
        roomLookUp[player.location].roomInventory.includes(answer[1])) ||
      //Have to do this or block because were using the current rooms inventory and checking if it includes the item
      //meaning if we drop something in a different room then where it originally started it will not be able to be picked up and dropped
      (itemLookUp[answer[1]].actions.includes(answer[0]) &&
        answer[0] === "drop")
    ) {
      // If true the currentItem we're looking at is = itemLookUp[answer[1]]
      currentItem = itemLookUp[answer[1]];

      // then we want to call the valid user inputted action on the item were accessing  ex. if user inputs describe sign = await sign.describe()
      await currentItem[answer[0]]();
      //If door is unlocked and user calls open on door change rooms
      if (currentItem.locked === false && answer[0] === "open") {
        await changeRooms();
      }
    } else {
      // if user inputs a string that can be split on a space, but isn't a valid action
      console.log(`you cant ${answer[0]} a ${answer[1]}`);
    }
    //Ask the user for there next action
    answer = await ask(">_");
  }
  //if user enters exit break loop and exit program
  process.exit();
}
