    function ageInDays() {
    var birthYear = prompt("What yeat were you born?");
    var ageInDayss = (2022-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode("You are " + ageInDayss + " days old")
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://c.tenor.com/ZhfMGWrmCTcAAAAM/cute-kitty-best-kitty.gif"
    div.appendChild(image);
}

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    console.log(message);

    rpsFrontend(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': {'scissors':1, 'rock':0.5, 'paper':0},
        'paper': {'scissors':0, 'rock':1, 'paper':0.5},
        'scissors': {'scissors':0.5, 'rock':0, 'paper':1}
    }

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'}
    }
    else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'}
    }
    else if (yourScore === 1) {
        return {'message': 'You won!', 'color': 'green'}
    }
}

function rpsFrontend(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height = 150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 123, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height = 150 width=150 style='box-shadow: 0px 10px 50px rgba(248, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];

for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === "red") {
        buttonsRed();
    }
    else if (buttonThingy.value === "green") {
        buttonsGreen();
    }
    else if (buttonThingy.value === "reset") {
        buttonsColorReset();
    }
    if (buttonThingy.value === "random") {
        buttonRamdomColors();
    }
}

function buttonsRed() {
    for ( let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");

    }
}

function buttonsGreen() {
    for ( let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");

    }
}

function buttonsColorReset() {
    for ( let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);

    }
}

function buttonRamdomColors() {
    for ( let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[Math.floor(Math.random() * all_buttons.length)]);

    }
}

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K', 'J','Q','A'],
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
}

function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for ( let i = 0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    for ( let i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}