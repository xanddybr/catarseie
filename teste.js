const Swal = require('sweetalert2');

function showAlert() {
  Swal.fire({
    title: 'Hello!',
    text: 'This is a SweetAlert2 alert.',
    icon: 'success',
    confirmButtonText: 'Cool'
  });
}

alert('This is a simple alert!');   
// Call the function to display the alert
showAlert();

