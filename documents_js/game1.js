"use strict";
//creamos la variables globales de score, message, highscore y correctNumber
let message = "";
let score = 20;
let highScore = 0;
let correctNumber = Math.trunc(Math.random() * 20) + 1;
console.log(correctNumber);

//esta funcion la utilizamos para cambiar los mensajes de la pantalla de manera mas rapida y con menos codigo
function generateMessage(theclass, themessage) {
  document.querySelector(theclass).textContent = themessage;
}

//creamos la funcion para el boton again que reiniciara todos los componentes por default, menos el highScore
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  correctNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  generateMessage(".number", "?");
  generateMessage(".message", "Star guessing...");
  generateMessage(".score", 20);
  document.querySelector(".guess").value = "";
  document.querySelector(".check").disabled = false;
});

//esta funcion esta a la escucha de el boton check
document.querySelector(".check").addEventListener("click", function () {
  const number = Number(document.querySelector(".guess").value);
  if (!number) {
    generateMessage(".message", "👉Not Number");
  } else if (number === correctNumber) {
    generateMessage(".message", "🥳🥳🥳Correct Number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    generateMessage(".number", "👏");
    if (score > highScore) {
      highScore = score;
      generateMessage(".highscore", String(highScore));
    }
    document.querySelector(".check").disabled = true;
  } else if (number < 0 || number > 20) {
    generateMessage(".message", "Invalidate Number");
  } else {
    score--;
    calcArrive(number);
    generateMessage(".score", score);
  }
});

//esta funcion calcula que tan cerca esta el numero ingresado del numero real, esto cambiara el mensaje dependiendo del caso
function calcArrive(num) {
  num = num - correctNumber;
  if (num < 0) {
    num = num * -1;
  }

  if (num <= 2) {
    generateMessage(".message", "🔥🔥🔥Hot");
  } else {
    generateMessage(".message", "🥶🥶🥶Cold");
  }
}
