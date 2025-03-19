const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
const specificProvidersRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?(gmail\.com|yahoo\.com|live\.com|outlook\.com|icloud\.com|hotmail\.com|aol\.com|protonmail\.com|zoho\.com|gmx\.com|yandex\.com|mail\.com|fastmail\.com|tutanota\.com|qq\.com|naver\.com|163\.com|126\.com|rediffmail\.com|seznam\.cz|web\.de|mail\.ru|laposte\.net)$/;
const fallbackRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  if (specificProvidersRegex.test(email)) {
    return "Valid email from a known provider.";
  } else if (fallbackRegex.test(email)) {
    return "Valid email from an unknown provider.";
  } else {
    return "Invalid email.";
  }
} 
*/



rl.question("What's your first name? ", (firstName) => {
    rl.question("What's your last name? ", (lastName) => {
        rl.question("How old are you? ", (age) => {
           
        });
    });
});

