(() => {
  const gamecards = document.querySelector('.gamecards');
  const restartBtn = document.getElementById('restartBtn');
  const colorpairs = ['red', 'orange', 'green', 'yellow', 'cyan', 'blue', 'brown', 'purple'];
  const colors = [...colorpairs, ...colorpairs];

  let firstCard = null;
  let lock = false;

  function shuffle() {
    colors.sort(() => Math.random() - 0.5);
  }

  function startGame() {
    gamecards.innerHTML = "";
    shuffle();
    firstCard = null;
    lock = false;

    for (let i = 0; i < 16; i++) {
      const color = colors[i];
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.color = color;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
      cardBack.style.backgroundColor = color;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      card.addEventListener("click", () => handleClick(card));
      gamecards.appendChild(card);
    }
  }

  function handleClick(card) {
    if (lock || card.classList.contains("matched") || card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      const secondCard = card;
      const color1 = firstCard.dataset.color;
      const color2 = secondCard.dataset.color;

      if (color1 === color2) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
      } else {
        lock = true;
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          lock = false;
        }, 1000);
      }
    }
  }

  restartBtn.addEventListener("click", startGame);
  startGame();
})();
