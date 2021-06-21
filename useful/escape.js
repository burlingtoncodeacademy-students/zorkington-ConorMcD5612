const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}

let inventory = [];

class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.desc = description;
    this.takeable = takeable || false;
    this.action = action || "nothing happens...";
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `you picked up ${this.name}`;
    } else {
      return "you can't take that";
    }
  }
  use() {
    if (this.name === "desk" && inventory.includes("smallkey")) {
      return "you can open the drawer, inside is a large key";
    } else {
      return this.action;
    }
  }
}

let desk = new Item(
  "desk",
  "a small writing desk. \nthere is a single drawer. ",
  "the desk is locked"
);

let rug = new Item(
  "rug",
  "a faded rug",
  "you lift the rug\nun
}