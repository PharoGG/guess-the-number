let firstNumber = 20;
let lastNumber = 80;
let firstNumberText = document.querySelector(".firstNumber");
let lastNumberText = document.querySelector(".lastNumber");
let checkButton = document.querySelector(".game__inner__button");
let input = document.querySelector(".game__inner__input");
let text = document.querySelector(".game__inner__text");
let textAttempt = document.querySelector(".game__inner__attempts");
let numberAttempt = document.querySelector(".game__inner__attempts__number");
let warning = document.querySelector(".game__inner__warning");
let randomNumber = Math.floor(Math.random() * (lastNumber - firstNumber) + firstNumber);

let counter = 0;
firstNumberText.innerHTML = `${firstNumber}`;
lastNumberText.innerHTML = `${lastNumber}`;

checkButton.focus();

function startTheGame() {
    const attemptNumber = parseInt(Math.ceil(Math.log2((lastNumber - firstNumber))));
    warning.innerHTML = "";

    numberAttempt.innerHTML = `${attemptNumber}`;

    if (checkButton.innerHTML == "Start" || checkButton.innerHTML == "Start again") {
        input.style.display = "block";
        textAttempt.style.display = "block";
        checkButton.innerHTML = "Check";
        input.focus();
    } else {
        if (input.value == "" || input.value < `${firstNumber}` || input.value > `${lastNumber}`) {
            warning.style.display = "block";
            warning.innerHTML = `Enter a number from ${firstNumber} to ${lastNumber}`;
        } else {
            counter++;
            if (counter < attemptNumber || input.value == randomNumber) {
                warning.style.display = "none";

                if (input.value == randomNumber) {
                    textAttempt.style.display = "none";
                    warning.style.display = "block";
                    input.style.display = "none";
                    checkButton.focus();
                    checkButton.innerHTML = "Start again";
                    warning.innerHTML = `You win! <p>Hidden number is "${randomNumber}"`;
                } else {
                    numberAttempt.innerHTML = `${attemptNumber - counter}`;
                    input.innerHTML = "";
                    if (input.value > randomNumber) {
                        warning.style.display = "block";
                        warning.innerHTML = `Hidden number is less than ${input.value}`;
                    } else {
                        warning.style.display = "block";
                        warning.innerHTML = `Hidden number is greater than ${input.value}`;
                    }
                }
            } else {
                warning.innerHTML = `Attempts are over <p>Hidden number is "${randomNumber}"`;
                input.style.display = "none";
                textAttempt.style.display = "none";
                checkButton.focus();
                checkButton.innerHTML = "Start again";
            }
        }
    }
    input.value = "";
};


checkButton.addEventListener("click", () => {
    if (checkButton.innerHTML == "Start" || checkButton.innerHTML == "Start again") {
        counter = 0;
        randomNumber = Math.floor(Math.random() * (lastNumber - firstNumber) + firstNumber);
    }
    startTheGame();
});

input.addEventListener("keydown", function (evt) {
    if (checkButton.innerHTML == "Start again" && evt.keyCode == 13) {
        randomNumber = Math.floor(Math.random() * (lastNumber - firstNumber) + firstNumber);
        evt.preventDefault();
        counter = 0;
        startTheGame();
    }

    if (evt.keyCode == 13) {
        evt.preventDefault();
        startTheGame();
    }
});