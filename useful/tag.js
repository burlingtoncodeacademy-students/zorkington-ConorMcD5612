const { exit } = require("process");
const readline = require("readline");
const { isBooleanObject } = require("util/types");
const rl = readline.createInterface(process.stdin, process.stdout);

let results = [
  {
    title: "A Wizard of Earthsea",
    tags: ["fantasy", "ursula k. le guin"],
  },
  {
    title: "Thing Explainer",
    tags: ["science", "technology", "humor", "randal munro"],
  },
  {
    title: "The Fellowship of the Ring",
    tags: ["fantasy", "jrr tolkien"],
  },
  {
    title: "A Brief History of Time",
    tags: ["history", "science", "stephen hawking"],
  },
  {
    title: "The Great Fairy Tale Tradition",
    tags: ["fairy tale", "history", "jack zipes"],
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    tags: ["science fiction", "humor", "douglas adams"],
  },
  {
    title: "The Silmarillion",
    tags: ["fantasy", "mythology", "jrr tolkien"],
  },
  {

    title: "Eloquent JavaScript",
    tags: ["programming", "technology", "marijn haverbeke"],
  },
];

// function ask(questionText) {
//     return new Promise((resolve, reject) => {
//       rl.question(questionText, resolve);
//     });
//   }


function search(string) {
  let array = [];

  for (let collection in results) {
    tagArr = results[collection].tags;
    filterdArray = tagArr.filter((tag) => tag.includes(string) === true);
    array.push(filterdArray);
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === string) {
      console.log(results[i].title);
    }
  }
}

search("programming");

// Bobs SOLUTION


function tagSearch(tag){
    let matches = []

    results.array.forEach((book) => {
        if(book.tags.includes(tag)){
            matches.push(book.title)
        }
    });

    return matches
}

function tagSearch(tag){
    return results.filter((book) =>{
        if(book.tags.includes(tag)){
            return true
        } else {
            return false
        }
    }).map((item) => {
        return item.title
    }).forEach((entry) => {
        console.log(book)
    })
}

function tagSearch(tag){
    return results.filter((book) => { book.tags.includes(tag)}).map((entry) =>{return entry.title})
}


Object.keys()