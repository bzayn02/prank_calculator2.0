// Hints for calculator

// 1. Grab all the buttons first

const btns = document.querySelectorAll('.btn');

// importing audio file
const audioFile = new Audio('./aa.wav');

//2. Grab the display element and make display element as 0

const displayElem = document.querySelector('.display');

let stringToDisplay = '';

let latestOperator = '';

const operators = ['+', '-', '*', '/', '%'];
//3. Loop through all the buttons

btns.forEach((btn) => {
  //4. Add click event listenter to the button (inside loop)

  btn.addEventListener('click', () => {
    //5. Get the content of the button and check which button is being pressed

    let clickedButton = btn.innerText;

    if (operators.includes(clickedButton) && !stringToDisplay.length) {
      return;
    }

    if (clickedButton === 'AC') {
      stringToDisplay = '';
      return displayResult('');
    }

    if (clickedButton === '⬅︎') {
      stringToDisplay = stringToDisplay.slice(0, -1);
      return displayResult(stringToDisplay);
    }

    if (operators.includes(clickedButton)) {
      // Latest operator
      latestOperator = clickedButton;
      console.log('string to display', stringToDisplay);
      const lastCharacter = stringToDisplay.slice(-1);
      console.log('latest opeorator', latestOperator);

      console.log('lastcharaceter', lastCharacter);

      if (operators.includes(lastCharacter)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
    }

    if (clickedButton === '=') {
      const lastCharacter = stringToDisplay.slice(-1);

      if (operators.includes(lastCharacter)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }

      return displayTotal(stringToDisplay);
    }

    // . conditions
    if (clickedButton === '.') {
      //1. Last operator clickeda

      const indexOfLastOperator = stringToDisplay.lastIndexOf(latestOperator);

      console.log(indexOfLastOperator);

      const lastNumberSet = stringToDisplay.slice(indexOfLastOperator);

      if (lastNumberSet.includes('.')) {
        return;
      }
      //2. No operator

      if (!latestOperator && stringToDisplay.includes('.')) {
        return;
      }
    }
    // A funciton that handles the display of clicked number in display
    stringToDisplay = stringToDisplay + clickedButton;
    displayResult(stringToDisplay);
  });
});

const displayResult = (value) => {
  displayElem.innerText = value || '0';
};

const displayTotal = (value) => {
  const prankedData = sendRandom();
  if (prankedData) {
    audioFile.play();
    displayElem.style.background = 'red';
    setTimeout(() => (displayElem.style.background = ''), 2000);
  }
  console.log(prankedData);

  let totalValue = eval(value).toString();
  stringToDisplay = totalValue;
  displayResult(totalValue);
};

const sendRandom = () => {
  let randomNumber = Math.round(Math.random() * 10);
  return randomNumber < 3 ? randomNumber : 0;
};

// // reversing name on click
// const myName = document.getElementById('myname');
// myName.addEventListener('click', () => {
//   const text = myName.innerText;

//   let reverseName = '';
//   for (let i = text.length - 1; i >= 0; i--) {
//     reverseName += text[i];
//   }
//   myName.innerText = reverseName;
// });
