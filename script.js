// Defining the variables and data in JS
let cardArray = [
  {
    name: "fries",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673422444/fries_w0jrsa.jpg",
  },
  {
    name: "fries",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673422444/fries_w0jrsa.jpg",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673422929/pizza_upf4id.png",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673422929/pizza_upf4id.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423062/milkshake_oygnkt.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423062/milkshake_oygnkt.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423195/ice_cream_xj5gut.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423195/ice_cream_xj5gut.png",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423341/hotdog_wuvsbe.webp",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423341/hotdog_wuvsbe.webp",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423435/cheese-burger-_lii3yv.webp",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673423435/cheese-burger-_lii3yv.webp",
  },
];

//define variables and get DOM element

let grid = document.querySelector(".grid");
let audio = document.querySelector("audio");
let source = document.querySelector("#source");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;

// Setting up the board on DOM load in JS

document.addEventListener("DOMContentLoaded", function () {
  //define functions

  createBoard(grid, cardArray);
  arrangeCard();
  playAgain.addEventListener("click", replay);

  //add a click functions for images

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});
//createBoard function

function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673427188/Screen_Shot_2023-01-11_at_12.51.52_AM_n2przi.png"
    );
    img.setAttribute("data-id", index);
    grid.appendChild(img);
  });
}

// arrangeCard function

function arrangeCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

// flip Card function

function flipCard() {
  let selected = this.dataset.id;
  let clicked = cardArray[selected].name;
  cardsSelected.push(clicked);

  source.src = `${clicked}.mp3`;
  audio.load();
  audio.play();

  cardsId.push(selected);
  this.classList.add("flip");
  this.setAttribute("src", cardArray[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

// Check if the cards clicked is correct

// checkForMatch function

function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    alert("you have found a match");
    // source.src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
    //this below is used if you want to add sounds, you can comment it out if you dont want it

    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon, 500);
  } else {
    imgs[firstCard].setAttribute(
      "src",
      "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673427188/Screen_Shot_2023-01-11_at_12.51.52_AM_n2przi.png"
    );
    imgs[secondCard].setAttribute(
      "src",
      "https://res.cloudinary.com/dl4dpltl4/image/upload/c_scale,h_100,w_133/v1673427188/Screen_Shot_2023-01-11_at_12.51.52_AM_n2przi.png"
    );
    alert("wrong, please try again");
    source.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3";
    audio.load();
    audio.play();
    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }
  cardsSelected = [];
  cardsId = [];
  clicks += 1;
  clickBoard.innerHTML = clicks;
}

function checkWon() {
  if (cardsWon == cardArray.length / 2) {
    alert("You won");
    setTimeout(() => (popup.style.display = "flex"), 300);
  }
}

// Restart the game

// The replay function

function replay() {
  arrangeCard();
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  cardsWon = 0;
  clicks = 0;
  clickBoard.innerHTML = 0;
  scoreBoard.innerHTML = 0;
  popup.style.display = "none";
}
