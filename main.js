const groundHangMan = document.querySelector(".ground");
const poleHangeMan = document.querySelector(".pole");
const refHangMan = document.querySelector(".ref");
const headHangMan = document.querySelector(".head");
const bodyHangMan = document.querySelector(".body");
const rightHandHangMan = document.querySelector('.right-hand');
const leftHandHangMan = document.querySelector('.left-hand');
const rightLegHangMan = document.querySelector(".right-leg");
const leftLegHangMan = document.querySelector(".left-leg");
const letters = document.querySelector(".letters");
const keyboards = document.querySelector(".keyboards");
const mistakes = document.querySelector(".total");
const divHints = document.querySelector(".hints");
const hintBtn = document.querySelector(".hintBtn");
const hintText = document.querySelector(".hint");
let popUp = document.querySelector(".messagePopUp");
const btnRestart = document.querySelector(".restart");
let message = document.querySelector(".message");
let gameOver = false;
const hangmanWords = {
  countries: ["USA", "Canada", "France", "Germany", "Japan", "India", "Brazil", "Australia", "Mexico", "Italy", "China", "Russia", "Spain", "SouthAfrica", "Argentina", "Sweden", "Netherlands", "Norway", "Singapore", "Turkey", "Egypt", "Greece", "Thailand", "NewZealand", "Vietnam", "Colombia", "UnitedKingdom", "SouthKorea", "Kenya", "Peru", "Ireland", "Chile", "Malaysia", "Indonesia", "Philippines", "SaudiArabia", "UnitedArabEmirates", "Switzerland", "Belgium", "Denmark", "Portugal", "Finland", "Austria", "Poland", "Hungary"],
  fruits: ["Apple", "Banana", "Orange", "Grapes", "Strawberry", "Watermelon", "Pineapple", "Mango", "Kiwi", "Peach", "Pear", "Plum", "Cherry", "Blueberry", "Raspberry", "Blackberry", "Cantaloupe", "Avocado", "Pomegranate", "Apricot", "Guava", "PassionFruit", "DragonFruit", "Fig", "Persimmon", "Papaya", "Coconut", "Lemon", "Lime", "Cranberry"],
  animals: ["Lion", "Elephant", "Giraffe", "Tiger", "Monkey", "Kangaroo", "Penguin", "Panda", "Dolphin", "Cheetah", "Zebra", "Gorilla", "PolarBear", "Koala", "Hippopotamus", "Koala", "Jaguar", "Ostrich", "Chimpanzee", "Sloth", "Giraffe", "ArcticFox", "Meerkat", "Pangolin", "RedPanda", "Alpaca", "Peacock", "Kangaroo", "Squirrel", "Hedgehog"],
  tools: ["Hammer", "Screwdriver", "Wrench", "Pliers", "Saw", "Drill", "TapeMeasure", "Chisel", "Level", "Hacksaw", "AllenWrench", "UtilityKnife", "Vise", "Trowel", "Clamp", "Sander", "Router", "CaulkingGun", "WireStripper", "SolderingIron", "PaintRoller", "BrushCutter", "AngleGrinder", "LaserLevel", "StapleGun"],
  programming_languages: ["JavaScript", "Python", "Java", "Ruby", "Swift", "C", "Go", "Rust", "Kotlin", "TypeScript", "PHP", "HTML", "CSS", "Scala", "R", "Perl", "Haskell", "Objective-C", "Shell", "Lua", "Dart", "Groovy", "Julia", "Matlab"],
  names: ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack", "Lily", "Michael", "Nora", "Oliver", "Penny", "Quinn", "Riley", "Samuel", "Taylor", "Victoria", "William", "Xavier", "Yvonne", "Zane"],
  vegetables: ["Carrot", "Broccoli", "Spinach", "Potato", "Tomato", "Cucumber", "BellPepper", "Zucchini", "Eggplant", "Radish", "Lettuce", "Cabbage", "Onion", "Garlic", "Peas", "Corn", "Asparagus", "Green Bean", "Pumpkin", "Sweet Potato"],
  fightingArts: ["Karate", "Taekwondo", "Judo", "BrazilianJiuJitsu", "MuayThai", "Boxing", "Kickboxing", "KungFu", "Aikido", "KravMaga", "Capoeira", "WingChun", "Hapkido", "Fencing", "Sambo", "Sumo", "Kendo", "Escrima", "Kali", "JeetKuneDo", "MMA", "Wrestling", "TaiChi", "HaidongGumdo", "JiuJitsu", "Savate", "MuayBoran", "ValeTudo", "Ninjutsu"],
  colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White", "Gray", "Cyan", "Magenta", "Turquoise", "Lavender", "Maroon", "Teal", "Indigo", "Olive", "Slate", "Peach", "Lime", "Beige", "Gold", "Silver", "Navy"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

let word, counter = 0, target = [], selectedWord;

function randomCategory() {
  const categories = Object.keys(hangmanWords);
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

function randomWord(category) {
  if (!category) {
    console.error("Error: No category selected.");
    return null;
  }

  const wordsInCategory = hangmanWords[category];
  if (!wordsInCategory || wordsInCategory.length === 0) {
    console.error("Error: No words available in the selected category.");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * wordsInCategory.length);
  return wordsInCategory[randomIndex].toLowerCase();
}

function initializeGame() {
  word = randomCategory();
  selectedWord = randomWord(word);
  target = Array(selectedWord.length).fill('');

  for (let i = 0; i < selectedWord.length; i++) {
    createLetterListItem();
  }

  createButtons();
}

function createLetterListItem() {
  const li = document.createElement("li");
  letters.appendChild(li);
}

function createButtons() {
  for (let i = 97; i <= 122; i++) {
    const btn = document.createElement("button");
    const char = String.fromCharCode(i);
    const text = document.createTextNode(char);
    btn.appendChild(text);
    keyboards.appendChild(btn);
  }
}

function hints() {
  const hintMessage = `The Hint About: ${word}`;
  hintText.textContent = hintMessage;
  hintBtn.style.display = "none";
  divHints.style.height = "31px";
  divHints.style.display = "flex";
  divHints.style.alignItems = "center";
  divHints.style.justifyContent = "center";
}

hintBtn.addEventListener('click', hints);

function updateHangmanFigure() {
  const hangmanFigures = [
    groundHangMan,
    poleHangeMan,
    refHangMan,
    headHangMan,
    bodyHangMan,
    rightHandHangMan,
    leftHandHangMan,
    rightLegHangMan,
    leftLegHangMan
  ];

  if (counter <= hangmanFigures.length) {
    hangmanFigures[counter-1].style.display = "block";
  }
}

function clearHangmanFigure() {
  popUp.style.display = "none";
  const hangmanFigures = [
    groundHangMan,
    poleHangeMan,
    refHangMan,
    headHangMan,
    bodyHangMan,
    rightHandHangMan,
    leftHandHangMan,
    rightLegHangMan,
    leftLegHangMan
  ];

  hangmanFigures.forEach(figure => {
    figure.style.display = "none";
  });
}

function restartGame() {
  document.body.style.background = "#5b66b5";
  keyboards.innerHTML = '';
  letters.innerHTML = '';
  message.innerHTML = '';
  hintText.innerHTML = '';
  hintBtn.style.display = "block";
  counter = 0;
  target = [];
  mistakes.innerHTML = `Incorrect guesses <span class ="counter">${counter}/9</span>`;
  word = randomCategory();
  selectedWord = randomWord(word);
  clearHangmanFigure();
  popUp.style.display = "none";
  gameOver = false;
  initializeGame();
  addClickEventToButtons();
}

btnRestart.addEventListener('click', restartGame);

function handleGuess(clickedButton) {
  const guessedLetter = clickedButton.textContent;
  if (!clickedButton.classList.contains("active") && !clickedButton.classList.contains("hintBtn") && !gameOver && !clickedButton.classList.contains("restart")) {
    if (selectedWord.includes(guessedLetter)) {
      updateWordElements(guessedLetter);
    } else {
      counter++;
      updateHangmanFigure();
      updateMistakesCounter();
    }
    clickedButton.classList.add("active");
    checkGameOver();
  }
}

function updateWordElements(guessedLetter) {
  const wordElements = document.querySelectorAll("li");
  for (let i in selectedWord) {
    if (guessedLetter === selectedWord[i]) {
      wordElements[i].textContent = guessedLetter.toUpperCase();
      wordElements[i].classList.add("activeLi");
      target[i] = guessedLetter;
    }
  }
}

function updateMistakesCounter() {
  mistakes.innerHTML = `Incorrect guesses <span class ="counter">${counter}/9</span>`;
}

function checkGameOver() {
  if (counter === 9) {
    gameOver = true;
    displayGameOverMessage(`The correct word was: ${selectedWord}`);
  } else if (target.join("") === selectedWord) {
    gameOver = true;
    displayGameOverMessage("Winner, congratulations");
  }
}

function displayGameOverMessage(msg) {
  popUp.style.display = "flex";
  document.body.style.background = "#ccc";
  const messageText = document.createTextNode(msg);
  message.appendChild(messageText);
}

function addClickEventToButtons() {
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      handleGuess(btn);
    });
  });
}

initializeGame();
addClickEventToButtons();


    


    
    

  


