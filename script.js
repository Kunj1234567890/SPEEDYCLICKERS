let money = 0;
let timer = 100;
let clickValue = 1;
let autoClickValue = 0;
let clickMultiplier = 1;
let clickersMultiplier = 1;

document.getElementById('click-button').addEventListener('click', () => {
    money += clickValue * clickMultiplier;
    playClickSound();
    showClickEffect();
    updateMoneyDisplay();
});

function updateMoneyDisplay() {
    document.getElementById('money').textContent = money;
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timer;
}

function updateCpsDisplay() {
    document.getElementById('cps').textContent = autoClickValue * clickersMultiplier;
}

function buyItem(cost, increment) {
    if (money >= cost) {
        money -= cost;
        autoClickValue += increment;
        updateMoneyDisplay();
        updateCpsDisplay();
    } else {
        alert('Not enough money!');
    }
}

function buyUpgrade(cost, multiplier) {
    if (money >= cost) {
        money -= cost;
        clickMultiplier *= multiplier;
        updateMoneyDisplay();
    } else {
        alert('Not enough money!');
    }
}

function upgradeClickers(cost, multiplier) {
    if (money >= cost) {
        money -= cost;
        clickersMultiplier *= multiplier;
        updateMoneyDisplay();
        updateCpsDisplay();
    } else {
        alert('Not enough money!');
    }
}

function gameLoop() {
    if (timer > 0) {
        timer--;
        money += autoClickValue * clickersMultiplier;
        updateMoneyDisplay();
        updateTimerDisplay();
    } else {
        clearInterval(gameInterval);
        alert('Time is up! You earned $' + money);
    }
}

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0;
    clickSound.play();
}

function showClickEffect() {
    const effect = document.createElement('div');
    effect.className = 'effect';
    effect.innerHTML = `<img src="effect-image.png" alt="Effect" style="width: 30px; height: 30px;">`;

    const button = document.getElementById('click-button');
    const buttonRect = button.getBoundingClientRect();
    const offsetX = buttonRect.left + (buttonRect.width / 2) - 15; // Half of the effect width
    const offsetY = buttonRect.top + (buttonRect.height / 2) - 15; // Half of the effect height

    effect.style.left = `${offsetX}px`;
    effect.style.top = `${offsetY}px`;

    document.body.appendChild(effect); // Append to body instead of .click-container
    setTimeout(() => effect.remove(), 1000);
}


updateMoneyDisplay();
updateTimerDisplay();
updateCpsDisplay();
const gameInterval = setInterval(gameLoop, 1000);
