"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const player_one_score = document.getElementById("score--0");
const player_two_score = document.getElementById("score--1");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const dice_Image = document.querySelector(".diceI");
const current_score_one = document.getElementById("current--0");
const current_score_two = document.getElementById("current--1");

const imageArr = [];
imageArr[0] = "./dice-1.png";
imageArr[1] = "./dice-2.png";
imageArr[2] = "./dice-3.png";
imageArr[3] = "./dice-4.png";
imageArr[4] = "./dice-5.png";
imageArr[5] = "./dice-6.png";

let scores;
let activePlayer;
let randomDiceImage;
let diceNumber;
let initialCurrentScore;
let playing;

const init = function () {
  scores = [0, 0];

  player_one_score.textContent = 0;
  player_two_score.textContent = 0;

  activePlayer = 0;
  initialCurrentScore = 0;

  playing = true;

  current_score_one.textContent = initialCurrentScore;
  current_score_two.textContent = initialCurrentScore;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  initialCurrentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

function rollDice() {
  if (playing) {
    randomDiceImage = Math.trunc(Math.random() * imageArr.length);
    dice_Image.innerHTML = `<img src="${imageArr[randomDiceImage]}" width="100" height="100"/>`;
    diceNumber = randomDiceImage + 1;
    if (randomDiceImage !== 0) {
      initialCurrentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        initialCurrentScore;
    } else {
      switchPlayer();
    }
  }
}

rollBtn.addEventListener("click", rollDice);

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += initialCurrentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice_Image.innerHTML = "";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", function () {
  init();
});
