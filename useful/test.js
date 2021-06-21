class Item {
    constructor(name, description, actions, takeable, locked) {
      this.name = name;
      this.description = description;
      this.actions = actions || "none";
      this.takeable = takeable || false
      this.locked = locked || false;
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
        this.locked = true;
        console.log(
          `Hey, you can\'t open this ${this.name} right now! It needs to be unlocked`
        );
        //will have to have open change states
      }
    }
  
    describe() {
      console.log(this.description);
    }
  
  
    take() {
      if (!this.takeable) {
        console.log(`Hey, you can\'t take the ${this.name}!`);
      } else {
        playerInventory.push(this.name);
        console.log(playerInventory);
      }
    }
  }
  
  class Room extends Item {
      constructor(name, description, altRooms, roomInventory){
          super(name, description);
          this.altRooms = altRooms
          this.roomInventory = roomInventory
      }
  
      changeRooms(nextRoom){
          if(this.altRooms.includes(nextRoom)) {
              this.form = nextForm
              console.log(`Transormed into ${nextForm}`)
            } else {
              console.log('ERROR, ERROR, INVALID FORM', nextForm)
            }
      }
  }
  
  let startingRoom = new Room(
      ['nextroom'],
      ['door', 'keypad', 'sign'],
      
  
  );
  
  let nextRoom = new Room(
      ['startingroom'],
      ['paper']
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

  console.log(nextRoom.name)