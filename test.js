/*
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question("What's your first name? ", (firstName) => {
    rl.question("What's your last name? ", (lastName) => {
        rl.question("How old are you? ", (age) => {
           
        });
    });
});

const result = myFunc()
      .then(()=>{})
      .catch(()=>{})

*/

//ASSYNCRONUS FUNCTION EXAMPLE
/*
function myFunc() {

  for(i = 0; i < 1000000000; i++) {
     
    } 
  return i
}

async function init() {
    const result = await myFunc()
    console.log("I just run until that other function finishing...")
    console.log(result)
    
}
*/
  


//SYNCRONUS FUNCTION EXAMPLE


function myFunc() {
  for(i = 0; i < 10000; i++) { console.log("It is myfunction count...", i)  } 
  return i
}

/*
 function init() {
    const result = myFunc()
    console.log(result)
    console.log("finished")
}



function getdata(){
   fetch("")
  .then( response => response.json())
  .then( data => console.log(data))
  .catch(error => console.log(error))
}

getdata()

*/




