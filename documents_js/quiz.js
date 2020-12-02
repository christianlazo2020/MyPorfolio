function printResults() {
  event.preventDefault();

  let score = 0;

  for (let i = 1; i <= 12; i++) {
    let choice = "choice" + String(i);
    console.log(choice);
    let data = document.getElementById(choice);
    if (data.checked === true && data.value === "true") {
      score++;
    }
  }

  const ok = document.getElementById("results");

  const row = `<div class="card-final">
  <p>Ok</p><span>${score}<span>
  </div>`;

  ok.innerHTML = row;
}
