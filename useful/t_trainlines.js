//const that set up the interface with the terminal, allowing a user to interact with your program
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

//function establishing an ask function to await user input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// define class of train lines
class TrainLines {
  constructor(color, stations, connectingLines) {
    this.color = color;
    this.stations = stations;
    this.connectingLines = connectingLines;
  }
}

let blueLine = new TrainLines (
  "blue",
  ["Bowdoin", "Govt Center", "State", "Aquarium"],
  ["green", "orange"]
);

let redLine = new TrainLines(
  'red',
  ['Kendall/MIT', 'Charles/MGH', 'Park St', 'Downtown crossing', 'South station', 'boylston'],
  ['green', 'orange', 'grey']

);

let orangeLine = new TrainLines(
  "orange",
  [
    "Haymarket",
    "State",
    "Downtown Crossing",
    "Chinatown",
    "Tufts Medical Center",
  ],
  ["blue", "green", "red", "grey"]
);

let greenLine = new TrainLines(
  "green",
  [
    "Haymarket",
    "Gov't Center",
    "Park St",
    "Boylston",
    "Arlington",
    "Copley",
    "Prudential",
  ],
  ["red", "blue", "orange", "grey"]
);

let greyLine = new TrainLines(
  "grey",
  ["Boylston", "Chinatown", "South Station"],
  ["orange", "red", "green"]
);



//state machine

//current state

let currentLine = "grey";
//allowable transitions
let lineLookUp ={
  'grey': greyLine, // key is string val is object/class instance
  'red': redLine,
  'blue': blueLine,
  'green': greenLine,
  'orange': orangeLine
}
// function to move between states

function junctionFunction(newLine){
  // recieve the new line
  // IF it is a valid transition
  if(lineLookUp[currentLine].connectingLines.includes(newLine)){
    currentLine = newLine
  } else {
    console.log(`You cannot transition from ${currentLine} to ${newLine}`)
  }
}


console.log(currentLine)
junctionFunction('orange')
console.log(currentLine)
junctionFunction('grey')
console.log(currentLine)
junctionFunction('blue')