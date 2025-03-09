
function removeSpecialCharacters(inputString) {
    // Use a regular expression to remove all non-numeric characters
    const cleanedString = inputString.replace(/[^\d]/g, '');
    return cleanedString;
  }
  
  console.log(removeSpecialCharacters("(21) 98660-9260")) // Output: "00000000000"