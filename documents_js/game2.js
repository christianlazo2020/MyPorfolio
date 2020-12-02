"use strict";
//seleccionando elementos globales
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//condiciones de partida
score0El.textContent = 0;
score1El.textContent = 0;
//quitamos la visivilidad del dado
diceEl.classList.add("hidden");

//aqui almacenaremos los scores de los dos jugadores
const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

//este metodo lo utilizamos para cmabiar de jugador
const switchPlayer = function () {
  //para cambiar de usuario y no contar los puntos
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //con estos metodos (toogle) lo que hace es buscar la clase, si la clase esta la eliminara, y si no esta la agrgara
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//events
btnNew.addEventListener("click", function () {
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }

  if (activePlayer === 1) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  }

  scores[0] = 0;
  scores[1] = 0;
  diceEl.classList.add("hidden");
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
});

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.debemos generar el numero al azar
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. mostramos los dados con el numero al azar
    diceEl.classList.remove("hidden");
    diceEl.src = `/Resources/img/dice-${dice}.png`;

    //3.verificamos que si el numero igual a 1
    if (dice !== 1) {
      //añadimos al score el numero random
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //cambiamos cada cierto tiempo el valor del score
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.este metodo se encargara de aumentar el score al jugador actual y cambiar el turno al otro jugador
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.tambien comprobara si el escore es igual o mayor a 100 para decidir quien sera el ganador y finalizar el juego

    if (scores[activePlayer] >= 20) {
      document

        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
