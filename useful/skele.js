const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `You wake up in a dimly lit, massive, filthy room. 
It's covered in moss, broken stone and rubble. 
Through the darkness you see entrance ways in each cardinal direction, as well as a glistening sword buried in stone in the center of the room.
>_`;
  let answer = await ask(welcomeMessage);
  while (answer !== 'exit'){
    answer = await ask('>_')
  }
  process.exit()
  
}

class Room{ 
  constructor(roomName, connectedRooms, roomDescription, roomInventory){
    this.roomName = roomName;
    this.connectedRooms = connectedRooms;
    this.roomDescription = roomDescription;
    this.roomInventory = roomInventory;
  }



  changeRooms(nextRoom){
    if()
  }

}

// Making room objects (6)


let starterRoom = new Room(
  'starter room',
  ['north room', 'east room', 'south room', 'west room'],
  '',
  'Diamond Sword'
);

// let northRoom = new Room(
//   'north room',
//   ['starter room'],
//   ''
// )

class Player{
  constructor(name, health, equippedWeapon, buffStatus){
    this.name = name;
    this.health = health;
    this.equippedWeapon = equippedWeapon;
    this.buffStatus = buffStatus;
  }
}

class Weapon{

}


class Buff{

}

class Enemy{

}