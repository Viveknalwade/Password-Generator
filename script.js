

const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase-check');
const lowercaseCheck = document.getElementById('lowercase-check');
const numbersCheck = document.getElementById('numbers-check');
const symbolsCheck = document.getElementById('symbols-check');
const generateBtn = document.getElementById('generate-btn');

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()'
};

function updateSlider() {
  lengthValue.textContent = lengthSlider.value;
}

function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const includeUppercase = uppercaseCheck.checked;
  const includeLowercase = lowercaseCheck.checked;
  const includeNumbers = numbersCheck.checked;
  const includeSymbols = symbolsCheck.checked;

  let charset = '';
  let password = [];

  if (includeUppercase) {
    charset += charSets.uppercase;
    password.push(getRandomChar(charSets.uppercase));
  }
  if (includeLowercase) {
    charset += charSets.lowercase;
    password.push(getRandomChar(charSets.lowercase));
  }
  if (includeNumbers) {
    charset += charSets.numbers;
    password.push(getRandomChar(charSets.numbers));
  }
  if (includeSymbols) {
    charset += charSets.symbols;
    password.push(getRandomChar(charSets.symbols));
  }

  if (charset === '') {
    passwordDisplay.value = "Select an option...";
    return;
  }

  const remainingLength = length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    password.push(getRandomChar(charset));
  }
  
  password = shuffleArray(password);
  passwordDisplay.value = password.join('');
}

function getRandomChar(str) {
  const randomIndex = Math.floor(Math.random() * str.length);
  return str[randomIndex];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function copyToClipboard() {
  if (passwordDisplay.value) {
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 1500);
    });
  }
}

// Event Listeners
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Initial call
updateSlider();
generatePassword();
